"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Scene } from "three";
import { Chicken } from "./Animals/Chicken";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <div className="border">{children}</div>;
}

function Gallery() {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />
      <Chicken position={[0, 0, 0]} />
    </Canvas>
  );
}

export { GalleryLayout, Gallery };
