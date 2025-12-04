"use client";

import React, { JSX, useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
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
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/chicken.glb"
  ) as unknown as GLTFResult;
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Play the first animation automatically
    if (names.length > 0) {
      actions[names[0]]?.play();
    }

    // Or log available animations to see what you have
    console.log("Available animations:", names);
  }, [actions, names]);

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
