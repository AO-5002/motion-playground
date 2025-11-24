import React from "react";
import { motion, AnimatePresence, type Variant } from "motion/react";
import { ModalBtn } from "./dynamic";

function Modal({
  setIsModalOpen,
}: {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      className="w-120 h-146 bg-zinc-900 text-white rounded-lg flex flex-col justify-center items-center gap-4 p-8 "
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div>
        <ModalBtn setIsModalOpen={setIsModalOpen!} />
      </div>
    </motion.div>
  );
}

export default Modal;
