"use client";

import { useEffect, useState } from "react";

export default function DisclaimerScene({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg transition-opacity duration-500 ease-out ${
        visible && !closing ? "bg-black/70 opacity-100" : "bg-black/0 opacity-0"
      }`}
    >
      <div
        className={`w-[90%] max-w-xl rounded-xl bg-white p-6 shadow-2xl transition-all duration-500 ease-out transform-gpu ${
          visible && !closing
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 sclae-90 opacity-0"
        }`}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-black">
          Disclaimer by Developer
        </h2>

        <p className="text-center text-sm leading-relaxed text-gray-600">
          Website ini dibuat sebagai demonstrasi{" "}
          <span className="font-semibold">Frontend Development</span>
        </p>

        <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">
          Beberapa data, produk, harga, stok, tombol, dan fitur yang ada di
          website ini bersifat statis sebagai bagian dari tampilan antarmuka.
        </p>

        <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">
          Oleh karena itu, perubahan data, pemesanan produk, maupun interaksi
          yang memerlukan sistem backend belum dapat dilakukan.
        </p>

        <button
          onClick={handleClose}
          className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white font-medium transition hover:opacity-90 cursor-pointer"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}
