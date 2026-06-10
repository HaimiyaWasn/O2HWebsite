import { headers } from "next/headers";

import LatestNewsClient from "./client";

/**
 * Representasi satu data berita
 * 
 * Digunakan untuk:
 * - Latest News
 * - News List
 * - Related Articles
 * - News Detail
 */
type NewsItem = {
  id: number; // ID unik berita
  date: string; // Tanggal publikasi berita
  title: string; // Judul berita
  slug: string; // Slug URL detail berita
};

/**
 * Server Component yang betugas: 
 * 1. Mengambil seluruh data berita dari API
 * 2. Mengurutkan berita berdasarkan tanggal terbaru
 * 3. Mengambil beberapa berita terbaru
 * 4. Mengirim data ke Client Component
 * 
 * Keuntungan menggunakan Server Component:
 * - Data diambil di server
 * - Tidak menambah JavaScript di browser
 * - Lebih baik untuk performa SEO
 */
export default async function LatestNews() {
  /**
   * Mengambil host/domain aktif
   * 
   * Contoh:
   * localhost:3000, example.vercel.app, dll
   * 
   * Berguna agar API tetap berjalan pada environment development maupun production
   */
  const host = (await headers()).get("host")

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  /**
   * Mengambil seluruh data berita dari API internal Next.js
   * 
   * cache: "no-store" berarti data selalu diambil ulang
   * dan tidak menggunakan cache
   */
  const res = await fetch(`${protocol}://${host}/api/news`, {
    cache: "no-store",
  });

  /**
   * Jika request gagal, hentikan proses dan tampilkan error
   */
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  /**
   * Mengubah response JSON menjadi array NewsItem
   */
  const newsData: NewsItem[] = await res.json();

  /**
   * Mengurutkan berita berdasarkan tanggal terbaru
   */
  const sortedNews = [...newsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  /**
   * Mengambil 6 berita terbaru untuk ditampilkan pada homepage
   */
  const limitLatestNews = sortedNews.slice(0, 6);

  /**
   * Mengirim data berita terbaru ke Client Component untuk dirender
   */
  return <LatestNewsClient latestNews={limitLatestNews} />;
}
