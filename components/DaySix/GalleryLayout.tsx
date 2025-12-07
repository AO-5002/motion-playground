"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Scene } from "three";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Chicken } from "./Animals/Chicken";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-[900px] border">{children}</div>;
}

function Btn({ children }: { children: React.ReactNode }) {
  return <Button className="w-24 p-12 rounded-xl">{children}</Button>;
}

function LeftBtn() {
  return (
    <Btn>
      <ChevronLeft />
    </Btn>
  );
}

function RightBtn() {
  return (
    <Btn>
      <ChevronRight />
    </Btn>
  );
}

function Gallery() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <div className="w-full h-full flex -my-12 justify-between items-center px-12">
          <LeftBtn />
          <RightBtn />
        </div>
      </div>
      <Canvas className=" border" camera={{ position: [-3, 0, 5], fov: 30 }}>
        <ambientLight intensity={1} />
        {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}
        <OrbitControls />
        <Chicken position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export { GalleryLayout, Gallery };
