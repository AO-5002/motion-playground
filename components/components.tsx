"use client";
import { motion, type TargetAndTransition } from "motion/react";
import { Sticker } from "lucide-react";

const initialStyle: TargetAndTransition = {
  opacity: 0,
};

const animateStyle: TargetAndTransition = {
  opacity: 1,
  filter: "blur(0px)",
  transition: { duration: 1 },
};

const exitStyle: TargetAndTransition = {
  filter: "blur(0px)",
};

function Block() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 300 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.5 }}
      className="shrink-0 w-48 h-48 bg-gradient-to-r from-red-400 to-orange-600 rounded-xl flex justify-center items-center"
      initial={{ filter: "blur(10px)", ...initialStyle }}
      animate={animateStyle}
      exit={exitStyle}
    >
      <Sticker size={48} color="white" className="font-bold" />
    </motion.div>
  );
}

export default Block;
