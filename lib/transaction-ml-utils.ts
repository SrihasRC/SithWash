import { sithMLEngine, TransactionFeatures, FraudPrediction } from './sith-ml-engine';

export interface EnhancedTransaction {
  id: string;
  address: string;
  timestamp: string;
  amount: string;
  from: string;
  to: string;
  type: 'incoming' | 'outgoing' | 'internal';
  status: 'confirmed' | 'pending' | 'failed';
  gasUsed?: string;
  gasPrice?: string;
  
  // ML Features
  features: TransactionFeatures;
  
  // ML Prediction
  mlPrediction?: FraudPrediction;
  
  // Risk assessment
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  flaggedReason?: string[];
}

/**
 * Generate enhanced transaction data with ML predictions
 */
export function generateEnhancedTransactions(count: number = 20): EnhancedTransaction[] {
  const transactions: EnhancedTransaction[] = [];
  
  for (let i = 0; i < count; i++) {
    // Randomly determine if this should be fraudulent (20% chance)
    const shouldBeFraudulent = Math.random() < 0.2;
    
    // Generate features
    const features = sithMLEngine.generateSampleTransaction(shouldBeFraudulent);
    
    // Get ML prediction
    const mlPrediction = sithMLEngine.predictFraud(features);
    
    // Generate transaction metadata
    const transaction: EnhancedTransaction = {
      id: `0x${Math.random().toString(16).substr(2, 8)}${i.toString().padStart(4, '0')}`,
      address: generateRandomAddress(),
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(), // Last 30 days
      amount: generateTransactionAmount(),
      from: generateRandomAddress(),
      to: generateRandomAddress(),
      type: (['incoming', 'outgoing', 'internal'] as const)[Math.floor(Math.random() * 3)],
      status: Math.random() > 0.1 ? 'confirmed' : 'pending',
      gasUsed: Math.floor(Math.random() * 100000 + 21000).toString(),
      gasPrice: (Math.random() * 50 + 10).toFixed(2),
      
      features,
      mlPrediction,
      
      riskLevel: mlPrediction.isFraud ? 
        (mlPrediction.probability > 0.8 ? 'critical' : 'high') :
        (mlPrediction.probability > 0.3 ? 'medium' : 'low'),
      
      flaggedReason: mlPrediction.isFraud ? mlPrediction.reasoning : undefined
    };
    
    transactions.push(transaction);
  }
  
  // Sort by risk level and timestamp
  return transactions.sort((a, b) => {
    const riskOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const riskDiff = riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
    if (riskDiff !== 0) return riskDiff;
    
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}

/**
 * Analyze a single transaction and get ML prediction
 */
export function analyzeTransaction(transactionData: Partial<TransactionFeatures>): {
  transaction: EnhancedTransaction;
  mlPrediction: FraudPrediction;
} {
  // Fill in missing features with defaults
  const features: TransactionFeatures = {
    avgMinBetweenSentTnx: 0,
    avgMinBetweenReceivedTnx: 0,
    timeDiffBetweenFirstAndLast: 0,
    sentTnx: 0,
    receivedTnx: 0,
    uniqueReceivedFromAddresses: 0,
    uniqueSentToAddresses: 0,
    totalERC20Tnxs: 0,
    erc20TotalEtherReceived: 0,
    erc20TotalEtherSent: 0,
    erc20UniqRecAddr: 0,
    erc20UniqSentAddr: 0,
    erc20UniqRecContractAddr: 0,
    maxValueReceived: 0,
    avgValueReceived: 0,
    minValueSent: 0,
    ...transactionData
  };
  
  const mlPrediction = sithMLEngine.predictFraud(features);
  
  const transaction: EnhancedTransaction = {
    id: `0x${Math.random().toString(16).substr(2, 12)}`,
    address: generateRandomAddress(),
    timestamp: new Date().toISOString(),
    amount: generateTransactionAmount(),
    from: generateRandomAddress(),
    to: generateRandomAddress(),
    type: 'incoming',
    status: 'confirmed',
    features,
    mlPrediction,
    riskLevel: mlPrediction.isFraud ? 
      (mlPrediction.probability > 0.8 ? 'critical' : 'high') :
      (mlPrediction.probability > 0.3 ? 'medium' : 'low'),
    flaggedReason: mlPrediction.isFraud ? mlPrediction.reasoning : undefined
  };
  
  return { transaction, mlPrediction };
}

/**
 * Generate sample real-world transactions from the dataset patterns
 */
export function generateRealWorldTransactions(): EnhancedTransaction[] {
  const patterns = [
    // High-risk pattern: Money laundering through multiple ERC20 tokens
    {
      totalERC20Tnxs: 250,
      erc20UniqRecAddr: 45,
      erc20TotalEtherReceived: 890000,
      erc20TotalEtherSent: 920000,
      maxValueReceived: 50000,
      avgValueReceived: 850,
      erc20MostSentTokenType: 'Unknown',
      timeDiffBetweenFirstAndLast: 450000
    },
    // Medium-risk pattern: Unusual but not clearly fraudulent
    {
      totalERC20Tnxs: 80,
      erc20UniqRecAddr: 15,
      erc20TotalEtherReceived: 120000,
      erc20TotalEtherSent: 125000,
      maxValueReceived: 8000,
      avgValueReceived: 340,
      erc20MostSentTokenType: 'USDT',
      timeDiffBetweenFirstAndLast: 85000
    },
    // Low-risk pattern: Normal trading activity
    {
      totalERC20Tnxs: 25,
      erc20UniqRecAddr: 5,
      erc20TotalEtherReceived: 45000,
      erc20TotalEtherSent: 47000,
      maxValueReceived: 2000,
      avgValueReceived: 180,
      erc20MostSentTokenType: 'Ethereum',
      timeDiffBetweenFirstAndLast: 28000
    }
  ];
  
  return patterns.map((pattern, index) => {
    const { transaction } = analyzeTransaction(pattern);
    return {
      ...transaction,
      id: `real_${index + 1}_${transaction.id}`,
      address: `0x${index.toString().padStart(4, '0')}${transaction.address.slice(6)}`
    };
  });
}

// Helper functions
function generateRandomAddress(): string {
  return '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function generateTransactionAmount(): string {
  const amount = Math.random() * 1000 + 0.01;
  return amount.toFixed(6) + ' ETH';
}

/**
 * Get risk level styling
 */
export function getRiskLevelStyle(riskLevel: string) {
  switch (riskLevel) {
    case 'critical':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'high':
      return 'bg-red-500/15 text-red-400 border-red-500/25';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'low':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

/**
 * Format features for display
 */
export function formatFeatureValue(key: string, value: number): string {
  if (key.includes('ratio') || key.includes('Ratio')) {
    return value.toFixed(3);
  }
  if (key.includes('time') || key.includes('Time') || key.includes('Mins')) {
    return `${(value / 60).toFixed(1)}h`;
  }
  if (key.includes('Ether') || key.includes('ether') || key.includes('val')) {
    return value > 1000 ? `${(value / 1000).toFixed(1)}K` : value.toFixed(2);
  }
  return Math.round(value).toString();
}
