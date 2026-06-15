"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FaTimes } from "react-icons/fa";

type Product = {
  id: number;
  title: string;
  price: number;
  isFavorite: boolean;
  label: string[];
  image: string[];
  deskripsi: string;
  sold: string;
  isOutOfStock: boolean;
  size: string[];
  discount: number;
  createdAt: string;
  slug: string;
};

type ProductTambahKeranjangModalProps = {
  openModal: boolean;
  closeModal: () => void;
  product: Product;
};

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export default function ProductTambahKeranjangModal({
  openModal,
  closeModal,
  product,
}: ProductTambahKeranjangModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  const handleCloseModal = () => {
    closeModal();
    setSelectedSize("");
    setQuantity(1);
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        openModal
          ? "bg-black/60 backdrop-blur-sm opacity-100 visible"
          : "bg-black/0 opacity-0 invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-base-100 border border-yellow-400 rounded-2xl mx-5 w-full max-w-2xl max-h-[85vh] overflow-hidden transform transition-all duration-300 p-5 ${
          openModal
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-5"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-yellow-400 mb-6">
          <h2
            className={`text-lg md:text-2xl text-yellow-400 ${playfairDisplayBold.className}`}
          >
            Tambah Keranjang
          </h2>
          <button
            onClick={() => closeModal()}
            className="btn btn-circle hover:bg-red-500 active:bg-red-500 text-red-500 hover:text-black active:text-black opacity-50 hover:opacity-100 active:opacity-100 transition-all duration-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="bg-base-300 rounded-2xl p-4 flex items-center gap-4 mb-6 mx-5">
          <div className="relative w-20 h-20">
            <Image
              src={product.image[0]}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-base md:text-lg">
              {product.title}
            </h3>
          </div>
        </div>

        <div className="mb-6 mx-5">
          <span className="block font-bold mb-3">SIZE</span>

          <div className="flex flex-wrap gap-3">
            {product.size.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)} className={`btn min-w-20 ${
                selectedSize === size
                  ? "border-yellow-400 bg-yellow-400/20"
                  : "bg-yellow-400 text-black"
              }`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-base-300 pt-5 mb-6">
          <div className="flex justify-center">
            <div className="join">
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="btn join-item">
                -
              </button>
              
              <button className="btn join-item pointer-events-none">
                {quantity}
              </button>

              <button onClick={() => setQuantity((prev) => prev + 1)} className="btn join-item">
                +
              </button>
            </div>
          </div>
        </div>

        <button className={`btn w-full rounded-xl ${playfairDisplayBold.className} bg-yellow-400 text-black font-semibold border-none hover:bg-yellow-300`}>
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
