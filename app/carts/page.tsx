import CartClient from "./client";
import getAllCarts from "./data";

/**
 * Halaman utama Cart (Keranjang Belanja)
 * 
 * Alur Kerja:
 * 1. Mengambil seluruh data keranjang dari server/API
 * 2. Mengirim data tersebut ke komponent CartClient
 * 3. CartClient bertanggung jawab menangani:
 *    - Tampilan UI
 *    - Perubahan quantity
 *    - Permilihan produk
 *    - Perhitungan total harga
 *    - Penghapusan produk
 * 
 * Alasan memisah file:
 * - Server Component
 *   1. Mengambil data dari server
 *   2. Aman untuk akses database/API
 *   3. Tidak mengirim JavaScript yang tidak perlu ke browser
 * 
 * - CartClient (Client Component)
 *   1. Menangani interaksi pengguna
 *   2. Menggunakan useState
 *   3. Mengelola event click, input, checkbox, dll
 */
export default async function CartPage() {
  /**
   * Mengambil seluruh data produk yang ada
   * di dalam keranjang pengguna
   */
  const carts = await getAllCarts();

  /**
   * Mengirim data keranjang ke komponen client
   * agar dapat dikelola secara interaktif di browser
   */
  return <CartClient carts={carts} />;
}