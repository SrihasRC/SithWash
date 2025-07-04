import { Suspense } from "react"
import {Canvas} from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import Darth from "@/public/model/Darth"

export default function darth() {
  return (
    <div className="mt-5">
        <Canvas>
          <ambientLight intensity={1.5} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Darth />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
    </div>
  )
}

