import { Suspense } from "react"
import {Canvas} from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import Darth from "@/public/model/Darth"

export default function darth() {
  return (
    <div className="h-full w-full">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
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

