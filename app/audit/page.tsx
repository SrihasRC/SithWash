"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Shield, Zap, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

// Types
type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
  riskScore: number;
  flags: string[];
  planet: string;
  category: string;
};

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "TX001",
    from: "Jabba's Palace Holdings",
    to: "Cloud City Enterprises",
    amount: 1250000,
    timestamp: "2024-12-15T14:30:00Z",
    riskScore: 95,
    flags: ["High Amount", "Suspicious Pattern", "Known Entity"],
    planet: "Tatooine → Bespin",
    category: "Spice Trade"
  },
  {
    id: "TX002", 
    from: "Imperial Mining Corp",
    to: "Outer Rim Logistics",
    amount: 750000,
    timestamp: "2024-12-15T13:45:00Z",
    riskScore: 78,
    flags: ["Cross-Border", "Shell Company"],
    planet: "Kessel → Ryloth",
    category: "Resource Export"
  },
  {
    id: "TX003",
    from: "Coruscant Bank",
    to: "Anonymous Wallet 7X9",
    amount: 2100000,
    timestamp: "2024-12-15T12:20:00Z",
    riskScore: 92,
    flags: ["Anonymous Recipient", "Large Sum", "Time Anomaly"],
    planet: "Coruscant → Unknown",
    category: "Unknown"
  },
  {
    id: "TX004",
    from: "Mandalorian Contractors",
    to: "Kaminoan Research Lab",
    amount: 450000,
    timestamp: "2024-12-15T11:15:00Z",
    riskScore: 34,
    flags: ["Legitimate Contract"],
    planet: "Mandalore → Kamino",
    category: "Defense Contract"
  },
  {
    id: "TX005",
    from: "Mos Eisley Cantina",
    to: "Smugglers Alliance",
    amount: 125000,
    timestamp: "2024-12-15T10:30:00Z",
    riskScore: 87,
    flags: ["Known Criminal Network", "Small Frequent Transfers"],
    planet: "Tatooine → Multiple",
    category: "Illegal Services"
  }
];

export default function AuditPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [networkAnalysis, setNetworkAnalysis] = useState<string[]>([]);

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
    setIsScanning(true);
    setScanProgress(0);
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
            <CardContent>
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
              <CardTitle>Recent Suspicious Transactions</CardTitle>
              <CardDescription>
                High-risk financial activities detected by the dark side algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-card/60 rounded-lg border border-border/20 hover:bg-card/80 transition-colors cursor-pointer"
                    onClick={() => analyzeTransaction(transaction)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {transaction.id}
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
