"use client"

import {  useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

type ProductDescriptionModalProps = {
  openDescription: boolean;
  closeDescription: () => void;
  description: string;
}

export default function ProductDescriptionModal({
  openDescription, 
  closeDescription,
  description
}: ProductDescriptionModalProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (openDescription) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return() => {
      document.body.style.overflow = "auto";
    };
  }, [openDescription]);

  const handleCloseDescription = () => {
    closeDescription();

    if(descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  }

  return (
    <div
    onClick={handleCloseDescription}
    className={`fixed inset-0 z-9999 flex items-center justify-center transition-all duration-300 ${
      openDescription
        ? "bg-black/70 opacity-100 visible"
        : "bg-black/0 opacity-0 invisible"
    }`}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-base-200 border border-yellow-400 rounded-2xl mx-5 w-full max-w-4xl max-h-[85vh] overflow-hidden transform transition-all duration-300 ${
        openDescription
          ? "scale-100 opacity-100 translate-y-0"
          : "scale-95 opacity-0 translate-y-5"
      }`}
    >
      <div className="flex items-center justify-between p-5 border-b border-yellow-400">
        <h2
          className={`text-xl text-yellow-400 ${playfairDisplayBold.className}`}
        >
          Product Description
        </h2>
        <button
          onClick={() => closeDescription()}
          className="btn btn-sm btn-circle text-red-500 text-lg opacity-50 hover:opacity-100 active:opacity-100"
        >
          ✕
        </button>
      </div>
      <div
        ref={descriptionRef}
        className="overflow-y-auto max-h-[70vh] p-5"
      >
        <p
          className={`whitespace-pre-line leading-6 md:leading-7 text-sm md:text-base opacity-90 ${playfairDisplayRegular.className}`}
        >
          {description}
        </p>
      </div>
    </div>
  </div>
  )
}