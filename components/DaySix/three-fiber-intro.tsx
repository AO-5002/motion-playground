"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Mesh } from "three";

// We define a mesh with properties like geometry, material, and color
// Directional Light is the way the camera light is positioned toward the box

type Vector3 = [x: number, y: number, z: number];

interface BoxProps {
  boxPosition: Vector3;
  color?: string;
}

function Cube({ boxPosition, color }: BoxProps) {
  // Animation with useFrame hook
  // delta is the difference between the current and last frame
  // State tells us a bunch of useful information regarding the state of our element

  const ref = useRef<any>(0);

  useEffect(() => {
    console.log(Boolean(ref.current));
  }, []);

  useFrame((state, delta) => {
    // ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 3;
    ref.current.rotation.x += delta * 3;
    ref.current.rotation.z += delta * 8;
  });

  return (
    <>
      <mesh position={boxPosition} ref={ref}>
        <boxGeometry />
        <meshStandardMaterial color={`${color ?? `gray`}`} />
      </mesh>
    </>
  );
}

const boxData: BoxProps[] = [
  {
    boxPosition: [1, 0, 0],
    color: "red",
  },
  {
    boxPosition: [-1, 0, 0],
    color: "orange",
  },
  {
    boxPosition: [-1, 2, 0],
    color: "blue",
  },
  {
    boxPosition: [1, 2, 0],
    color: "green",
  },
];

export function TutorialThreeFiber() {
  return (
    <Canvas>
      <OrbitControls />
      <directionalLight position={[0, 0, 2]} />
      {boxData.map((el, i) => {
        return <Cube key={i} {...el} />;
      })}
    </Canvas>
  );
}
