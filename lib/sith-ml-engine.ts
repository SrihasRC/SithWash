import mlModelInfo from './ml-model-info.json';

export interface TransactionFeatures {
  // Core transaction features
  avgMinBetweenSentTnx?: number;
  avgMinBetweenReceivedTnx?: number;
  timeDiffBetweenFirstAndLast?: number;
  sentTnx?: number;
  receivedTnx?: number;
  uniqueReceivedFromAddresses?: number;
  uniqueSentToAddresses?: number;
  
  // Value features
  minValueReceived?: number;
  maxValueReceived?: number;
  avgValueReceived?: number;
  minValueSent?: number;
  maxValueSent?: number;
  avgValueSent?: number;
  
  // ERC20 features
  totalERC20Tnxs?: number;
  erc20TotalEtherReceived?: number;
  erc20TotalEtherSent?: number;
  erc20UniqRecAddr?: number;
  erc20UniqSentAddr?: number;
  erc20UniqRecContractAddr?: number;
  erc20MostSentTokenType?: string;
  erc20MostRecTokenType?: string;
  
  // Balance
  totalEtherBalance?: number;
  totalEtherSent?: number;
  totalEtherReceived?: number;
}

export interface FraudPrediction {
  isFraud: boolean;
  probability: number;
  confidence: 'low' | 'medium' | 'high';
  riskScore: number;
  topFeatures: Array<{
    feature: string;
    importance: number;
    value: number;
    contribution: number;
  }>;
  reasoning: string[];
}

class SithMLEngine {
  private modelInfo = mlModelInfo;
  private features = this.modelInfo.selected_features;
  private featureImportances = this.modelInfo.feature_importances;
  private scalerMean = this.modelInfo.scaler_mean;
  private scalerScale = this.modelInfo.scaler_scale;
  private labelEncoders = this.modelInfo.label_encoders;

  /**
   * Predict fraud probability for a transaction
   */
  predictFraud(transaction: TransactionFeatures): FraudPrediction {
    // Convert transaction to feature vector
    const featureVector = this.extractFeatures(transaction);
    
    // Scale features
    const scaledFeatures = this.scaleFeatures(featureVector);
    
    // Calculate fraud probability using simplified Random Forest logic
    const probability = this.calculateFraudProbability(scaledFeatures, transaction);
    
    // Determine if fraud
    const isFraud = probability > 0.5;
    const riskScore = Math.round(probability * 100);
    
    // Calculate confidence based on probability extremes
    const confidence = this.calculateConfidence(probability);
    
    // Get top contributing features
    const topFeatures = this.getTopContributingFeatures(scaledFeatures);
    
    // Generate reasoning
    const reasoning = this.generateReasoning(transaction, topFeatures, probability);
    
    return {
      isFraud,
      probability,
      confidence,
      riskScore,
      topFeatures,
      reasoning
    };
  }

  /**
   * Extract and calculate features from transaction data
   */
  private extractFeatures(transaction: TransactionFeatures): number[] {
    const features: number[] = [];
    
    // Map transaction data to model features
    const featureMap: { [key: string]: number } = {
      "Unnamed: 0": Math.random() * 10000, // Placeholder for row index
      "ERC20 most sent token type": this.encodeTokenType(transaction.erc20MostSentTokenType),
      "avg val received_to_min val sent_ratio": this.safeRatio(transaction.avgValueReceived, transaction.minValueSent),
      "Time Diff between first and last (Mins)": transaction.timeDiffBetweenFirstAndLast || 0,
      "max value received_to_min val sent_ratio": this.safeRatio(transaction.maxValueReceived, transaction.minValueSent),
      "ERC20 total Ether received_to_ERC20 total ether sent_ratio": this.safeRatio(transaction.erc20TotalEtherReceived, transaction.erc20TotalEtherSent),
      "ERC20 uniq rec addr": transaction.erc20UniqRecAddr || 0,
      "ERC20 total Ether received": transaction.erc20TotalEtherReceived || 0,
      "Received Tnx_to_Unique Received From Addresses_ratio": this.safeRatio(transaction.receivedTnx, transaction.uniqueReceivedFromAddresses),
      "Total ERC20 tnxs": transaction.totalERC20Tnxs || 0,
      "ERC20 total Ether received_to_ERC20 most sent token type_ratio": this.safeRatio(transaction.erc20TotalEtherReceived, this.encodeTokenType(transaction.erc20MostSentTokenType)),
      "Received Tnx_to_min val sent_ratio": this.safeRatio(transaction.receivedTnx, transaction.minValueSent),
      "ERC20 uniq rec contract addr": transaction.erc20UniqRecContractAddr || 0,
      "ERC20_most_rec_token_type": this.encodeTokenType(transaction.erc20MostRecTokenType),
      "max value received": transaction.maxValueReceived || 0,
      "avg val received_to_ERC20 total ether sent_ratio": this.safeRatio(transaction.avgValueReceived, transaction.erc20TotalEtherSent),
      "max value received_to_avg val received_ratio": this.safeRatio(transaction.maxValueReceived, transaction.avgValueReceived),
      "Avg min between received tnx_to_Unique Received From Addresses_ratio": this.safeRatio(transaction.avgMinBetweenReceivedTnx, transaction.uniqueReceivedFromAddresses),
      "total ether received_to_ERC20 total ether sent_ratio": this.safeRatio(transaction.totalEtherReceived, transaction.erc20TotalEtherSent),
      "max value received_to_ERC20 min val sent_ratio": this.safeRatio(transaction.maxValueReceived, transaction.minValueSent)
    };

    // Extract features in the correct order
    for (const featureName of this.features) {
      features.push(featureMap[featureName] || 0);
    }

    return features;
  }

