'use client'

import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from "three";

const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

export default function SpinningIcosahedron() {
    const ref = useRef<THREE.Mesh>(null!)

    useFrame((state, delta) => {
        if(ref.current){
            ref.current.rotation.x += delta
            ref.current.rotation.y += delta
        }
    })

  return (
    <mesh ref={ref}>
        {/* <polyhedronGeometry args={
            [
                verticesOfCube,
                indicesOfFaces,
                2,
                1
            ]
        }/> */}
        <icosahedronGeometry args={[1, 0]}/>
        <meshStandardMaterial color="black" wireframe/>
    </mesh>
  )
}
