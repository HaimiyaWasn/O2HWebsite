"use client";

import Image from "next/image";
import { useState, useRef } from "react";

type ProductImageSliderProps = {
  imageProduct: string[];
  titleProduct: string;
};

export default function ProductImageSlider({
  imageProduct,
  titleProduct,
}: ProductImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const startX = useRef(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < imageProduct.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      nextImage();
    }

    if (diff < -50) {
      prevImage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const endX = e.clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      nextImage();
    }

    if (diff < -50) {
      prevImage();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="relative w-full aspect-square rounded-xl overflow-hidden border-4 border-yellow-400 select-none cursor-grab active:cursor-grabbing touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{
              width: `${imageProduct.length * 100}%`,
              transform: `translateX(-${
                currentImageIndex * (100 / imageProduct.length)
              }%)`,
            }}
          >
            {imageProduct.map((img, index) => (
              <div
                key={index}
                className="relative shrink-0 aspect-square"
                style={{
                  width: `${100 / imageProduct.length}%`,
                }}
              >
                <Image
                  src={img}
                  alt={`${titleProduct}-${index}`}
                  fill
                  draggable={false}
                  className="object-contain pointer-events-none select-none"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {imageProduct.length > 1 && (
          <div className="hidden md:flex gap-3 mt-5 flex-wrap justify-center">
            {imageProduct.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-4 transition-all duration-300 cursor-pointer ${
                  currentImageIndex === index
                    ? "border-yellow-400 scale-105"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {imageProduct.length > 1 && (
        <div className="flex md:hidden items-center justify-center gap-2 mt-7">
          {imageProduct.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentImageIndex === index
                  ? "w-6 h-2 bg-yellow-400"
                  : "w-2 h-2 bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
