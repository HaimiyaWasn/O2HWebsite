import NewsClient from "./client";
import { getNews } from "./data";

/**
 * Metadata halaman
 *
 * Digunakan oleh Next.js App Router untuk
 * menghasilkan tag <title> secara otomatis.
 *
 * Hasil:
 * <title>News | O2H Official Site</title>
 */
export const metadata = {
  title: 'News | O2H Official Site'
}

/**
 * Halaman utama daftar berita
 * 
 * Fungsi:
 * - Mengambil data berita halaman pertama
 * - Mengirim data tersebut ke komponen client
 * 
 * Cocok digunakan untuk:
 * - Blog
 * - News Portal
 * - Artikel
 * - Pengumuman
 */
export default async function NewsPage() {
  /**
   * Mengambil data berita halaman pertama
   * 
   * Data yang diterima:
   * - news        : Daftar berita
   * - totalPages  : Jumlah seluruh halaman
   * - currentPage : Halaman aktif saat ini
   */
  const { news, totalPages, currentPage } = await getNews(1);

  /**
   * Mengirim data ke komponen client untuk 
   * ditampilkan di browser
   */
  return (
    <NewsClient
      allNews={news}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
