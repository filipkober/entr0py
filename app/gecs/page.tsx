"use client";

import ThreeLetter from "@/components/threeletter";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function HollyWoodBaby() {


  return (
    <div className="flex h-screen items-center">
        <div className="w-full h-1/2">
    <Canvas>
      <ambientLight />
      <pointLight position={[0,0,0]} />
      <ThreeLetter />
    </Canvas>
    </div>
    </div>
  );
}
