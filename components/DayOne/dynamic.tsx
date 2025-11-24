"use client";
import { motion } from "motion/react";
import { Info } from "lucide-react";

interface ToggleModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function toggleModal({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setIsModalOpen((prev) => !prev);
}

export function ModalBtn({ setIsModalOpen }: ToggleModalProps) {
  return (
    <motion.button
      className="border border-zinc-400 text-inherit font-bold p-2 rounded-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsModalOpen((prev) => !prev)}
    >
      <Info />
    </motion.button>
  );
}
