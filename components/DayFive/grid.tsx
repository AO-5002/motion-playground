"use client";
import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { Grip, Smile, Annoyed, Laugh } from "lucide-react";

interface Children {
  children: React.ReactNode;
}

function Block() {
  return (
    <motion.div className="relative w-44 h-44 bg-zinc-100 rounded-lg flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className=" p-2 absolute top-2 left-2 hover:cursor-grab"
      >
        <Grip />
      </motion.div>
      <Smile size={36} color="black" />
    </motion.div>
  );
}

function Grid() {
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

  function DropField({ children }: Children) {
    return (
      <div className="w-full h-full items-center justify-center grid grid-cols-2 grid-rows-2">
        {children}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#fff] shadow-xl rounded-xl">
      <div className="relative w-full h-full grid grid-cols-2 gap-4 p-8">
        <ColOne>
          <DropField>
            <Block />
          </DropField>
        </ColOne>

        <ColTwo>
          <DropField>
            <Block />
          </DropField>
        </ColTwo>
      </div>
    </div>
  );
}

export default Grid;
