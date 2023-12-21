import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from "three";


export default function ThreeLetter() {

    const obj = useLoader(OBJLoader, "./model.obj");
    const primitive = useRef<THREE.Mesh>();

    useFrame((state, delta) => {
        if (primitive.current) {
            primitive.current.rotation.z += delta;
            primitive.current.rotation.x = Math.PI / 2;
            primitive.current.scale.set(0.7, 0.7, 0.7);
        }
    });

  return (
    <primitive object={obj} ref={primitive} />
  )
}
