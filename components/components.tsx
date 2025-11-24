"use client";
import { motion, type TargetAndTransition } from "motion/react";

const initialStyle: TargetAndTransition = {
  opacity: 0,
  scale: 1,
};

const animateStyle: TargetAndTransition = {
  opacity: 1,
  scale: 2,
  filter: "blur(0px)",
  transition: { duration: 1 },
};

const exitStyle: TargetAndTransition = {
  filter: "blur(0px)",
};

function Block() {
  return (
    <motion.div
      className="shrink-0 w-48 h-48 bg-green-400 rounded-lg flex justify-center items-center"
      initial={{ filter: "blur(10px)" }}
      animate={animateStyle}
      exit={exitStyle}
    >
      <p className="text-white font-bold text-4xl">Block</p>
    </motion.div>
  );
}

export default Block;
