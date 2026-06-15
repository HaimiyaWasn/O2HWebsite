import { headers } from "next/headers";

/**
 * Struktur data produk.
 *
 * Sebaiknya tipe ini dipindahkan ke:
 * /types/product.ts
 *
 * agar dapat digunakan ulang
 * di seluruh project.
 */
export type Products = {
  id: number;
  title: string;
  price: number;
  isFavorite: boolean;
  label: string[];
  image: string[];
  deskripsi: string;
  sold: string;
  isOutOfStock: boolean;
  size: string[];
  discount: number;
  createdAt: string;
  slug: string;
};

/**
 * Mengambil seluruh data produk dari API.
 *
 * Fungsi ini digunakan sebagai sumber data utama
 * untuk:
 * - halaman daftar produk
 * - halaman detail produk
 * - pagination
 * - pencarian produk
 * - rekomendasi produk
 */
export default async function getAllProducts() {
  /**
   * Mengambil host aktif dari request.
   *
   * Contoh:
   * localhost:3000
   * example.com
   */
  const host = (await headers()).get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  /**
   * Mengambil data produk dari API internal.
   *
   * cache: "no-store"
   * memastikan data selalu terbaru
   * dan tidak menggunakan cache Next.js.
   */
  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: "no-store",
  });

  /**
   * Jika request gagal,
   * lempar error agar dapat ditangani
   * oleh Error Boundary Next.js.
   */
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  /**
   * Konversi response API menjadi array produk.
   */
  const allProducts: Products[] = await res.json();

  /**
   * Produk yang masih tersedia.
   *
   * Diurutkan berdasarkan tanggal terbaru.
   */
  const availableProducts = allProducts
    .filter((product) => !product.isOutOfStock)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  /**
   * Produk yang stoknya habis.
   *
   * Diurutkan berdasarkan tanggal terbaru.
   */
  const outOfStockProducts = allProducts
    .filter((product) => product.isOutOfStock)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  /**
   * Menggabungkan hasil:
   *
   * 1. Produk tersedia
   * 2. Produk habis
   *
   * Tujuannya agar produk yang masih bisa dibeli
   * selalu tampil lebih dulu.
   */
  return [...availableProducts, ...outOfStockProducts];
}

/**
 * Mengambil produk berdasarkan halaman (pagination).
 *
 * Contoh:
 * getProducts(1)
 * -> halaman pertama
 *
 * getProducts(2)
 * -> halaman kedua
 */
export async function getProducts(page: number = 1) {
  /**
   * Mengambil seluruh produk.
   */
  const allProducts = await getAllProducts();

  /**
   * Jumlah produk per halaman.
   */
  const PRODUCTS_PER_PAGE = 50;

  /**
   * Menentukan indeks awal data.
   *
   * Halaman 1 = index 0
   * Halaman 2 = index 50
   * Halaman 3 = index 100
   */
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

  /**
   * Menentukan indeks akhir data.
   */
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  /**
   * Mengambil data sesuai halaman aktif.
   */
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  /**
   * Menghitung total halaman.
   */
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  return {
    products: paginatedProducts,
    totalPages,
    currentPage: page,
  };
}

/**
 * Mengambil satu produk berdasarkan slug.
 *
 * Contoh:
 * slug = "oversized-tshirt-black"
 *
 * URL:
 * /products/oversized-tshirt-black
 */
export async function getProductsBySlug(slug: string) {
  /**
   * Mengambil seluruh produk.
   */
  const allProducts = await getAllProducts();

  /**
   * Mencari produk yang memiliki slug sesuai.
   *
   * Jika tidak ditemukan,
   * fungsi akan mengembalikan undefined.
   */
  return allProducts.find((products) => products.slug === slug);
}
