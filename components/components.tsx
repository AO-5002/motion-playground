"use client";
import { motion, type TargetAndTransition } from "motion/react";

const initialStyle: TargetAndTransition = {
  opacity: 0,
  scale: 1,
};

const animateStyle: TargetAndTransition = {
  opacity: 1,
  scale: 2,
  transition: { duration: 3 },
};

function Block() {
  return (
    <motion.div
      className="shrink-0 w-48 h-48 bg-green-400 rounded-lg flex justify-center items-center"
      initial={initialStyle}
      animate={animateStyle}
    >
      <p className="text-white font-bold text-4xl">Block</p>
    </motion.div>
  );
}

export default Block;
