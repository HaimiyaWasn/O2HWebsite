"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { FaTimes } from "react-icons/fa";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Props untuk modal deskripsi produk
 *
 * openDescription:
 * Status apakah modal sedang terbuka
 *
 * closeDescription:
 * Fungsi untuk menutup modal
 *
 * description:
 * Isi deskripsi produk yang akan ditampilkan
 */
type ProductDescriptionModalProps = {
  openDescription: boolean;
  closeDescription: () => void;
  description: string;
};

/**
 * Modal untuk menampilkan deskripsi produk secara penuh.
 *
 * Fitur:
 * - Overlay background
 * - Klik area luar untuk menutup modal
 * - Scroll otomatis terkunci saat modal terbuka
 * - Posisi scroll deskripsi di-reset saat modal ditutup
 * - Animasi fade & scale
 *
 * Cocok digunakan untuk:
 * - Detail produk
 * - Detail artikel
 * - Terms & Conditions
 * - Privacy Policy
 * - Informasi panjang lainnya
 */
export default function ProductDescriptionModal({
  openDescription,
  closeDescription,
  description,
}: ProductDescriptionModalProps) {
  /**
   * Referensi ke area konten deskripsi.
   *
   * Digunakan untuk mengembalikan posisi scroll
   * ke bagian atas saat modal ditutup.
   */
  const descriptionRef = useRef<HTMLDivElement>(null);

  /**
   * Mengunci scroll halaman saat modal terbuka.
   *
   * Tujuannya agar user tidak bisa scroll
   * halaman utama di belakang modal.
   */
  useEffect(() => {
    if (openDescription) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDescription]);

  /**
   * Menutup modal dan mengembalikan
   * posisi scroll deskripsi ke atas.
   */
  const handleCloseDescription = () => {
    closeDescription();

    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  };

  return (
    <div
      onClick={handleCloseDescription}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        openDescription
          ? "bg-black/70 opacity-100 visible"
          : "bg-black/0 opacity-0 invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-base-200 border border-yellow-400 rounded-2xl mx-5 w-full max-w-4xl max-h-[85vh] overflow-hidden transform transition-all duration-300 p-5 ${
          openDescription
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-5"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-yellow-400">
          <h2
            className={`text-lg md:text-2xl text-yellow-400 ${playfairDisplayBold.className}`}
          >
            Product Description
          </h2>
          <button
            onClick={() => closeDescription()}
            className="btn btn-circle hover:bg-red-500 active:bg-red-500 text-red-500 hover:text-black active:text-black text-lg opacity-50 hover:opacity-100 active:opacity-100 transition-all duration-300"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div ref={descriptionRef} className="overflow-y-auto max-h-[70vh] p-5">
          <p
            className={`whitespace-pre-line leading-6 md:leading-7 text-sm md:text-base opacity-90 ${playfairDisplayRegular.className}`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
