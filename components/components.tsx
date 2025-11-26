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
      dragMomentum={false}
      dragElastic={0.2}
      whileDrag={{ scale: 1.5 }}
      className="shrink-0 w-48 h-48 bg-gradient-to-r from-red-400 to-orange-600 rounded-xl flex justify-center items-center"
      initial={{
        filter: "blur(10px)",
        transform: "translateX(-100px)",
        ...initialStyle,
      }}
      animate={{ ...animateStyle }}
      exit={exitStyle}
    >
      <Sticker size={48} color="white" className="font-bold" />
    </motion.div>
  );
}

// ----------------------------------------------------------------------------

function Content() {
  return (
    <span className="flex flex-col items-center gap-4 ">
      <p className="text-white font-bold text-2xl font-mono">2</p>
      <Sticker size={48} color="white" className="font-bold" />
    </span>
  );
}

function Block2() {
  return (
    <motion.div
      className="w-48 h-48 bg-gradient-to-r from-red-400 to-pink-600 rounded-xl flex justify-center items-center"
      initial={{ x: 0, opacity: 0, scale: 0 }}
      animate={{
        x: 0,
        rotate: 360,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 },
      }}
      style={{ transformOrigin: "center" }}
    >
      <Content />
    </motion.div>
  );
}

function AnimatedList() {
  function ListItem() {
    return (
      <li
        className="bg-white w-full "
        style={{ transform: "rotate(var(--rotate))" }}
      >
        hi
      </li>
    );
  }

  return (
    <motion.ul
      className="w-96 h-96 bg-zinc-800 shadow rounded-xl flex justify-center items-center list-none"
      initial={{ "--rotate": "0deg" }}
      animate={{ "--rotate": "360deg" }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ListItem />
      <ListItem />
      <ListItem />
    </motion.ul>
  );
}

function KeyFrameBlock() {
  return (
    <motion.div
      className="w-48 h-48 border bg-zinc-900 flex flex-col justify-center items-center gap-4"
      initial={{ scale: 1 }}
      animate={{
        borderRadius: [0, 100, 0],
        rotate: [0, 0, 180, 360, 0],
        scale: [1, 2, 2, 1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        times: [0, 0.2, 0.5, 0.8, 1],
        repeatDelay: 1,
      }}
    >
      <Content />
    </motion.div>
  );
}

export { Block, Block2, AnimatedList, KeyFrameBlock };
