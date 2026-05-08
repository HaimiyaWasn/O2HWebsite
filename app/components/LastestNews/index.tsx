import { headers } from "next/headers";

import LatestNewsClient from "./client";

// Tipe data berita
type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
};

// Mengambil dan menampilkan berita terbaru
export default async function LatestNews() {
  // Ambil host dari header
  const headersList = await headers();

  // Pastikan host tidak null
  const host = headersList.get("host");

  // Fetch data berita terbaru
  const res = await fetch(`http://${host}/api/news`, {
    cache: "no-store", // Selalu ambil data terbaru
  });

  // Error jika fetch gagal
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  // Ambil data JSON
  const newsData: News[] = await res.json();

  // Urutkan berdasarkan tanggal terbaru
  const sortedNews = newsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Ambil 6 berita terbaru
  const limitLatestNews = sortedNews.slice(0, 6);

  // Kirim data ke komponen client
  return <LatestNewsClient latestNews={limitLatestNews} />;
}
