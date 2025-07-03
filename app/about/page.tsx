"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Shield, Users, Eye, Sword, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  useEffect(() => {
    // Konami Code sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    const handleKeyPress = (event: KeyboardEvent) => {
      const newCode = [...konamiCode, event.code];
      
      // Keep only the last 10 keys
      if (newCode.length > 10) {
        newCode.shift();
      }
      
      setKonamiCode(newCode);
      
      // Check if the sequence matches
      if (newCode.length === 10 && 
          newCode.every((key, index) => key === konamiSequence[index])) {
        setShowEasterEgg(true);
        setKonamiCode([]);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiCode]);
  
  const handleDeathStarClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 1) { // 2 clicks total (0->1->2, but we check at 1)
      setShowEasterEgg(true);
      setClickCount(0);
    }
  };
  const executives = [
    {
      name: "Darth Financius",
      title: "CEO & Dark Lord of Finance",
      description: "Former Jedi turned to the dark side after discovering the true power of financial manipulation. Master of credit flows and galactic monetary systems.",
      skills: ["Financial Sorcery", "Credit Manipulation", "Market Domination"],
      avatar: "👑",
      gradient: "from-red-600 to-red-800",
      riskLevel: 99
    },
    {
      name: "Lord Crypticus", 
      title: "CTO & Sith Master of Technology",
      description: "Architect of the dark side algorithms that power SithWash. His code is as elegant as it is ruthless, bending technology to serve the Empire.",
      skills: ["Dark Algorithms", "Quantum Encryption", "AI Domination"],
      avatar: "⚡",
      gradient: "from-purple-600 to-purple-800",
      riskLevel: 96
    }
  ];

  const technologies = [
    {
      name: "Dark Force AI",
      description: "Advanced artificial intelligence powered by Sith knowledge and ancient financial algorithms",
      icon: "🧠",
      status: "Operational"
    },
    {
      name: "Quantum Encryption",
      description: "Unbreakable security protocols derived from the mysteries of the Force itself",
      icon: "🔐",
      status: "Active"
    },
    {
      name: "Galactic Network Mapping",
      description: "Real-time visualization of financial networks across all star systems",
      icon: "🌌",
      status: "Scanning"
    },
    {
      name: "Predictive Risk Engine",
      description: "Foresees financial crimes before they happen using the power of the dark side",
      icon: "🔮",
      status: "Evolving"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-secondary/10" />
        
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 bg-destructive/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent_100%)] bg-[length:40px_40px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent_100%)] bg-[length:40px_40px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hidden Death Star Easter Egg */}
        <motion.div
          className="fixed top-20 right-20 w-10 h-10 bg-gray-400/30 rounded-full cursor-pointer hover:bg-gray-400/60 transition-all duration-300 z-50 pointer-events-auto"
          onClick={handleDeathStarClick}
          whileHover={{ scale: 1.3, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          title="That's no moon..."
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300/40 to-gray-600/40 flex items-center justify-center border border-gray-500/30">
            <div className="w-1.5 h-1.5 bg-red-400/80 rounded-full animate-pulse" />
          </div>
        </motion.div>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Button asChild variant="outline" size="sm" className="border-destructive/20 text-destructive hover:bg-destructive/10 mb-6">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-destructive to-red-600 bg-clip-text text-transparent">
                About SithWash
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From the shadows of the galaxy, we emerged to bring order to the chaotic world of galactic finance. 
                Once servants of the light, we have embraced the power of the dark side to create the ultimate 
                anti-money laundering platform.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Origin Story */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-card/40 border-border/20 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Star className="w-6 h-6 mr-3 text-destructive" />
                Our Dark Transformation
              </CardTitle>
              <CardDescription className="text-base">
                The story of how we abandoned the failing Republic systems and embraced the efficiency of the dark side
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In the final days of the Republic, we witnessed the catastrophic failure of traditional financial oversight systems. 
                  Corruption ran rampant, credits flowed to fund rebel activities, and the galaxy descended into economic chaos.
                </p>
                <p>
                  It was then that we realized the truth: only through the focused power of the dark side could we bring 
                  true order to galactic finance. We abandoned the weak, bureaucratic methods of the old Republic and 
                  embraced Sith teachings to forge a new path.
                </p>
                <p>
                  <span className="text-destructive font-semibold">SithWash</span> was born from this revelation - 
                  a platform that harnesses the unlimited power of the dark side to detect, analyze, and eliminate 
                  financial crimes with ruthless efficiency.
                </p>
              </CardContent>
          </Card>
        </motion.section>

        {/* Leadership Team */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-destructive via-red-500 to-destructive bg-clip-text text-transparent">
              The Dark Council
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the Sith Lords who lead our crusade against galactic financial crime
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {executives.map((executive, index) => (
              <motion.div
                key={executive.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="group"
              >
                <Card className="bg-card/40 border-border/20 hover:bg-card/60 transition-all duration-500 backdrop-blur-sm h-full overflow-hidden">
                  <div className="relative">
                    <CardHeader className="relative z-10">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${executive.gradient} flex items-center justify-center text-2xl backdrop-blur-sm border border-border/10`}>
                          {executive.avatar}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl group-hover:text-white transition-colors duration-300">
                            {executive.name}
                          </CardTitle>
                          <Badge className="bg-destructive/20 text-destructive border-destructive/30 mt-1">
                            {executive.title}
                          </Badge>
                        </div>
                        <Badge className={`bg-red-500/20 text-red-400 border-red-500/30`}>
                          Risk Level: {executive.riskLevel}%
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <CardDescription className="text-muted-foreground group-hover:text-gray-300 transition-colors duration-300 leading-relaxed mb-4">
                        {executive.description}
                      </CardDescription>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Dark Side Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {executive.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-secondary via-purple-500 to-secondary bg-clip-text text-transparent">
              Dark Side Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge systems powered by ancient Sith knowledge and modern computational power
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="group"
              >
                <Card className="bg-card/40 border-border/20 hover:bg-card/60 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center text-2xl border border-border/10">
                        {tech.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground group-hover:text-white transition-colors duration-300">
                            {tech.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              tech.status === 'Operational' ? 'border-green-500/30 text-green-400' :
                              tech.status === 'Active' ? 'border-blue-500/30 text-blue-400' :
                              tech.status === 'Scanning' ? 'border-yellow-500/30 text-yellow-400' :
                              'border-purple-500/30 text-purple-400'
                            }`}
                          >
                            {tech.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground group-hover:text-gray-300 transition-colors duration-300">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-16"
        >
          <Card className="bg-card/40 border-border/20 backdrop-blur-sm overflow-hidden">
            <div className="relative">
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <Crown className="w-6 h-6 mr-3 text-secondary" />
                  Our Dark Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center space-y-6">
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    <span className="text-destructive font-semibold">Power.</span> {" "}
                    <span className="text-secondary font-semibold">Order.</span> {" "}
                    <span className="text-foreground font-semibold">Control.</span>
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We exist to bring absolute order to the chaotic realm of galactic finance. Through the unlimited 
                    power of the dark side, we will eliminate financial crime, expose rebel funding networks, and 
                    ensure that every credit in the galaxy flows according to Imperial law.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The old Republic&apos;s weak oversight systems have failed. Where they showed mercy, we show strength. 
                    Where they hesitated, we act decisively. We are the final solution to galactic financial crime.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-destructive/10 rounded-full border border-destructive/20">
                    <Eye className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium">Total Surveillance</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-secondary/10 rounded-full border border-secondary/20">
                    <Shield className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium">Absolute Security</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-foreground/10 rounded-full border border-border/20">
                    <Sword className="w-4 h-4" />
                    <span className="text-sm font-medium">Swift Justice</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Join the Dark Side</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of SithWash. Embrace efficiency. Abandon mercy. Bring order to the galaxy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative group">
              <Button asChild size="lg" className="relative bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 py-6">
                <Link href="/audit">
                  <Shield className="w-5 h-5 mr-2" />
                  Enter the Audit Console
                </Link>
              </Button>
            </div>
            <Button asChild variant="outline" size="lg" className="border-secondary/20 text-secondary hover:bg-secondary/10 px-8 py-6">
              <Link href="/network">
                <Users className="w-5 h-5 mr-2" />
                Explore Network Maps
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Star Wars Easter Egg Modal */}
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowEasterEgg(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400 rounded-lg p-8 max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              ⭐
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              ⭐
            </div>
            
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              🌟
            </motion.div>
            
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              The Force is Strong with This One!
            </h2>
            
            <p className="text-gray-300 mb-4">
              &ldquo;Your skills are complete. Indeed, you are powerful, as the Emperor has foreseen.&rdquo;
            </p>
            
            <div className="text-sm text-gray-400 mb-6">
              <p>🎯 Achievement Unlocked: Jedi Master</p>
              <p>You found the hidden Death Star or entered the Konami Code!</p>
            </div>
            
            <div className="flex justify-center space-x-4 text-2xl mb-4">
              <span>🚀</span>
              <span>⚔️</span>
              <span>🛸</span>
              <span>🌌</span>
            </div>
            
            <Button
              onClick={() => setShowEasterEgg(false)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
            >
              May the Force be with you
            </Button>
            
            <div className="mt-4 text-xs text-gray-500">
              &ldquo;Do or do not, there is no try.&rdquo; - Master Yoda
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
