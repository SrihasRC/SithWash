"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen flex items-center pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-secondary/10" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent_100%)] bg-[length:50px_50px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent_100%)] bg-[length:50px_50px]" />
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-destructive/20 rounded-full blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-24 h-24 bg-secondary/20 rounded-full blur-lg"
            animate={{
              x: [0, -25, 0],
              y: [0, 15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-32 left-32 w-20 h-20 bg-destructive/15 rounded-full blur-lg"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-16 h-16 bg-secondary/25 rounded-full blur-md"
            animate={{
              x: [0, -15, 0],
              y: [0, 25, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23000' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
        
        <div className="relative container mx-auto px-4 py-20 sm:py-32 lg:py-40 z-10">
          <div className="text-center space-y-8">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Badge variant="outline" className="border-destructive/20 text-destructive px-4 py-2 backdrop-blur-sm bg-background/80">
                🌟 Prompt Wars Hackathon - Team Black Walkers
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight opacity-20 blur-sm">
                  <span className="text-destructive">Sith</span>
                  <span className="text-secondary">Wash</span>
                </div>
              </div>
              <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="drop-shadow-lg bg-gradient-to-r from-destructive to-red-600 bg-clip-text text-transparent animate-pulse">
                  Sith
                </span>
                <span className="drop-shadow-lg bg-gradient-to-r from-secondary to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Wash
                </span>
              </h1>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-destructive/20 via-transparent to-secondary/20 rounded-lg blur-xl opacity-75"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <p className="mt-6 text-xl sm:text-2xl text-muted-foreground font-medium relative">
                <span className="bg-gradient-to-r from-muted-foreground to-white bg-clip-text text-transparent">
                  Audit the Dark Flow
                </span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed"
            >
              A dark side-themed anti-money laundering simulation platform. 
              Detect suspicious transactions and trace illicit funds through 
              the galactic financial network.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-destructive via-red-600 to-destructive rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Button 
                  asChild 
                  size="lg"
                  className="relative bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/20 hover:shadow-destructive/40 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                >
                  <Link href="/audit">
                    <motion.span
                      className="inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Auditing
                    </motion.span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-br from-card/30 via-background to-card/20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-40 h-40 bg-destructive/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-40 right-20 w-24 h-24 bg-destructive/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 relative z-10">
                <span className="bg-gradient-to-r from-destructive via-red-500 to-destructive bg-clip-text text-transparent">
                  Embrace the Dark Side
                </span>
                <span className="text-foreground"> of </span>
                <span className="bg-gradient-to-r from-secondary via-purple-500 to-secondary bg-clip-text text-transparent">
                  Finance
                </span>
              </h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-destructive/20 via-transparent to-secondary/20 rounded-lg blur-lg opacity-60 animate-pulse" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Use the power of the dark side to detect and analyze suspicious financial activities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sith Analytics",
                description: "Advanced AI-powered transaction analysis using dark side algorithms to detect patterns invisible to the light side",
                icon: "🔍",
                gradient: "from-destructive/20 to-red-600/20",
                iconBg: "bg-destructive/10",
                delay: 0
              },
              {
                title: "Network Mapping",
                description: "Visualize complex financial networks and trace illicit connections across the galactic financial system",
                icon: "🕸️",
                gradient: "from-secondary/20 to-purple-600/20",
                iconBg: "bg-secondary/10",
                delay: 0.2
              },
              {
                title: "Risk Assessment",
                description: "Calculate Sith alignment scores and identify high-risk entities using dark force prediction models",
                icon: "⚡",
                gradient: "from-destructive/20 to-secondary/20",
                iconBg: "bg-gradient-to-r from-destructive/10 to-secondary/10",
                delay: 0.4
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="group"
              >
                <Card className="relative bg-card/40 border-border/20 hover:bg-card/60 hover:shadow-2xl hover:shadow-destructive/20 transition-all duration-500 backdrop-blur-sm h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="text-center relative z-10">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${feature.iconBg} mb-4 mx-auto backdrop-blur-sm border border-border/10`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-4xl">{feature.icon}</span>
                    </motion.div>
                    <CardTitle className="text-xl text-foreground group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-center text-muted-foreground group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-destructive/50 via-secondary/50 to-destructive/50 p-[1px]">
                      <div className="w-full h-full bg-card/90 rounded-lg" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Additional decorative elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-card/60 rounded-full border border-border/20 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <span className="text-sm font-semibold bg-gradient-to-r from-destructive to-secondary bg-clip-text text-transparent">
                Dark Force Technology
              </span>
              <span className="text-destructive">⚡</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
