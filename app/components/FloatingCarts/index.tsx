import getAllCarts from "./data";
import FloatingCartClient from "./client";

/**
 * Komponen Server yang bertugas:
 * 1. Mengambil data keranjang dari server/API
 * 2. Mengirim data tersebut ke FloatingClient
 * 
 * Alasan memisah file:
 * - Server Component:
 *   1. Mengambil data dari API atau database
 *   2. TIdak mengirim JavaScript tambahan ke browser
 *   3. Lebih baik untuk performa
 * 
 * - FloatingCartClient (Client Component):
 *   1. Menampilkan UI interaktif
 *   2. Menangani event pengguna
 *   3. Menggunakan hook React jika diperlukan
 * 
 * Pola ini umum digunakan pada:
 * - Cart
 * - Wishlist
 * - Notification
 * - Dashboard Widget
 * - User Profile
 */
export default async function FloatingCart() {
  /**
   * Mengambil seluruh data produk yang ada di dalam keranjang
   */
  const carts = await getAllCarts();

  /**
   * Mengirim data keanjang ke komponen client untuk ditampilkan
   * kepada pengguna
   */
  return <FloatingCartClient carts={carts} />;
}