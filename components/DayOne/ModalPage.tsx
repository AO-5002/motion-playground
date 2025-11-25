"use client";
import React from "react";
import { Info } from "lucide-react";
import { motion } from "motion/react";
import Modal from "./Modal";
import { ModalBtn } from "./dynamic";
import { AnimatePresence } from "motion/react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
      {children}
    </div>
  );
}

interface ToggleModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProductProps {
  name: string;
  price: number;
  img: string;
}

function ProductCard({
  name,
  price,
  img,
  setIsModalOpen,
}: ProductProps & ToggleModalProps) {
  return (
    <div className="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden gap-4">
      <img src={img} alt={name} className="w-full h-48 object-cover" />
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-4">
        <h2 className=" text-xl font-bold">{name}</h2>
        <p className="text-lg">${price.toFixed(2)}</p>
        <div className="w-full h-full flex justify-center items-center gap-4">
          <button className="border border-zinc-400 text-zinc-900 font-bold py-2 px-4 rounded-lg">
            Add to Cart
          </button>
          <ModalBtn setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  );
}

function Product({ name, price, img }: ProductProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <ProductCard
        name={name}
        price={price}
        img={img}
        setIsModalOpen={setIsModalOpen}
      />
      <AnimatePresence>
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      </AnimatePresence>
    </>
  );
}

const data: ProductProps = {
  name: "Sample Product",
  price: 29.99,
  img: "/images/skincare.jpg",
};

function ModalPage() {
  return (
    <Layout>
      <Product {...data} />
    </Layout>
  );
}

export { ModalPage };
