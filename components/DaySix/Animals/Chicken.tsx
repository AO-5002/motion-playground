"use client";

import React, { JSX, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

// Define the structure of your GLTF model
type GLTFResult = GLTF & {
  nodes: {
    Chicken_001_2: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export function Chicken(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/chicken.glb") as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <skinnedMesh
        geometry={nodes.Chicken_001_2.geometry}
        material={materials.Material}
        skeleton={nodes.Chicken_001_2.skeleton}
      />
      <primitive object={nodes.Root} />
    </group>
  );
}

useGLTF.preload("/chicken.glb");
