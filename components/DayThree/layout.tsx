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
      className="w-full h-full shadow-lg bg-[#fff] rounded-lg flex flex-col gap-4 items-center justify-between text-zinc-900"
    >
      <img src={"./images/skincare.jpg"} className="object-cover w-full h-48" />
      <span className="w-full h-full p-4 flex flex-row items-center justify-between">
        <p>Price:</p>
        {price}
      </span>
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
    <div className="">
      <motion.div
        layoutId={`item-${val}`}
        className="absolute inset-0 bg-black/80 text-white flex flex-col gap-8 justify-center items-center overflow-auto"
      >
        <img
          src={"./images/skincare.jpg"}
          className="object-cover w-full h-full"
        />
        <button onClick={handleClick} className="p-4 bg-white rounded-lg">
          <X color="black" />
        </button>
      </motion.div>
    </div>
  );
}

function ListItems({ dataContent }: Data) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <motion.div className="relative w-[500px] h-128 bg-white shadow-2xl flex flex-col gap-8 p-8 overflow-auto">
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
