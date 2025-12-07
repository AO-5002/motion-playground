"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  GradientTexture,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

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
    ref.current.rotation.y += delta;
    ref.current.rotation.x += delta;
    ref.current.position.z += Math.sin(state.clock.elapsedTime) * 0.1;
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

function Sphere({ boxPosition, color }: BoxProps) {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { tension: 300, friction: 10 },
  });

  const ref = useRef<any>(0);

  useEffect(() => {
    console.log(Boolean(ref.current));
  }, []);

  useFrame((state, delta) => {
    // ref.current.rotation.x += delta;

    const speed = hovered ? 1 : 0;

    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed;
  });

  return (
    <>
      <animated.mesh
        position={boxPosition}
        scale={scale}
        ref={ref}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry />
        <MeshDistortMaterial ref={ref} speed={hovered ? 5 : 1}>
          <GradientTexture stops={[0, 0.8, 1]} colors={["#FF4567", "FFE0E0"]} />
        </MeshDistortMaterial>
        {/* <meshStandardMaterial
          color={`${color ?? `gray`}`}
          wireframe
          wireframeLinewidth={0.8}
        /> */}
      </animated.mesh>
    </>
  );
}

function Torus({ boxPosition, color }: BoxProps) {
  const ref = useRef<Mesh>(null!);

  useEffect(() => {
    console.log(Boolean(ref.current));
  }, []);

  useFrame((state, delta) => {
    // ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.rotation.x += delta;
    ref.current.rotation.z += delta;
  });

  return (
    <>
      <mesh position={boxPosition} ref={ref}>
        <torusGeometry />
        <meshStandardMaterial color={`${color ?? `gray`}`} />
      </mesh>
    </>
  );
}

const boxData: BoxProps[] = [
  {
    boxPosition: [1, 0, 0],
    color: "orange",
  },
  // {
  //   boxPosition: [-1, 0, 0],
  //   color: "orange",
  // },
  // {
  //   boxPosition: [-1, 2, 0],
  //   color: "blue",
  // },
  // {
  //   boxPosition: [1, 2, 0],
  //   color: "green",
  // },
];

export function TutorialThreeFiber() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <OrbitControls />
      <ambientLight />
      {/* <directionalLight position={[0, 0, 2]} /> */}
      {boxData.map((el, i) => {
        return <Sphere key={i} {...el} />;
      })}
    </Canvas>
  );
}
