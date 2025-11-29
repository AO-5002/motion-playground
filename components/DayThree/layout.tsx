"use client";
import { div } from "motion/react-client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

interface DataProps {
  name: string;
  price: string;
  val?: number;
}

interface Data {
  dataContent: DataProps[];
}

function DetailedItem({
  name,
  price,
  val,
  setModal,
}: DataProps & { setModal: React.Dispatch<boolean> }) {
  const handleClick = () => {
    setModal(true);
  };

  return (
    <motion.div
      layoutId={`item-${val}`}
      onClick={handleClick}
      className="w-full border border-white p-4 rounded flex flex-row items-center justify-between text-white"
    >
      <span>{name}</span>
      {price}
    </motion.div>
  );
}

function Modal({
  setModal,
  val,
}: {
  setModal: React.Dispatch<boolean>;
  val?: number;
}) {
  const handleClick = () => {
    setModal(false);
  };

  return (
    <motion.div
      layoutId={`item-${val}`}
      className="absolute inset-0 bg-black/80 text-white flex flex-col gap-8 justify-center items-center"
    >
      <p className="text-4xl ">Im a modal</p>
      <button onClick={handleClick} className="p-4 bg-white rounded-lg">
        <X color="black" />
      </button>
    </motion.div>
  );
}

function ListItems({ dataContent }: Data) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <motion.div className="relative w-full h-96 bg-zinc-900 flex flex-col gap-8 p-8">
      {dataContent.map((el, i) => {
        return (
          <DetailedItem
            key={i}
            {...el}
            val={i} // ✅ Pass the index
            setModal={() => setSelectedItem(i)} // ✅ Track which item
          />
        );
      })}
      <AnimatePresence>
        {selectedItem !== null && (
          <Modal
            setModal={() => setSelectedItem(null)}
            val={selectedItem} // ✅ Pass the selected item's val
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ListItems;
