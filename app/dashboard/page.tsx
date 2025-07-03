"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Activity,
  Clock,
  Users,
  CreditCard,
  DollarSign,
  BarChart3,
  PieChart,
  Globe,
  Target,
  Filter,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { 
  generateEnhancedTransactions, 
  type EnhancedTransaction, 
  formatConfidence 
} from "@/lib/transaction-ml-utils";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  description: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface ActivityItem {
  id: string;
  type: 'alert' | 'scan' | 'block' | 'approve';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  amount?: string;
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [enhancedTransactions, setEnhancedTransactions] = useState<EnhancedTransaction[]>([]);
  const [mlMetrics, setMLMetrics] = useState({
    totalTransactions: 0,
    fraudDetected: 0,
    fraudRate: 0,
    modelAccuracy: 0,
    avgRiskScore: 0,
    criticalAlerts: 0
  });
  const [liveMetrics, setLiveMetrics] = useState({
    threatLevel: 67,
    activeScans: 23,
    blockedTransactions: 156,
    suspiciousActivities: 8
  });

  // Initialize ML-powered analytics
  useEffect(() => {
    const transactions = generateEnhancedTransactions(100);
    setEnhancedTransactions(transactions);
    
    // Calculate ML metrics
    const fraudulent = transactions.filter(t => t.mlPrediction?.isFraud);
    const critical = transactions.filter(t => t.riskLevel === 'critical');
    const avgRisk = transactions.reduce((sum, t) => sum + (t.mlPrediction?.probability || 0), 0) / transactions.length;
    
    setMLMetrics({
      totalTransactions: transactions.length,
      fraudDetected: fraudulent.length,
      fraudRate: fraudulent.length / transactions.length,
      modelAccuracy: 0.92, // Using known accuracy from our model
      avgRiskScore: avgRisk,
      criticalAlerts: critical.length
    });
  }, []);

  // Simulate real-time ML-powered updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        threatLevel: Math.max(0, Math.min(100, prev.threatLevel + (Math.random() - 0.5) * 10)),
        activeScans: Math.max(0, prev.activeScans + Math.floor((Math.random() - 0.5) * 5)),
        blockedTransactions: prev.blockedTransactions + Math.floor(Math.random() * 3),
        suspiciousActivities: Math.max(0, prev.suspiciousActivities + Math.floor((Math.random() - 0.7) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const metricCards: MetricCard[] = [
    {
      title: "ML Fraud Detection",
      value: `${(mlMetrics.fraudRate * 100).toFixed(1)}%`,
      change: -2.3,
      trend: 'down',
      icon: <Shield className="w-5 h-5" />,
      description: "ML-powered fraud detection rate"
    },
    {
      title: "Transactions Analyzed",
      value: mlMetrics.totalTransactions.toLocaleString(),
      change: 12.5,
      trend: 'up',
      icon: <Eye className="w-5 h-5" />,
      description: "Real-time ML analysis pipeline"
    },
    {
      title: "Critical Alerts",
      value: mlMetrics.criticalAlerts.toString(),
      change: 8.7,
      trend: 'up',
      icon: <CreditCard className="w-5 h-5" />,
      description: "High-risk transactions flagged"
    },
    {
      title: "Model Accuracy",
      value: `${(mlMetrics.modelAccuracy * 100).toFixed(1)}%`,
      change: 0.5,
      trend: 'up',
      icon: <DollarSign className="w-5 h-5" />,
      description: "ML model performance metric"
    }
  ];

  const riskDistribution: ChartData[] = [
    { label: "Critical", value: enhancedTransactions.filter(t => t.riskLevel === 'critical').length, color: "#dc2626" },
    { label: "High", value: enhancedTransactions.filter(t => t.riskLevel === 'high').length, color: "#ea580c" },
    { label: "Medium", value: enhancedTransactions.filter(t => t.riskLevel === 'medium').length, color: "#eab308" },
    { label: "Low", value: enhancedTransactions.filter(t => t.riskLevel === 'low').length, color: "#16a34a" }
  ];

  const systemActivity: ChartData[] = [
    { label: "Scans", value: 45, color: "#3b82f6" },
    { label: "Blocks", value: 28, color: "#dc2626" },
    { label: "Approvals", value: 67, color: "#16a34a" },
    { label: "Reviews", value: 23, color: "#eab308" }
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      type: "alert",
      message: `ML Model flagged ${mlMetrics.fraudDetected} suspicious transactions`,
      timestamp: "2 minutes ago",
      severity: mlMetrics.fraudDetected > 20 ? "high" : "medium",
      amount: `${mlMetrics.fraudDetected} transactions`
    },
    {
      id: "2",
      type: "block",
      message: "High-confidence fraud prediction - transaction blocked",
      timestamp: "5 minutes ago",
      severity: "critical"
    },
    {
      id: "3",
      type: "scan",
      message: `Deep ML analysis completed on ${mlMetrics.totalTransactions} transactions`,
      timestamp: "12 minutes ago",
      severity: "medium"
    },
    {
      id: "4",
      type: "approve",
      message: `Model accuracy maintained at ${(mlMetrics.modelAccuracy * 100).toFixed(1)}%`,
      timestamp: "18 minutes ago",
      severity: "low"
    },
    {
      id: "5",
      type: "alert",
      message: `Feature analysis detected ${mlMetrics.criticalAlerts} critical risk patterns`,
      timestamp: "25 minutes ago",
      severity: mlMetrics.criticalAlerts > 5 ? "high" : "medium"
    }
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'scan': return <Activity className="w-4 h-4" />;
      case 'block': return <Shield className="w-4 h-4" />;
      case 'approve': return <Target className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: ActivityItem['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
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
        
        {/* Floating Data Points */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-destructive/40 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${5 + i * 8}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
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
                Imperial Command Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Real-time analytics and monitoring of galactic financial security
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                {['1h', '24h', '7d', '30d'].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range as '1h' | '24h' | '7d' | '30d')}
                    className={timeRange === range ? "bg-destructive hover:bg-destructive/90" : ""}
                  >
                    {range}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-secondary/20 text-secondary hover:bg-secondary/10"
              >
                {isRefreshing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
              </Button>
              
              <Badge 
                variant="outline" 
                className="border-green-500/30 text-green-400 px-3 py-1"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Live
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metricCards.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm hover:bg-card/60 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-destructive/20 rounded-lg">
                        {metric.icon}
                      </div>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </CardTitle>
                    </div>
                    <div className={`flex items-center text-xs ${
                      metric.trend === 'up' ? 'text-green-400' : 
                      metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : 
                       metric.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> : null}
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Risk Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-destructive" />
                    Risk Distribution Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskDistribution.map((item, index) => (
                      <div key={item.label} className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.label}</span>
                            <span className="text-sm text-muted-foreground">{item.value}%</span>
                          </div>
                          <div className="w-full bg-background/30 rounded-full h-2">
                            <motion.div
                              className="h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Activity Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
                    System Activity Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {systemActivity.map((item, index) => (
                      <div key={item.label} className="text-center">
                        <div className="relative mb-3">
                          <div className="w-full bg-background/30 rounded-full h-3">
                            <motion.div
                              className="h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1.5, delay: index * 0.2 }}
                            />
                          </div>
                          <div className="absolute top-0 right-0 text-xs text-muted-foreground">
                            {item.value}%
                          </div>
                        </div>
                        <div className="text-sm font-medium">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Live Threat Monitor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-destructive" />
                    Live Threat Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-background/30"
                          />
                          <motion.circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke={liveMetrics.threatLevel > 70 ? "#dc2626" : liveMetrics.threatLevel > 40 ? "#eab308" : "#16a34a"}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: liveMetrics.threatLevel / 100 }}
                            transition={{ duration: 1 }}
                            style={{
                              strokeDasharray: "226.19",
                              strokeDashoffset: `${226.19 * (1 - liveMetrics.threatLevel / 100)}`
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{liveMetrics.threatLevel.toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Current Threat Level</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-background/30 rounded-lg">
                        <div className="text-lg font-bold text-blue-400">{liveMetrics.activeScans}</div>
                        <div className="text-xs text-muted-foreground">Active Scans</div>
                      </div>
                      <div className="text-center p-3 bg-background/30 rounded-lg">
                        <div className="text-lg font-bold text-red-400">{liveMetrics.suspiciousActivities}</div>
                        <div className="text-xs text-muted-foreground">Alerts</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-secondary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-background/30 rounded-lg border border-border/10"
                      >
                        <div className={`p-1 rounded-full ${getSeverityColor(activity.severity)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground mb-1">
                            {activity.message}
                          </p>
                          {activity.amount && (
                            <p className="text-xs text-muted-foreground mb-1">
                              Amount: {activity.amount}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* ML Insights Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Card className="bg-card/40 border-border/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                ML Model Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-3 bg-background/30 rounded-lg">
                    <div className="text-lg font-bold text-green-400">
                      {formatConfidence(mlMetrics.avgRiskScore)}
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Risk Score</div>
                  </div>
                  <div className="text-center p-3 bg-background/30 rounded-lg">
                    <div className="text-lg font-bold text-blue-400">
                      {mlMetrics.fraudDetected}
                    </div>
                    <div className="text-xs text-muted-foreground">Fraud Detected</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Model Performance</span>
                    <span className="text-sm font-medium">{formatConfidence(mlMetrics.modelAccuracy)}</span>
                  </div>
                  <div className="w-full bg-background/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${mlMetrics.modelAccuracy * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fraud Detection Rate</span>
                    <span className="text-sm font-medium">{formatConfidence(mlMetrics.fraudRate)}</span>
                  </div>
                  <div className="w-full bg-background/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${mlMetrics.fraudRate * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full text-xs border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                  asChild
                >
                  <Link href="/audit">
                    View Detailed Analysis
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Button asChild size="lg" className="bg-destructive hover:bg-destructive/90">
            <Link href="/audit">
              <Shield className="w-5 h-5 mr-2" />
              Launch Deep Audit
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-secondary/20 text-secondary hover:bg-secondary/10">
            <Link href="/network">
              <Globe className="w-5 h-5 mr-2" />
              Network Analysis
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-border/20">
            <Filter className="w-5 h-5 mr-2" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="lg" className="border-border/20">
            <Users className="w-5 h-5 mr-2" />
            Generate Report
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
