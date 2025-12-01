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
import { source } from "motion/react-client";

interface Children {
  children: React.ReactNode;
}

function Block({ id }: { id: string }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

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
      initial={{ scale: 1 }}
      animate={{ scale: dragging ? 0.8 : 1, opacity: dragging ? 0.8 : 1 }}
      className="relative w-44 h-44 bg-zinc-200 rounded-lg flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="p-2 absolute top-2 left-2 hover:cursor-grab"
      >
        {dragging ? "" : <Grip />}
      </motion.div>
      {dragging ? <Annoyed /> : <Smile size={36} color="black" />}
    </motion.div>
  );
}

function Grid() {
  const [leftGrid, setLeftGrid] = useState<string[]>(["block-1"]);
  const [rightGrid, setRightGrid] = useState<string[]>(["block-2"]);

  const handleLeftDrop = (blockId: string) => {
    setRightGrid((prev) => prev.filter((id) => id != blockId));
    setLeftGrid((prev) => [...prev, blockId]);
  };

  const handleRightDrop = (blockId: string) => {
    setLeftGrid((prev) => prev.filter((id) => id != blockId));
    setRightGrid((prev) => [...prev, blockId]);
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
        onDragEnter: () => setIsDraggedOver(true),
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
          backgroundColor: isDraggedOver ? "#d1d5db" : "#fafafa",
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="w-full h-full flex justify-center items-center p-4 rounded-xl"
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-4">{children}</div>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full bg-[#fff] shadow-xl rounded-2xl">
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
