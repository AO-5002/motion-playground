"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Scene } from "three";
import { Chicken } from "./Animals/Chicken";
import { Canvas } from "@react-three/fiber";

function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function CardGallery() {
  return (
    <Canvas>
      <Chicken />
    </Canvas>
  );
}

export { GalleryLayout, CardGallery };
