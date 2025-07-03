"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Network, 
  Eye, 
  Shield, 
  Target,
  Search,
  Filter,
  Clock,
  Users,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Globe
} from "lucide-react";
import { 
  generateEnhancedTransactions, 
  formatConfidence 
} from "@/lib/transaction-ml-utils";
import Link from "next/link";

interface NetworkNode {
  id: string;
  name: string;
  type: string;
  riskLevel: number;
  connections: number;
  status: string;
  credits: string;
  color: string;
  size: number;
  description: string;
  mlRiskLevel?: 'low' | 'medium' | 'high' | 'critical';
  fraudProbability?: number;
  suspiciousTransactions?: number;
  totalTransactions?: number;
}

export default function NetworkPage() {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [scanningMode, setScanningMode] = useState<'realtime' | 'analysis' | 'prediction'>('realtime');
  const [threatLevel, setThreatLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [filterHighRisk, setFilterHighRisk] = useState(false);
  const [filterSuspicious, setFilterSuspicious] = useState(false);
  const [showAllConnections, setShowAllConnections] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [mlNetworkStats, setMLNetworkStats] = useState({
    totalNodes: 0,
    suspiciousNodes: 0,
    fraudDetected: 0,
    avgRiskScore: 0
  });

  // Initialize ML-powered network analytics
  useEffect(() => {
    const transactions = generateEnhancedTransactions(200);
    
    // Calculate network-level ML stats
    const fraudulent = transactions.filter(t => t.mlPrediction?.isFraud);
    const avgRisk = transactions.reduce((sum, t) => sum + (t.mlPrediction?.probability || 0), 0) / transactions.length;
    
    setMLNetworkStats({
      totalNodes: transactions.length,
      suspiciousNodes: fraudulent.length,
      fraudDetected: fraudulent.length,
      avgRiskScore: avgRisk
    });
  }, []);

  // Simulate threat level changes
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setThreatLevel(prev => {
        const change = (Math.random() - 0.5) * 20;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Enhanced 3D network data with ML-powered filtering
  const graphData = useMemo(() => {
    const allNodes: NetworkNode[] = [
      {
        id: "core-hub",
        name: "Imperial Financial Core",
        type: "hub",
        riskLevel: 5,
        connections: 47,
        status: "secure",
        credits: "2.4M",
        color: "#3b82f6",
        size: 25,
        description: "Central hub for all Imperial financial operations",
        mlRiskLevel: "low",
        fraudProbability: 0.05,
        suspiciousTransactions: 2,
        totalTransactions: 150
      },
      {
        id: "rebel-cell-1",
        name: "Suspicious Cell Alpha",
        type: "suspect",
        riskLevel: 89,
        connections: 12,
        status: "high-risk",
        credits: "340K",
        color: "#dc2626",
        size: 20,
        description: "Known rebel financing operation",
        mlRiskLevel: "critical",
        fraudProbability: 0.92,
        suspiciousTransactions: 34,
        totalTransactions: 45
      },
      {
        id: "rebel-cell-2",
        name: "Unknown Network Beta",
        type: "suspect",
        riskLevel: 76,
        connections: 8,
        status: "monitoring",
        credits: "890K",
        color: "#dc2626",
        size: 18,
        description: "Emerging threat network",
        mlRiskLevel: "high",
        fraudProbability: 0.78,
        suspiciousTransactions: 23,
        totalTransactions: 32
      },
      {
        id: "outer-rim",
        name: "Outer Rim Exchange",
        type: "exchange",
        riskLevel: 34,
        connections: 23,
        status: "caution",
        credits: "1.2M",
        color: "#eab308",
        size: 22,
        description: "Major trading hub in outer territories",
        mlRiskLevel: "medium",
        fraudProbability: 0.34,
        suspiciousTransactions: 12,
        totalTransactions: 89
      },
      {
        id: "shadow-bank",
        name: "Shadow Banking Network",
        type: "suspect",
        riskLevel: 95,
        connections: 15,
        status: "critical",
        credits: "560K",
        color: "#991b1b",
        size: 24,
        description: "Underground financial network",
        mlRiskLevel: "critical",
        fraudProbability: 0.96,
        suspiciousTransactions: 78,
        totalTransactions: 89
      },
      {
        id: "legitimate-bank",
        name: "Coruscant Central Bank",
        type: "legitimate",
        riskLevel: 8,
        connections: 31,
        status: "secure",
        credits: "8.9M",
        color: "#059669",
        size: 23,
        description: "Legitimate banking institution",
        mlRiskLevel: "low",
        fraudProbability: 0.03,
        suspiciousTransactions: 1,
        totalTransactions: 234
      },
      {
        id: "mining-corp",
        name: "Kessel Mining Corp",
        type: "corporation",
        riskLevel: 45,
        connections: 16,
        status: "monitoring",
        credits: "3.1M",
        color: "#7c3aed",
        size: 19,
        description: "Large mining corporation",
        mlRiskLevel: "medium",
        fraudProbability: 0.42,
        suspiciousTransactions: 8,
        totalTransactions: 67
      },
      {
        id: "trade-federation",
        name: "Trade Federation Branch",
        type: "legitimate",
        riskLevel: 12,
        connections: 28,
        status: "secure",
        credits: "4.7M",
        color: "#059669",
        size: 21,
        description: "Official trade organization",
        mlRiskLevel: "low",
        fraudProbability: 0.08,
        suspiciousTransactions: 3,
        totalTransactions: 156
      }
    ];

    const allLinks = [
      { source: "core-hub", target: "rebel-cell-1", strength: 0.3, suspicious: true, amount: "45K", frequency: "high" },
      { source: "core-hub", target: "outer-rim", strength: 0.8, suspicious: false, amount: "2.1M", frequency: "normal" },
      { source: "rebel-cell-1", target: "shadow-bank", strength: 0.9, suspicious: true, amount: "780K", frequency: "critical" },
      { source: "rebel-cell-2", target: "shadow-bank", strength: 0.7, suspicious: true, amount: "340K", frequency: "high" },
      { source: "outer-rim", target: "rebel-cell-2", strength: 0.4, suspicious: true, amount: "120K", frequency: "medium" },
      { source: "legitimate-bank", target: "core-hub", strength: 0.9, suspicious: false, amount: "5.2M", frequency: "normal" },
      { source: "legitimate-bank", target: "outer-rim", strength: 0.6, suspicious: false, amount: "890K", frequency: "normal" },
      { source: "mining-corp", target: "outer-rim", strength: 0.7, suspicious: false, amount: "1.3M", frequency: "normal" },
      { source: "trade-federation", target: "core-hub", strength: 0.8, suspicious: false, amount: "3.4M", frequency: "normal" },
      { source: "shadow-bank", target: "mining-corp", strength: 0.5, suspicious: true, amount: "230K", frequency: "low" },
      { source: "rebel-cell-1", target: "rebel-cell-2", strength: 0.6, suspicious: true, amount: "67K", frequency: "medium" }
    ];

    // Apply filters
    let filteredNodes = allNodes;
    let filteredLinks = allLinks;

    if (filterHighRisk) {
      filteredNodes = filteredNodes.filter(node => node.riskLevel > 70);
    }

    if (filterSuspicious) {
      filteredNodes = filteredNodes.filter(node => node.type === 'suspect');
      filteredLinks = filteredLinks.filter(link => link.suspicious);
    }

    if (!showAllConnections) {
      filteredLinks = filteredLinks.filter(link => link.suspicious);
    }

    // Filter links to only include those between existing nodes
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    filteredLinks = filteredLinks.filter(link => 
      nodeIds.has(link.source) && nodeIds.has(link.target)
    );

    return { nodes: filteredNodes, links: filteredLinks };
  }, [filterHighRisk, filterSuspicious, showAllConnections]);

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
  };

  const resetHighlight = () => {
    setSelectedNode(null);
  };

  const toggleSimulation = () => {
    setIsPlaying(!isPlaying);
    // Animation is handled by CSS/Framer Motion now
  };

  const handleApplyFilters = async () => {
    setIsApplyingFilters(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsApplyingFilters(false);
    setNotification('Filters applied successfully!');
    setTimeout(() => setNotification(null), 3000);
    // Filters are already applied through the useMemo hook
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create CSV content
    const csvContent = [
      ['Node ID', 'Name', 'Type', 'Risk Level', 'Connections', 'Credits', 'Status'],
      ...graphData.nodes.map(node => [
        node.id,
        node.name,
        node.type,
        node.riskLevel,
        node.connections,
        node.credits,
        node.status
      ])
    ].map(row => row.join(',')).join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'network-analysis-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setIsExporting(false);
    setNotification('Report exported successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFilterToggle = (filterType: 'highRisk' | 'suspicious' | 'allConnections') => {
    switch (filterType) {
      case 'highRisk':
        setFilterHighRisk(!filterHighRisk);
        break;
      case 'suspicious':
        setFilterSuspicious(!filterSuspicious);
        break;
      case 'allConnections':
        setShowAllConnections(!showAllConnections);
        break;
    }
  };

  const recentActivities = [
    {
      id: 1,
      type: "transfer",
      from: "Shadow Banking Network",
      to: "Suspicious Cell Alpha",
      amount: "45,000 credits",
      risk: "high",
      timestamp: "2 minutes ago"
    },
    {
      id: 2,
      type: "pattern",
      description: "Circular transaction pattern detected",
      nodes: ["Suspicious Cell Alpha", "Unknown Network Beta"],
      risk: "critical",
      timestamp: "5 minutes ago"
    },
    {
      id: 3,
      type: "connection",
      description: "New connection established",
      from: "Unknown Network Beta",
      to: "Outer Rim Exchange",
      risk: "medium",
      timestamp: "8 minutes ago"
    }
  ];

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'text-red-400';
    if (risk >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-background to-secondary/5" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-pulse" />
        </div>
        
        {/* Floating Network Nodes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-destructive/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button asChild variant="outline" size="sm" className="border-destructive/20 text-destructive hover:bg-destructive/10 mb-6">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-destructive to-red-600 bg-clip-text text-transparent">
                Galactic Network Analysis
              </h1>
              <p className="text-lg text-muted-foreground">
                Real-time monitoring of financial networks across the galaxy
                {(filterHighRisk || filterSuspicious || !showAllConnections) && (
                  <span className="ml-2 text-yellow-400">
                    • {[filterHighRisk, filterSuspicious, !showAllConnections].filter(Boolean).length} filter(s) active
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-card/40 rounded-lg border border-border/20">
                <Activity className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium">Threat Level:</span>
                <span className={`text-sm font-bold ${getRiskColor(threatLevel)}`}>
                  {threatLevel.toFixed(0)}%
                </span>
              </div>
              
              <Badge 
                variant="outline" 
                className="border-green-500/30 text-green-400 px-3 py-1"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                System Active
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center">
                <Network className="w-5 h-5 mr-2 text-destructive" />
                Network Control Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Analysis Mode</p>
                <div className="flex flex-wrap gap-2">
                  {['realtime', 'analysis', 'prediction'].map((mode) => (
                    <Button
                      key={mode}
                      variant={scanningMode === mode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setScanningMode(mode as 'realtime' | 'analysis' | 'prediction')}
                      className={scanningMode === mode ? "bg-destructive hover:bg-destructive/90" : ""}
                    >
                      {mode === 'realtime' && <Eye className="w-4 h-4 mr-1" />}
                      {mode === 'analysis' && <Search className="w-4 h-4 mr-1" />}
                      {mode === 'prediction' && <Target className="w-4 h-4 mr-1" />}
                      {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <p className="text-sm font-medium mb-2">Filters</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={filterHighRisk ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => handleFilterToggle('highRisk')}
                    className={filterHighRisk ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10"}
                    onMouseEnter={() => setShowTooltip('high-risk')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Risk Level {'>'}70%
                    {filterHighRisk && <span className="ml-1">✓</span>}
                  </Button>
                  <Button 
                    variant={filterSuspicious ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => handleFilterToggle('suspicious')}
                    className={filterSuspicious ? "bg-red-500 hover:bg-red-600 text-white" : "border-red-500/20 text-red-400 hover:bg-red-500/10"}
                    onMouseEnter={() => setShowTooltip('suspicious')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    Suspicious Only
                    {filterSuspicious && <span className="ml-1">✓</span>}
                  </Button>
                  <Button 
                    variant={showAllConnections ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => handleFilterToggle('allConnections')}
                    className={showAllConnections ? "bg-blue-500 hover:bg-blue-600 text-white" : "border-blue-500/20 text-blue-400 hover:bg-blue-500/10"}
                    onMouseEnter={() => setShowTooltip('connections')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <Network className="w-4 h-4 mr-1" />
                    Show All Connections
                    {showAllConnections && <span className="ml-1">✓</span>}
                  </Button>
                </div>
                
                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute top-full mt-2 left-0 bg-background/90 backdrop-blur-sm border border-border/20 rounded-lg p-2 text-xs z-50">
                    {showTooltip === 'high-risk' && "Show only nodes with risk level above 70%"}
                    {showTooltip === 'suspicious' && "Show only nodes marked as suspicious"}
                    {showTooltip === 'connections' && "Toggle between showing all connections or only suspicious ones"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/40 border-border/20 backdrop-blur-sm h-[600px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-secondary" />
                    3D Network Visualization
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSimulation}
                      className="border-destructive/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetHighlight}
                      className="border-secondary/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      {graphData.nodes.length} Nodes
                    </Badge>
                    {(filterHighRisk || filterSuspicious || !showAllConnections) && (
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                        Filtered
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-3">
                <div className="relative w-full h-full bg-background/10 rounded-lg border border-border/10 overflow-hidden">
                  {/* Fallback 2D Network Visualization */}
                  <div className="relative w-full h-[500px] bg-gradient-to-br from-background/20 to-secondary/10">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(220,38,38,0.1)_25%,rgba(220,38,38,0.1)_26%,transparent_27%,transparent_74%,rgba(220,38,38,0.1)_75%,rgba(220,38,38,0.1)_76%,transparent_77%,transparent_100%)] bg-[length:30px_30px]" />
                      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(220,38,38,0.1)_25%,rgba(220,38,38,0.1)_26%,transparent_27%,transparent_74%,rgba(220,38,38,0.1)_75%,rgba(220,38,38,0.1)_76%,transparent_77%,transparent_100%)] bg-[length:30px_30px]" />
                    </div>

                    {/* Network Connections */}
                    <svg className="absolute inset-0 w-full h-full">
                      {graphData.links.map((link, i) => {
                        const fromNode = graphData.nodes.find(n => n.id === link.source);
                        const toNode = graphData.nodes.find(n => n.id === link.target);
                        if (!fromNode || !toNode) return null;
                        
                        // Calculate positions (spread nodes across the canvas)
                        const fromX = (fromNode.id === 'core-hub') ? 50 : 
                                     (fromNode.id === 'rebel-cell-1') ? 20 :
                                     (fromNode.id === 'rebel-cell-2') ? 80 :
                                     (fromNode.id === 'outer-rim') ? 75 :
                                     (fromNode.id === 'shadow-bank') ? 25 :
                                     (fromNode.id === 'legitimate-bank') ? 50 :
                                     (fromNode.id === 'mining-corp') ? 65 : 35;
                        
                        const fromY = (fromNode.id === 'core-hub') ? 50 : 
                                     (fromNode.id === 'rebel-cell-1') ? 25 :
                                     (fromNode.id === 'rebel-cell-2') ? 30 :
                                     (fromNode.id === 'outer-rim') ? 75 :
                                     (fromNode.id === 'shadow-bank') ? 70 :
                                     (fromNode.id === 'legitimate-bank') ? 20 :
                                     (fromNode.id === 'mining-corp') ? 60 : 40;
                        
                        const toX = (toNode.id === 'core-hub') ? 50 : 
                                   (toNode.id === 'rebel-cell-1') ? 20 :
                                   (toNode.id === 'rebel-cell-2') ? 80 :
                                   (toNode.id === 'outer-rim') ? 75 :
                                   (toNode.id === 'shadow-bank') ? 25 :
                                   (toNode.id === 'legitimate-bank') ? 50 :
                                   (toNode.id === 'mining-corp') ? 65 : 35;
                        
                        const toY = (toNode.id === 'core-hub') ? 50 : 
                                   (toNode.id === 'rebel-cell-1') ? 25 :
                                   (toNode.id === 'rebel-cell-2') ? 30 :
                                   (toNode.id === 'outer-rim') ? 75 :
                                   (toNode.id === 'shadow-bank') ? 70 :
                                   (toNode.id === 'legitimate-bank') ? 20 :
                                   (toNode.id === 'mining-corp') ? 60 : 40;
                        
                        return (
                          <motion.line
                            key={i}
                            x1={`${fromX}%`}
                            y1={`${fromY}%`}
                            x2={`${toX}%`}
                            y2={`${toY}%`}
                            stroke={link.suspicious ? "#dc2626" : "#10b981"}
                            strokeWidth={link.strength * 3 + 1}
                            strokeOpacity={0.8}
                            strokeDasharray={link.suspicious ? "5,5" : "none"}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{ duration: 2, delay: i * 0.2 }}
                            className="drop-shadow-glow"
                          />
                        );
                      })}
                    </svg>

                    {/* Network Nodes */}
                    {graphData.nodes.map((node, i) => {
                      const x = (node.id === 'core-hub') ? 50 : 
                               (node.id === 'rebel-cell-1') ? 20 :
                               (node.id === 'rebel-cell-2') ? 80 :
                               (node.id === 'outer-rim') ? 75 :
                               (node.id === 'shadow-bank') ? 25 :
                               (node.id === 'legitimate-bank') ? 50 :
                               (node.id === 'mining-corp') ? 65 : 35;
                      
                      const y = (node.id === 'core-hub') ? 50 : 
                               (node.id === 'rebel-cell-1') ? 25 :
                               (node.id === 'rebel-cell-2') ? 30 :
                               (node.id === 'outer-rim') ? 75 :
                               (node.id === 'shadow-bank') ? 70 :
                               (node.id === 'legitimate-bank') ? 20 :
                               (node.id === 'mining-corp') ? 60 : 40;
                      
                      return (
                        <motion.div
                          key={node.id}
                          className={`absolute cursor-pointer transition-all duration-300 ${
                            selectedNode?.id === node.id ? 'z-20' : 'z-10'
                          }`}
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          onClick={() => handleNodeClick(node)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {/* Node Glow Effect */}
                          <div 
                            className="absolute inset-0 rounded-full blur-xl opacity-50"
                            style={{
                              background: node.color,
                              width: `${node.size * 2}px`,
                              height: `${node.size * 2}px`,
                              transform: 'translate(-50%, -50%)',
                              left: '50%',
                              top: '50%'
                            }}
                          />
                          
                          {/* Main Node */}
                          <div
                            className={`relative border-2 rounded-full flex items-center justify-center text-white font-bold shadow-2xl ${
                              selectedNode?.id === node.id ? 'ring-4 ring-white ring-opacity-50' : ''
                            }`}
                            style={{
                              width: `${node.size}px`,
                              height: `${node.size}px`,
                              backgroundColor: node.color,
                              borderColor: node.riskLevel > 70 ? '#dc2626' : node.color,
                              fontSize: `${node.size / 3}px`
                            }}
                          >
                            {node.type === 'hub' && '🏛️'}
                            {node.type === 'suspect' && '⚠️'}
                            {node.type === 'exchange' && '💱'}
                            {node.type === 'legitimate' && '🏦'}
                            {node.type === 'corporation' && '🏭'}
                            
                            {/* Risk Indicator */}
                            {node.riskLevel > 70 && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse" />
                            )}
                          </div>
                          
                          {/* Node Label */}
                          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium whitespace-nowrap border border-border/20">
                            {node.name.split(' ')[0]}
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Scanning Effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-destructive/20 to-transparent transform rotate-45" />
                    </motion.div>
                  </div>
                  
                  {/* Overlay Info */}
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border/20">
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Suspicious</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Legitimate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Hub</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Status Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Network Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Network Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-secondary" />
                    Network Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-background/30 rounded-lg">
                      <p className="text-2xl font-bold text-destructive">{graphData.nodes.filter(n => n.type === 'suspect').length}</p>
                      <p className="text-xs text-muted-foreground">Suspicious Nodes</p>
                    </div>
                    <div className="text-center p-3 bg-background/30 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">{graphData.nodes.filter(n => n.type === 'legitimate').length}</p>
                      <p className="text-xs text-muted-foreground">Legitimate Nodes</p>
                    </div>
                    <div className="text-center p-3 bg-background/30 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-400">{graphData.links.filter(l => l.suspicious).length}</p>
                      <p className="text-xs text-muted-foreground">Suspicious Links</p>
                    </div>
                    <div className="text-center p-3 bg-background/30 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">{graphData.links.length}</p>
                      <p className="text-xs text-muted-foreground">Total Connections</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Network Risk</span>
                      <span className={getRiskColor(threatLevel)}>{threatLevel.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${
                          threatLevel >= 80 ? 'bg-red-500' : 
                          threatLevel >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${threatLevel}%` }}
                        animate={{ width: `${threatLevel}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Node Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-destructive" />
                    Node Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{selectedNode.name}</h3>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {selectedNode.type.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Risk Level</p>
                            <p className={`font-semibold ${getRiskColor(selectedNode.riskLevel)}`}>
                              {selectedNode.riskLevel}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">ML Risk Level</p>
                            <Badge className={`text-xs ${
                              selectedNode.mlRiskLevel === 'critical' ? 'bg-red-500/20 text-red-400' :
                              selectedNode.mlRiskLevel === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              selectedNode.mlRiskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {selectedNode.mlRiskLevel?.toUpperCase() || 'UNKNOWN'}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Connections</p>
                            <p className="font-semibold">{selectedNode.connections}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Fraud Probability</p>
                            <p className="font-semibold text-purple-400">
                              {formatConfidence(selectedNode.fraudProbability || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Credits</p>
                            <p className="font-semibold">{selectedNode.credits}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">ML Analysis</p>
                            <p className="font-semibold">
                              {selectedNode.suspiciousTransactions}/{selectedNode.totalTransactions} suspicious
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                selectedNode.status === 'secure' ? 'border-green-500/30 text-green-400' :
                                selectedNode.status === 'critical' ? 'border-red-500/30 text-red-400' :
                                selectedNode.status === 'high-risk' ? 'border-red-500/30 text-red-400' :
                                'border-yellow-500/30 text-yellow-400'
                              }`}
                            >
                              {selectedNode.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-border/20">
                          <p className="text-xs text-muted-foreground mb-2">Description</p>
                          <p className="text-sm">{selectedNode.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Click on a node in the 3D visualization to view detailed analysis
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-secondary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, i) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="p-3 bg-background/30 rounded-lg border border-border/10"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              activity.risk === 'critical' ? 'border-red-500/30 text-red-400' :
                              activity.risk === 'high' ? 'border-red-500/30 text-red-400' :
                              activity.risk === 'medium' ? 'border-yellow-500/30 text-yellow-400' :
                              'border-green-500/30 text-green-400'
                            }`}
                          >
                            {activity.risk.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </span>
                        </div>
                        
                        <div className="text-sm">
                          {activity.type === 'transfer' && (
                            <div>
                              <p className="font-medium mb-1">Credit Transfer</p>
                              <p className="text-muted-foreground">
                                {activity.amount} from {activity.from} to {activity.to}
                              </p>
                            </div>
                          )}
                          {activity.type === 'pattern' && (
                            <div>
                              <p className="font-medium mb-1">Suspicious Pattern</p>
                              <p className="text-muted-foreground">
                                {activity.description}
                              </p>
                            </div>
                          )}
                          {activity.type === 'connection' && (
                            <div>
                              <p className="font-medium mb-1">Network Change</p>
                              <p className="text-muted-foreground">
                                {activity.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Button asChild size="lg" className="bg-destructive hover:bg-destructive/90">
            <Link href="/audit">
              <Shield className="w-5 h-5 mr-2" />
              Launch Deep Audit
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleApplyFilters}
            disabled={isApplyingFilters}
            className="border-secondary/20 text-secondary hover:bg-secondary/10 disabled:opacity-50"
          >
            {isApplyingFilters ? (
              <>
                <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Applying...
              </>
            ) : (
              <>
                <Filter className="w-5 h-5 mr-2" />
                Apply Filters
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleExportReport}
            disabled={isExporting}
            className="border-border/20 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Exporting...
              </>
            ) : (
              <>
                <Users className="w-5 h-5 mr-2" />
                Export Report
              </>
            )}
          </Button>
        </motion.div>
        
        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {notification}
          </motion.div>
        )}

        {/* ML Network Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-400" />
                ML Network Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-background/30 rounded-lg">
                  <p className="text-2xl font-bold text-purple-400">{formatConfidence(mlNetworkStats.avgRiskScore)}</p>
                  <p className="text-xs text-muted-foreground">Avg Risk Score</p>
                </div>
                <div className="text-center p-3 bg-background/30 rounded-lg">
                  <p className="text-2xl font-bold text-red-400">{mlNetworkStats.fraudDetected}</p>
                  <p className="text-xs text-muted-foreground">Fraud Detected</p>
                </div>
                <div className="text-center p-3 bg-background/30 rounded-lg">
                  <p className="text-2xl font-bold text-orange-400">{mlNetworkStats.suspiciousNodes}</p>
                  <p className="text-xs text-muted-foreground">Suspicious Nodes</p>
                </div>
                <div className="text-center p-3 bg-background/30 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">{mlNetworkStats.totalNodes}</p>
                  <p className="text-xs text-muted-foreground">Total Analyzed</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/20">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ML Confidence</span>
                    <span className="text-green-400">High</span>
                  </div>
                  <div className="w-full bg-background/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: '87%' }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
