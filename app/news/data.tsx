import { headers } from "next/headers"; // Data fetching untuk berita

// Tipe data berita
export type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
  content: string;
};

// Ambil semua berita
export default async function getAllNews() {
  // Ambil host
  const host = (await headers()).get("host");

  // Fetch API
  const res = await fetch(`http://${host}/api/news`, {
    cache: "no-store",
  });

  // Error handling
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  // Ambil data JSON
  const allNews: News[] = await res.json();

  // Urutkan berita terbaru
  return allNews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Ambil berita dengan pagination
export async function getNews(page: number = 1) {
  // Ambil semua berita
  const allNews = await getAllNews();

  // Jumlah berita per halaman
  const NEWS_PER_PAGE = 10;

  // Hitung indeks untuk pagination
  const startIndex = (page - 1) * NEWS_PER_PAGE;
  const endIndex = startIndex + NEWS_PER_PAGE;

  // Ambil berita untuk halaman ini
  const paginatedNews = allNews.slice(startIndex, endIndex);

  // Hitung total halaman
  const totalPages = Math.ceil(allNews.length / NEWS_PER_PAGE);

  return {
    news: paginatedNews,
    totalPages,
    currentPage: page,
  };
}

export async function getNewsBySlug(slug: string) {
  // Ambil semua berita
  const allNews = await getAllNews();

  // Cari berita dengan slug yang cocok
  return allNews.find((news) => news.slug === slug);
}
