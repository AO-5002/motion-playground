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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsModalOpen?.(false)}
    >
      <motion.div
        className="w-96 bg-zinc-900 text-white rounded-lg flex flex-col justify-center items-center gap-4 p-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        <div>
          <ModalBtn setIsModalOpen={setIsModalOpen!} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
