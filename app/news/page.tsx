import NewsClient from "./client"; // Komponen berita
import { getNews } from "./data"; // Ambil data berita

// Halaman utama berita
export default async function NewsPage() {
  // Ambil berita halaman pertama
  const { news, totalPages, currentPage } = await getNews(1);

  return (
    <NewsClient
      allNews={news} // Data berita untuk halaman pertama
      totalPages={totalPages} // Total halaman
      currentPage={currentPage} // Halaman saat ini (1)
    />
  );
}
