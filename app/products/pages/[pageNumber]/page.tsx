import ProductsClient from "../../client";
import getAllProducts from "../../data";

/**
 * Props yang dikirim oleh Next.js App Router
 *
 * Contoh URL:
 * /products/pages/1
 * /products/pages/2
 *
 * Maka:
 * pageNumber = "1"
 * pageNumber = "2"
 *
 * Saat ini pageNumber belum digunakan,
 * tetapi tipe ini bisa dipertahankan jika
 * nanti ingin menambahkan pagination server-side.
 */
type Props = {
  params: Promise<{
    pageNumber: string;
  }>;
};

/**
 * Halaman pagination produk.
 *
 * Tugas:
 * - Mengambil seluruh data produk
 * - Mengirim data ke ProductsClient
 *
 * Saat ini halaman belum menggunakan
 * pageNumber sehingga semua produk
 * tetap dikirim ke client component.
 */
export default async function PaginationPage({ params }: Props) {
  /**
   * Mengambil parameter URL.
   *
   * Saat ini belum digunakan.
   *
   * Contoh:
   * const { pageNumber } = await params;
   */
  await params;

  /**
   * Mengambil seluruh data produk
   * dari sumber data utama.
   */
  const allProducts = await getAllProducts();

  /**
   * Mengirim data produk
   * ke Client Component untuk dirender.
   */
  return <ProductsClient allProducts={allProducts} />;
}