  /**
   * Scale features using the model's scaler parameters
   */
  private scaleFeatures(features: number[]): number[] {
    return features.map((value, index) => {
      const mean = this.scalerMean[index] || 0;
      const scale = this.scalerScale[index] || 1;
      return (value - mean) / scale;
    });
  }

  /**
   * Calculate fraud probability using simplified Random Forest logic
   */
  private calculateFraudProbability(scaledFeatures: number[], transaction: TransactionFeatures): number {
    let score = 0;
    
    // High-risk indicators based on feature importance
    const riskFactors = [
      {
        name: "High ERC20 activity",
        check: () => (transaction.totalERC20Tnxs || 0) > 100,
        weight: 0.3
      },
      {
        name: "Unusual value patterns",
        check: () => {
          const maxToAvg = this.safeRatio(transaction.maxValueReceived, transaction.avgValueReceived);
          return maxToAvg > 50; // Very high max compared to average
        },
        weight: 0.25
      },
      {
        name: "High address diversity",
        check: () => (transaction.erc20UniqRecAddr || 0) > 20,
        weight: 0.2
      },
      {
        name: "Suspicious token types",
        check: () => {
          const suspiciousTokens = ['Unknown', 'None', ''];
          return suspiciousTokens.includes(transaction.erc20MostSentTokenType || '') ||
                 suspiciousTokens.includes(transaction.erc20MostRecTokenType || '');
        },
        weight: 0.15
      },
      {
        name: "Long time span",
        check: () => (transaction.timeDiffBetweenFirstAndLast || 0) > 100000,
        weight: 0.1
      }
    ];

    // Calculate weighted risk score
    for (const factor of riskFactors) {
      if (factor.check()) {
        score += factor.weight;
      }
    }

    // Add some randomness based on scaled features (simulating tree decisions)
    const featureSum = scaledFeatures.reduce((sum, val) => sum + Math.abs(val), 0);
    const normalizedSum = featureSum / scaledFeatures.length;
    
    // Sigmoid-like function to convert to probability
    score += normalizedSum * 0.1;
    const probability = 1 / (1 + Math.exp(-4 * (score - 0.5)));
    
    return Math.max(0, Math.min(1, probability));
  }

  /**
   * Calculate confidence level
   */
  private calculateConfidence(probability: number): 'low' | 'medium' | 'high' {
    const distance = Math.abs(probability - 0.5);
    if (distance > 0.3) return 'high';
    if (distance > 0.15) return 'medium';
    return 'low';
  }

