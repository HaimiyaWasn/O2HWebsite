import ProductsClient from "./client";
import getAllProducts from "./data";

/**
 * Halaman utama produk
 *
 * Server Component yang bertugas:
 * 1. Mengambil seluruh data produk dari sumber data/API
 * 2. Mengirim data produk ke Client Component
 *
 * Karena menggunakan async function,
 * data diambil terlebih dahulu di server sebelum halaman dikirim ke browser.
 */
export default async function ProductsPage() {
  /**
   * Mengambil seluruh data produk.
   *
   * Fungsi ini berada di file data.ts dan biasanya:
   * - Mengambil data dari API
   * - Mengambil data dari database
   * - Mengurutkan produk sesuai kebutuhan
   */
  const allProducts = await getAllProducts();

  /**
   * Mengirim seluruh data produk ke Client Component.
   *
   * ProductsClient bertanggung jawab untuk:
   * - Menampilkan daftar produk
   * - Filter produk
   * - Sorting produk
   * - Pagination produk
   * - Interaksi UI lainnya
   */
  return <ProductsClient allProducts={allProducts} />;
}
