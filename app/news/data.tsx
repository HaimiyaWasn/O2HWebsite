import { headers } from "next/headers"; // Ambil header request

// Tipe data berita
export type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
};

// Ambil berita + pagination
export async function getNews(page: number = 1) {
  // Ambil host
  const host = (await headers()).get("host");

  // Fetch data berita
  const res = await fetch(`http://${host}/api/news`, {
    cache: "no-store",
  });

  // Error jika fetch gagal
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  // Ambil data JSON
  const allNews: News[] = await res.json();

  // Urutkan berita terbaru
  const sortedNews = allNews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Jumlah berita per halaman
  const NEWS_PER_PAGE = 10;

  // Tentukan index pagination
  const startIndex = (page - 1) * NEWS_PER_PAGE;
  const endIndex = startIndex + NEWS_PER_PAGE;

  // Data berita halaman sekarang
  const paginatedNews = sortedNews.slice(startIndex, endIndex);

  // Hitung total halaman
  const totalPages = Math.ceil(sortedNews.length / NEWS_PER_PAGE);

  return {
    news: paginatedNews, // Berita untuk halaman ini
    totalPages, // Total halaman
    currentPage: page, // Halaman saat ini
  };
}
