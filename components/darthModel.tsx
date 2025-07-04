import { Suspense, useState, useEffect } from "react"
import {Canvas} from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import Darth from "@/public/model/Darth"

// Sith-themed Loader Component
const SithLoader = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-destructive/5 via-transparent to-secondary/5 backdrop-blur-sm z-10">
      {/* Animated Sith Symbol */}
      <div className="relative mb-6">
        <div className="w-20 h-20 border-4 border-destructive/30 rounded-full animate-spin duration-2000">
          <div className="absolute top-0 left-0 w-5 h-5 bg-destructive rounded-full animate-pulse"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-gradient-to-r from-destructive to-red-600 rounded-full animate-pulse opacity-80"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold bg-gradient-to-r from-destructive to-red-600 bg-clip-text text-transparent">
          Awakening the Dark Side
        </h3>
        <p className="text-sm text-muted-foreground animate-pulse">
          Summoning Sith Lord from the shadows...
        </p>
      </div>
      
      {/* Animated Dots */}
      <div className="flex space-x-2 mt-6">
        <div className="w-3 h-3 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {/* Force Lightning Effect */}
      <div className="absolute top-1/4 left-1/4 w-1 h-8 bg-gradient-to-b from-transparent via-destructive to-transparent animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-6 bg-gradient-to-b from-transparent via-secondary to-transparent animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] animate-pulse duration-3000"></div>
    </div>
  )
}

export default function DarthModelComponent() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Auto-hide loader after 4 seconds as fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full w-full relative">
      {/* Loading Screen */}
      {!isLoaded && <SithLoader />}
      
      {/* 3D Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-30'}`}
        onCreated={() => {
          // Hide loader when canvas is created and starts rendering
          setTimeout(() => setIsLoaded(true), 2000)
        }}
      >
        <ambientLight intensity={1.5} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={2}
          minDistance={5}
          maxDistance={15}
        />
        <Suspense fallback={null}>
          <Darth scale={[3, 3, 3]} position={[0, -1, 0]} />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}

