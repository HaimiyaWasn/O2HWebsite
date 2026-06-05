import { headers } from "next/headers";

import AnimationClient from "./animationClient";

/**
 * Representasi satu produk
 * 
 * Cocok digunakan untuk:
 * - Homepage Product Card
 * - Product List
 * - Featured Product
 * - Product Search
 * - Wishlist
 */
type Product = {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga produk sebelum diskon
  image: string[]; // Daftar gambar produk
  sold: string; // Jumlah produk yang sudah terjual
  isOutOfStock: boolean; // Status stok produk
  discount: number; // Persentase diskon (0 - 100)
  createdAt: string; // Tanggal produk dibuat
  slug: string; // Slug URL produk
};

/**
 * Server Component yang bertugas:
 * 1. Mengambil data produk dari API
 * 2. Mengacak urutan produk
 * 2. Memprioritaskan produk yang masih tersedia
 * 4. Mengmbil sebagian produk untuk homepage
 * 5. Mengirim data ke Client Component
 * 
 * Keuntungan menggunakan Server Component:
 * - Data diproses di server
 * - Tidak menambah JavScript ke browser
 * - Lebih baik untuk performa
 */
export default async function HomeProductsSection() {
  /**
   * Mengambil host/domain aktif
   * 
   * Contoh:
   * localhost:3000, example.vercel.app
   */
  const host = (await headers()).get("host");

  /**
   * Mengambil seluruh data produk dari API interal Next.js
   */
  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store",
  });

  /**
   * Jika request gagal, hentikan proses dan tampilkan error
   */
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  /**
   * mengubah response JSON menjadi array Product
   */
  const productsData: Product[] = await res.json();

  /**
   * Membuat salinan array aga data asli tidak ikut berubah saat diacak
   */
  const shuffledProducts = [...productsData];

  /**
   * Fisher-Yates Shuffle
   * 
   * Mengecek urutan produk secara acak dengan distribusi yang merata
   * 
   * Contoh:
   * [A, B, C, D]
   * 
   * Menjadi:
   * [C, D, B, A]
   */
  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledProducts[i], shuffledProducts[j]] = [
      shuffledProducts[j],
      shuffledProducts[i],
    ];
  }

  /**
   * Mengurutkan produk berdasarkan stok
   * 
   * Tujuan:
   * - Produk tersedia muncul lebih dulu
   * - Produk stok habis berapa di bawah
   * 
   * Setelah itu hanya mengambil 18 produk untuk homepage
   */
  const selectedProducts = shuffledProducts
    .sort((a, b) => {
      if (a.isOutOfStock === b.isOutOfStock) return 0;

      return a.isOutOfStock ? 1 : -1;
    }).slice(0, 18);

    /**
     * Mengirim data produk ke Client Component untuk ditampilkan pada halaman
     */
  return <AnimationClient products={selectedProducts} />;
}