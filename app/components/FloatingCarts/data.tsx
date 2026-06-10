import { headers } from "next/headers";

/**
 * Representasi data produk yang berada di keranjang
 *
 * Interface ini sengaja dibuat sederhana karena
 * hanya digunakan untuk kebutuhan FLoating Cart
 *
 * Cocok digunakan kembali pada:
 * - Floating Cart
 * - Cart Summary
 * - Checkout Preview
 * - Mini Cart
 */
export interface CartItem {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga produk sebelum diskon
  image: string[]; // Daftar gambar produk
  totalCart: number; // Jumlah produk di keranjang
  discount: number; // Persentase diskon (0 - 100)
}

/**
 * Mengambil seluruh data keranjang dari API Internal Next.js
 *
 * Fungsi ini berjalan di server sehingga aman digunakan pada:
 * - Server Component
 * - Layout
 * - Page
 *
 * Return: Array  berisi seluruh item keranjang
 */
export default async function getAllCarts(): Promise<CartItem[]> {
  /**
   * Mengambil domain aktif saat request berlangsung
   *
   * Contoh:
   * localhost:3000, example.vercel.app, dll
   *
   * Berguna agar URL API tetap bekerja di Development maupun Production
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
   * Mengambil data keranjang dari API Internal
   *
   * cache: "no-store" berarti data selalu diambil ulang dari server
   * dan tidak menggunakan cache Next.js
   *
   * Cocok untuk data yang sering berubah seperti:
   * - Cart
   * - Wishlist
   * - Notification
   */
  const res = await fetch(`${protocol}://${host}/api/carts`, {
    cache: "no-store",
  });

  /**
   * Jika request gagal, hentikan proses dan tampilkan error
   */
  if (!res.ok) {
    throw new Error("Failed to fetch carts");
  }

  /**
   * Mengubah response JSON menjadi array CartItem
   */
  return res.json();
}
