"use client";

import Image from "next/image";
import { useState, useRef } from "react";

/**
 * Props untuk komponen slider gambar produk
 *
 * imageProduct:
 * Array berisi URL gambar produk
 *
 * titleProduct:
 * Nama produk untuk atribut alt gambar
 */
type ProductImageSliderProps = {
  imageProduct: string[];
  titleProduct: string;
};

/**
 * Komponen slider gambar produk
 *
 * Fitur:
 * - Swipe kiri/kanan di mobile
 * - Drag kiri/kanan menggunakan mouse
 * - Thumbnail gambar di desktop
 * - Indicator dot di mobile
 * - Transisi animasi saat berpindah gambar
 */
export default function ProductImageSlider({
  imageProduct,
  titleProduct,
}: ProductImageSliderProps) {
  /**
   * Menyimpan index gambar yang sedang aktif
   *
   * Contoh:
   * 0 = gambar pertama
   * 1 = gambar kedua
   * dst.
   */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Menyimpan posisi awal sentuhan atau klik
   *
   * Digunakan untuk menghitung arah swipe
   */
  const startX = useRef(0);

  /**
   * Pindah ke gambar berikutnya
   *
   * Akan berhenti di gambar terakhir
   */
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < imageProduct.length - 1 ? prev + 1 : prev
    );
  };

  /**
   * Pindah ke gambar sebelumnya
   *
   * Akan berhenti di gambar pertama
   */
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  /**
   * Menyimpan posisi awal sentuhan layar
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  /**
   * Mengecek arah swipe saat jari dilepas
   *
   * > 50px  = geser kiri → gambar berikutnya
   * < -50px = geser kanan → gambar sebelumnya
   */
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

  /**
   * Menyimpan posisi awal klik mouse
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  /**
   * Mengecek arah drag saat mouse dilepas
   *
   * Logikanya sama seperti swipe mobile
   */
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
