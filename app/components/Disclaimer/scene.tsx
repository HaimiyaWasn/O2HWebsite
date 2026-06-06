"use client"

import { useEffect, useState } from "react";

/**
 * Props untuk komponen DisclaimerScene
 */
type DisclaimerSceneProps = {
  onClose: () => void; // Function yang dijalankan setelah animasi penutupan disclaimer selesai
};

/**
 * Modal Disclaimer
 * 
 * Digunakan untuk menampilkan informasi penting sebelum pengguna dapat mengakses halaman utama
 * 
 * Cocok digunakan untuk:
 * - Disclaimer project portfolio
 * - Terms & Condition
 * - Cookies Consent
 * - Privacy Policy
 * - Age Verification
 */
export default function DisclaimerScene({ onClose }: DisclaimerSceneProps) {
  /**
   * Mengontrol animasi masuk (fade-in)
   * 
   * false = Modal masih tersembunyi
   * true = Modal ditampilkan
   */
  const [visible, setVisible] = useState(false);

  /**
   * Mengontol animasi keluar (fade-out)
   * 
   * false = Modal masih aktif
   * true = Modal sedang ditutup
   */
  const [closing, setClosing] = useState(false);


  /**
   * Menjalankan animasi masuk saat komponen pertama kali dirender
   * 
   * Delay kecil diperlukan agar browser sempat merender state awal sebelum transisi dimulai
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10);

    /**
     * Membersihkan timer ketika komponen unmount untuk mencegah memory leak
     */
    return () => clearTimeout(timer);
  }, []);

  /**
   * Menutup modal disclaimer
   * 
   * Langkah: 
   * 1. Aktifkan animasi keluar
   * 2. Tunggu animasi selesai
   * 3. Jalankan callback onClose()
   */
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
            : "translate-y-8 scale-90 opacity-0"
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
