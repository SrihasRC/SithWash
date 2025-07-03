"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertTriangle, Shield, Zap, Users, DollarSign, TrendingUp, Search } from "lucide-react";
import Link from "next/link";
import { Transaction, mockTransactions, getTransactionById, getTransactionIds } from "@/data/transactions";

export default function AuditPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [networkAnalysis, setNetworkAnalysis] = useState<string[]>([]);
  const [searchId, setSearchId] = useState("");
  const [searchError, setSearchError] = useState("");
  const [scannedTransactions, setScannedTransactions] = useState<Transaction[]>([]);
  const [scanType, setScanType] = useState<'deep' | 'target'>('deep');

  // Simulate scanning progress
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const analyzeTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
    
    // Simulate network analysis
    const analysisResults = [
      `🔍 Analyzing transaction path: ${transaction.from} → ${transaction.to}`,
      `📊 Risk assessment: ${transaction.riskScore}% - ${transaction.riskScore >= 80 ? 'CRITICAL' : transaction.riskScore >= 60 ? 'HIGH' : 'MEDIUM'} threat level`,
      `🌐 Cross-referencing with known criminal networks...`,
      `⚡ Dark side algorithms detecting suspicious patterns...`,
      `🎯 Entity relationship mapping complete`,
      `📈 Historical transaction analysis: ${Math.floor(Math.random() * 50) + 10} similar patterns found`,
      `⚠️ Compliance violations: ${transaction.flags.length} flags raised`,
      `🔐 Encryption analysis: ${transaction.riskScore > 70 ? 'Obfuscated' : 'Standard'} protocols detected`
    ];
    
    setNetworkAnalysis(analysisResults);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
    setNetworkAnalysis([]);
  };

  const startScan = () => {
    setScanType('deep');
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate deep scan - randomly select 3-5 high-risk transactions
    setTimeout(() => {
      const highRiskTransactions = mockTransactions.filter(t => t.riskScore >= 70);
      const randomTransactions = highRiskTransactions
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 3);
      
      setScannedTransactions(randomTransactions);
      setIsScanning(false);
    }, 3000);
  };

  const scanTransactionById = () => {
    if (!searchId.trim()) {
      setSearchError("Please enter a Transaction ID");
      return;
    }

    const transaction = getTransactionById(searchId);
    if (!transaction) {
      setSearchError(`Transaction ID "${searchId}" not found`);
      return;
    }

    setSearchError("");
    setScanType('target');
    setSelectedTransaction(transaction);
    setIsScanning(true);
    setScanProgress(0);
    
    // Add to scanned transactions if not already there
    setScannedTransactions(prev => {
      const exists = prev.some(t => t.id === transaction.id);
      if (!exists) {
        return [...prev, transaction];
      }
      return prev;
    });
    
    // Simulate scanning progress, then show modal
    setTimeout(() => {
      setIsScanning(false);
      setShowDetailModal(true);
      analyzeTransaction(transaction);
    }, 2000);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-500";
    if (score >= 60) return "text-orange-500";
    if (score >= 40) return "text-yellow-500";
    return "text-green-500";
  };

  const getRiskBadgeColor = (score: number) => {
    if (score >= 80) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (score >= 60) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    if (score >= 40) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-background to-secondary/5" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-destructive/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.03)_75%,rgba(255,255,255,0.03)_76%,transparent_77%,transparent_100%)] bg-[length:30px_30px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.03)_75%,rgba(255,255,255,0.03)_76%,transparent_77%,transparent_100%)] bg-[length:30px_30px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex flex-col gap-4">
            <Button asChild variant="outline" size="sm" className="border-destructive/20 text-destructive hover:bg-destructive/10 w-36">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-destructive to-red-600 bg-clip-text text-transparent">
                  SithWash
                </span>
                <span className="text-foreground"> Audit Console</span>
              </h1>
              <p className="text-muted-foreground">Monitor galactic financial networks for suspicious activities</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-destructive/20 text-destructive">
              <Shield className="w-3 h-3 mr-1" />
              Sith Clearance: Level 9
            </Badge>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Transactions Scanned", value: "47,293", icon: DollarSign, color: "text-blue-400" },
            { label: "Suspicious Activities", value: "1,847", icon: AlertTriangle, color: "text-red-400" },
            { label: "Networks Mapped", value: "12,394", icon: Users, color: "text-purple-400" },
            { label: "Credits Traced", value: "2.1B", icon: TrendingUp, color: "text-green-400" }
          ].map((stat) => (
            <Card key={stat.label} className="bg-card/40 border-border/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color} opacity-70`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Scan Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-destructive" />
                Dark Side Scanner
              </CardTitle>
              <CardDescription>
                Initiate deep scan of galactic financial networks using Sith algorithms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* General Scan */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={startScan}
                  disabled={isScanning}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  {isScanning ? "Scanning..." : "Start Deep Scan"}
                </Button>
                {isScanning && (
                  <div className="flex-1 max-w-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-border/20 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-destructive to-red-600"
                          style={{ width: `${scanProgress}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(scanProgress)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Transaction ID Search */}
              <div className="border-t border-border/20 pt-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Search className="w-4 h-4 mr-2 text-destructive" />
                  Target Transaction Scan
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Enter Transaction ID (e.g., TX001)"
                      value={searchId}
                      onChange={(e) => {
                        setSearchId(e.target.value);
                        setSearchError("");
                      }}
                      className="bg-background/50 border-border/20 focus:border-destructive/50"
                    />
                    <Select value={searchId} onValueChange={setSearchId}>
                      <SelectTrigger className="bg-background/50 border-border/20">
                        <SelectValue placeholder="Or select from available IDs" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTransactionIds().map((id) => (
                          <SelectItem key={id} value={id}>
                            {id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={scanTransactionById}
                    disabled={isScanning || !searchId.trim()}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Scan Transaction
                  </Button>
                </div>
                {searchError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm"
                  >
                    {searchError}
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transaction List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {scannedTransactions.length > 0 ? 'Scanned Transactions' : 'Recent Suspicious Transactions'}
                </span>
                {scannedTransactions.length > 0 && (
                  <Badge variant="outline" className="border-destructive/20 text-destructive">
                    {scannedTransactions.length} scanned
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {scannedTransactions.length > 0 
                  ? 'Transactions you have analyzed using the dark side scanner'
                  : 'High-risk financial activities detected by the dark side algorithms'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scannedTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <Zap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">No transactions scanned yet</p>
                  <p className="text-sm text-muted-foreground">Use the scanner above to analyze transactions</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scannedTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="p-4 bg-card/60 rounded-lg border border-border/20 hover:bg-card/80 transition-colors cursor-pointer relative"
                      onClick={() => analyzeTransaction(transaction)}
                    >
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          Analyzed
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {transaction.id} ({scanType === 'deep' ? 'Deep Scan' : 'Target Scan'})
                            </Badge>
                            <Badge className={`text-xs ${getRiskBadgeColor(transaction.riskScore)}`}>
                              Risk: {transaction.riskScore}%
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(transaction.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{transaction.from}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-medium">{transaction.to}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="mr-4">📍 {transaction.planet}</span>
                            <span className="mr-4">💰 {transaction.amount.toLocaleString()} credits</span>
                            <span>🏷️ {transaction.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`text-2xl font-bold ${getRiskColor(transaction.riskScore)}`}>
                            {transaction.riskScore}%
                          </div>
                          <AlertTriangle className={`w-5 h-5 ${getRiskColor(transaction.riskScore)}`} />
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {transaction.flags.map((flag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Clear History Button */}
              {scannedTransactions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/20">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScannedTransactions([])}
                    className="border-destructive/20 text-destructive hover:bg-destructive/10"
                  >
                    Clear Scan History
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Transaction Analysis Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card/95 backdrop-blur-md border border-border/20 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                <span className="text-destructive">Deep Analysis:</span> {selectedTransaction.id}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transaction Details */}
              <div className="space-y-4">
                <Card className="bg-card/40 border-border/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From:</span>
                      <span className="font-medium">{selectedTransaction.from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To:</span>
                      <span className="font-medium">{selectedTransaction.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">{selectedTransaction.amount.toLocaleString()} credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route:</span>
                      <span className="font-medium">{selectedTransaction.planet}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{selectedTransaction.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Score:</span>
                      <Badge className={`${getRiskBadgeColor(selectedTransaction.riskScore)}`}>
                        {selectedTransaction.riskScore}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Flags */}
                <Card className="bg-card/40 border-border/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                      Risk Flags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedTransaction.flags.map((flag, i) => (
                        <Badge key={i} variant="destructive" className="text-xs">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Network Analysis */}
              <div className="space-y-4">
                <Card className="bg-card/40 border-border/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-destructive" />
                      Dark Side Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {networkAnalysis.map((analysis, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-3 bg-background/50 rounded border border-border/10 text-sm"
                        >
                          {analysis}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-destructive hover:bg-destructive/90">
                    <Shield className="w-4 h-4 mr-2" />
                    Flag as Suspicious
                  </Button>
                  <Button variant="outline" className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10">
                    <Users className="w-4 h-4 mr-2" />
                    Map Network
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
