import { headers } from "next/headers";

/**
 * Struktur data satu berita
 * 
 * Dapat digunakan kembali untuk:
 * - Halaman daftar berita
 * - Detail berita
 * - Featured berita
 * - Latest News
 * -Search Nees
 */
export type News = {
  id: number; // ID unik berita
  date: string; // Tanggal publikasi
  title: string; // Judul berita
  slug: string; // URL unik berita
  content: string; // Isi lengkap berita
};

/**
 * Mengambil seluruh data berita dari API
 * 
 * Data akan:
 * - Diambil langsung dari server
 * - Tidak menggunakan cache (selalu fresh)
 * - Diurutkan dari berita terbaru ke terlama
 */
export default async function getAllNews() {
  const host = (await headers()).get("host"); // Mendapatkan domain/host website saat ini

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

  // Request data berita dari API internal
  const res = await fetch(`${protocol}://${host}/api/news`, {
    cache: "no-store", // Selalu mengambil data terbaru
  });

  // Menampilkan error jika request gagal
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  // Mengubah response menjadi array berita
  const allNews: News[] = await res.json();

  // Urutkan dari berita terbaru ke terlama
  return allNews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Mengambil data berita berdasarkan halaman (pagination)
 */
export async function getNews(page: number = 1) {
  const allNews = await getAllNews(); // Ambil seluruh berita

  const NEWS_PER_PAGE = 10; // Jumlah berita yang ditampilkan pada setiap halaman

  const startIndex = (page - 1) * NEWS_PER_PAGE; // Menentukan index awal data
  const endIndex = startIndex + NEWS_PER_PAGE; // Menentukan index akhir data

  const paginatedNews = allNews.slice(startIndex, endIndex); // Mengambil berita sesuai halaman

  const totalPages = Math.ceil(allNews.length / NEWS_PER_PAGE); // Menghitung total halaman

  return {
    news: paginatedNews, // Data berita halaman saat ini
    totalPages, // Total jumlah halaman
    currentPage: page, // Halaman aktif
  };
}

/**
 * Mengambil satu berita berdasarkan slug
 * 
 * Contoh:
 * slug = "example-news-nextjs"
 * 
 * Cocok digunakan untuk:
 * - Halaman detail berita
 * - BLog detail
 * - Artikel detail
 */
export async function getNewsBySlug(slug: string) {
  const allNews = await getAllNews(); // Ambil seluruh berita

  return allNews.find((news) => news.slug === slug); // Cari berita yang slug-nya sesuai
}