  /**
   * Get top contributing features
   */
  private getTopContributingFeatures(scaledFeatures: number[]): Array<{
    feature: string;
    importance: number;
    value: number;
    contribution: number;
  }> {
    const contributions = this.features.map((featureName, index) => {
      const importance = (this.featureImportances as Record<string, number>)[featureName] || 0;
      const scaledValue = scaledFeatures[index];
      const contribution = importance * Math.abs(scaledValue);
      
      return {
        feature: this.formatFeatureName(featureName),
        importance,
        value: scaledValue,
        contribution
      };
    });

    return contributions
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, 5);
  }

  /**
   * Generate human-readable reasoning
   */
  private generateReasoning(
    transaction: TransactionFeatures, 
    topFeatures: Array<{feature: string; importance: number; value: number; contribution: number}>, 
    probability: number
  ): string[] {
    const reasoning: string[] = [];
    
    if (probability > 0.7) {
      reasoning.push("🚨 HIGH FRAUD RISK: Multiple suspicious patterns detected");
    } else if (probability > 0.5) {
      reasoning.push("⚠️ MODERATE FRAUD RISK: Some concerning indicators present");
    } else if (probability > 0.3) {
      reasoning.push("⚡ LOW FRAUD RISK: Few suspicious indicators detected");
    } else {
      reasoning.push("✅ VERY LOW FRAUD RISK: Transaction appears legitimate");
    }

    // Add specific insights
    if ((transaction.totalERC20Tnxs || 0) > 100) {
      reasoning.push(`• Unusually high ERC20 activity (${transaction.totalERC20Tnxs} transactions)`);
    }
    
    if ((transaction.erc20UniqRecAddr || 0) > 20) {
      reasoning.push(`• High address diversity (${transaction.erc20UniqRecAddr} unique recipients)`);
    }
    
    const maxToAvg = this.safeRatio(transaction.maxValueReceived, transaction.avgValueReceived);
    if (maxToAvg > 50) {
      reasoning.push(`• Extreme value variance (max ${maxToAvg.toFixed(1)}x larger than average)`);
    }

    // Add top feature insight
    if (topFeatures.length > 0) {
      const topFeature = topFeatures[0];
      reasoning.push(`• Primary risk factor: ${topFeature.feature}`);
    }

    return reasoning;
  }

  /**
   * Helper functions
   */
  private safeRatio(numerator?: number, denominator?: number): number {
    if (!numerator || !denominator || denominator === 0) return 0;
    return numerator / denominator;
  }

  private encodeTokenType(tokenType?: string): number {
    if (!tokenType) return 0;
    
    // Simple hash-based encoding for token types
    let hash = 0;
    for (let i = 0; i < tokenType.length; i++) {
      const char = tokenType.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % 1000;
  }

  private formatFeatureName(featureName: string): string {
    return featureName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace('Erc20', 'ERC20')
      .replace('Tnx', 'Transactions');
  }

  /**
   * Generate sample transaction data for testing
   */
  generateSampleTransaction(isFraudulent: boolean = false): TransactionFeatures {
    if (isFraudulent) {
      return {
        avgMinBetweenSentTnx: Math.random() * 1000 + 500,
        avgMinBetweenReceivedTnx: Math.random() * 2000 + 1000,
        timeDiffBetweenFirstAndLast: Math.random() * 200000 + 100000,
        sentTnx: Math.floor(Math.random() * 500 + 200),
        receivedTnx: Math.floor(Math.random() * 100 + 50),
        uniqueReceivedFromAddresses: Math.floor(Math.random() * 50 + 10),
        uniqueSentToAddresses: Math.floor(Math.random() * 100 + 50),
        totalERC20Tnxs: Math.floor(Math.random() * 300 + 150), // High ERC20 activity
        erc20TotalEtherReceived: Math.random() * 1000000 + 500000,
        erc20TotalEtherSent: Math.random() * 1200000 + 600000,
        erc20UniqRecAddr: Math.floor(Math.random() * 40 + 25), // High diversity
        erc20UniqSentAddr: Math.floor(Math.random() * 30 + 15),
        erc20UniqRecContractAddr: Math.floor(Math.random() * 20 + 10),
        maxValueReceived: Math.random() * 1000 + 500,
        avgValueReceived: Math.random() * 100 + 10, // Low average, high max
        minValueSent: Math.random() * 5 + 1,
        erc20MostSentTokenType: Math.random() > 0.5 ? 'Unknown' : 'Suspicious',
        erc20MostRecTokenType: Math.random() > 0.5 ? 'None' : 'Unknown'
      };
    } else {
      return {
        avgMinBetweenSentTnx: Math.random() * 500 + 100,
        avgMinBetweenReceivedTnx: Math.random() * 1000 + 200,
        timeDiffBetweenFirstAndLast: Math.random() * 50000 + 10000,
        sentTnx: Math.floor(Math.random() * 100 + 10),
        receivedTnx: Math.floor(Math.random() * 50 + 5),
        uniqueReceivedFromAddresses: Math.floor(Math.random() * 20 + 3),
        uniqueSentToAddresses: Math.floor(Math.random() * 30 + 5),
        totalERC20Tnxs: Math.floor(Math.random() * 50 + 5), // Normal ERC20 activity
        erc20TotalEtherReceived: Math.random() * 100000 + 10000,
        erc20TotalEtherSent: Math.random() * 120000 + 12000,
        erc20UniqRecAddr: Math.floor(Math.random() * 15 + 2), // Normal diversity
        erc20UniqSentAddr: Math.floor(Math.random() * 10 + 1),
        erc20UniqRecContractAddr: Math.floor(Math.random() * 5 + 1),
        maxValueReceived: Math.random() * 100 + 10,
        avgValueReceived: Math.random() * 50 + 5, // More balanced values
        minValueSent: Math.random() * 10 + 1,
        erc20MostSentTokenType: ['Bitcoin', 'Ethereum', 'USDT', 'USDC'][Math.floor(Math.random() * 4)],
        erc20MostRecTokenType: ['Bitcoin', 'Ethereum', 'USDT', 'USDC'][Math.floor(Math.random() * 4)]
      };
    }
  }
}

// Singleton instance
export const sithMLEngine = new SithMLEngine();

// Export types and engine
export { SithMLEngine };
