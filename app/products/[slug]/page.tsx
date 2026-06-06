import type { Metadata } from "next";
import { notFound } from "next/navigation";

import getAllProducts, { getProductsBySlug } from "../data";
import DetailClient from "./detailClient";

/**
 * Tipe data yang diterima halaman
 *
 * Next.js App Router mengirim parameter route
 * melalui props params
 *
 * Contoh URL:
 * /news/example-products
 *
 * Maka:
 * slug = "example-products"
 */
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Membuat metadata (SEO) secara dinamis
 * berdasarkan produk yang sedang dibuka
 *
 * Fungsi ini dijalankan oleh Next.js
 * sebelum halaman dirender
 *
 * Contoh hasil:
 * <title>Judul Produk</title>
 * <meta name="description" />
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  /**
   * Mengambil slug dari URL
   */
  const { slug } = await params;

  /**
   * Mencari produk berdasarkan slug
   */
  const product = await getProductsBySlug(slug);

  /**
   * Jika produk tidak ditemukan,
   * gunakan metadata fallback
   */
  if (!product) {
    return {
      title: "Products Not Found",
    };
  }

  /**
   * Metadata SEO untuk berita yang ditemukan
   */
  return {
    title: `${product.title}`,
    description: `Price: ${product.price}, Sold: ${product.sold}`,
  };
}

/**
 * Halaman detail produk
 *
 * Bertugas:
 * - Mengambil data produk berdasarkan slug
 * - Menampilkan halaman 404 jika tidak ditemukan
 * - Mengirim data ke komponen client
 */
export default async function ProductsDetailPage({ params }: Props) {
  /**
   * Mengambil slug dari URL
   */
  const { slug } = await params;

  /**
   * Mengambil data produk dari slug
   */
  const product = await getProductsBySlug(slug);

  /**
   * Jika produk tidak ditemukan,
   * tampilkan halaman 404 bawaan Next.js
   */
  if (!product) {
    notFound();
  }

  /**
   * Mengambil seluruh produk
   * 
   * Biasanya digunakan untuk:
   * - Produk rekomendasi
   * - Related Produk
   * - Produk serupa
   */
  const products = await getAllProducts();

  /**
   * Mengirim data ke Client Component untuk ditampilkan di browser
   */
  return <DetailClient product={product} products={products} />;
}
