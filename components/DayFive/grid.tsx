"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Grip, Smile, Annoyed, Laugh } from "lucide-react";
import { useRef, useEffect } from "react";
import invariant from "tiny-invariant";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { div } from "motion/react-client";

interface Children {
  children: React.ReactNode;
}

function EmojiLayout({ children }: Children) {
  return <div className="text-4xl font-bold text-white">{children}</div>;
}

function DerpFace() {
  return <EmojiLayout>˙𐃷˙</EmojiLayout>;
}

function AngryFace() {
  return <EmojiLayout>¬`‸´¬</EmojiLayout>;
}

function Block({ id }: { id: string }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [isHappy, setIsHappy] = useState<boolean>(true); // Add this

  // Cycle faces every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHappy((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ blockId: id, type: "block" }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [id]);

  return (
    <motion.div
      ref={ref}
      style={{
        backgroundImage:
          "radial-gradient(circle,rgba(250, 80, 111, 1) 0%, rgba(240, 124, 74, 1) 100%)",
      }}
      initial={{ scale: 1 }}
      animate={{ scale: dragging ? 0.9 : 1, opacity: dragging ? 0.4 : 1 }}
      className="relative w-full h-full bg-zinc-200 rounded-lg flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="p-2 absolute top-2 left-2 hover:cursor-grab"
      >
        {dragging ? "" : <Grip />}
      </motion.div>

      {!dragging && (
        <AnimatePresence mode="wait">
          {isHappy ? (
            <motion.div
              key="happy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <DerpFace />
            </motion.div>
          ) : (
            <motion.div
              key="angry"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <AngryFace />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

function Grid() {
  const [leftGrid, setLeftGrid] = useState<string[]>(["block-1"]);
  const [rightGrid, setRightGrid] = useState<string[]>(["block-2"]);

  const handleLeftDrop = (blockId: string) => {
    setRightGrid((prev) => prev.filter((id) => id != blockId));
    setLeftGrid((prev) =>
      prev.includes(blockId) ? [...prev] : [...prev, blockId]
    );
  };

  const handleRightDrop = (blockId: string) => {
    setLeftGrid((prev) => prev.filter((id) => id != blockId));
    setRightGrid((prev) =>
      prev.includes(blockId) ? [...prev] : [...prev, blockId]
    );
  };

  function ColOne({ children }: Children) {
    return (
      <div className="w-full h-full flex justify-center items-center col-start-1 ">
        {children}
      </div>
    );
  }

  function ColTwo({ children }: Children) {
    return (
      <div className=" w-full h-full flex justify-center items-center col-start-2">
        {children}
      </div>
    );
  }

  function DropField({
    children,
    onBlockDrop,
  }: Children & { onBlockDrop: (blockId: string) => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    useEffect(() => {
      const el = ref.current;

      if (!el) {
        throw new Error("Ref not set properly");
      }

      return dropTargetForElements({
        element: el,
        onDragEnter: () => {
          setIsDraggedOver(true);
        },
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: ({ source }) => {
          setIsDraggedOver(false);
          // Handle the drop
          if (source.data.blockId && typeof source.data.blockId === "string") {
            onBlockDrop(source.data.blockId);
          }
        },
        canDrop: ({ source }) => {
          return source.data.type === "block"; // Fixed: compare strings, not JSX
        },
      });
    }, [onBlockDrop]);

    return (
      <motion.div
        ref={ref}
        animate={{
          backgroundColor: isDraggedOver ? "#FFDEDE" : "",
          opacity: isDraggedOver ? 0.4 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="w-full h-full p-4 rounded-xl"
      >
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full bg-[#fff]/40 shadow-xl rounded-2xl">
      <div className="relative w-full h-full grid grid-cols-2 gap-4 p-4">
        <ColOne>
          <DropField onBlockDrop={handleLeftDrop}>
            <AnimatePresence>
              {leftGrid.map((id) => (
                <Block key={id} id={id} />
              ))}
            </AnimatePresence>
          </DropField>
        </ColOne>

        <ColTwo>
          <DropField onBlockDrop={handleRightDrop}>
            <AnimatePresence>
              {rightGrid.map((id) => (
                <Block key={id} id={id} />
              ))}
            </AnimatePresence>
          </DropField>
        </ColTwo>
      </div>
    </div>
  );
}

export default Grid;
