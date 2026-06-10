import { headers } from "next/headers";

/**
 * Representasi satu produk yang berada di dalam keranjang
 *
 * Dapat digunakan kembali untuk:
 * - Cart
 * - Checkout
 * - Wishlist
 * - Riwayat Pesanan
 * - POS System
 */
export interface CartItem {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga asli sebelum diskon
  image: string[]; // Daftar gambar produk
  totalCart: number; // Jumlah produk yang dibeli
  size: string[]; // Daftar ukuran yang dipilih
  discount: number; // Persentase diskon (0 - 100)
}

/**
 * Mengambil seluruh data keranjang dari API
 *
 * Fungsi ini berjalan di Sever Component karena menggunakan
 * 'next/headers' untuk mendapatkan host saat ini
 *
 * Return:
 * - Array berisi seluruh produk dalam keranjang
 *
 * Throw Error:
 * - Jika request ke API gagal
 */
export default async function getAllCarts(): Promise<CartItem[]> {
  /**
   * Mengambil host saat ini
   *
   * Contoh:
   * localhost:3000, example.vercel.app, dll
   */
  const host = (await headers()).get("host");

  /**
   * Menentukan protocol berdasarkan environment.
   *
   * Development:
   * http://localhost:3000
   *
   * Production:
   * https://example.com
   */
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  /**
   * Mengambil data keranjang dari API internal
   *
   * cache: "no-store" berarti data akan selalu diambil ulang dari server
   * dan tidak menggunakan cache Next.js
   *
   * Cocok untuk data yang sering berubah seperti:
   * - Cart
   * - Notifikasi
   * - Wishlist
   * - Dashboard Real-Time
   */
  const res = await fetch(`${protocol}://${host}/api/carts`, {
    cache: "no-store",
  });

  /**
   * Jika request gagal (status bukan 2xx)
   * hentikan proses dan tampilkan error
   */
  if (!res.ok) {
    throw new Error("Failed to fetch carts");
  }

  /**
   * Mengubah response JSON menjadi array CartItem
   */
  return res.json();
}
