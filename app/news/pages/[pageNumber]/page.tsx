import NewsClient from "../../client";
import { getNews } from "../../data";
import { notFound } from "next/navigation";

/**
 * Props yang diberikan oleh halaman pagination
 * 
 * Contoh URL:
 * /news/page/1
 * 
 * Maka:
 * pageNumber = 1
 */
type Props = {
  params: Promise<{
    pageNumber: string;
  }>;
};

/**
 * Halaman pagination berita
 * 
 * Bertugas untuk:
 * - Mengambil nomor halaman dari URL
 * - Memvalidasi nomor halaman
 * - Mengambil daata berita sesuai halaman
 * - Menampilkan halaman 404 jika halaman tidak valid
 * - Mengirim data ke komponen client
 * 
 * Cocok digunakan untuk:
 * - Blog Pagination
 * - News Pagination
 * - Product Listing Pagination
 * - Gallery Pagination
 */
export default async function PaginationPage({ params }: Props) {
  /**
   * Mengambil nomor halaman dari URL
   * 
   * Contoh:
   * /news/page/3
   * 
   * Maka:
   * pageNumber = 3
   */
  const { pageNumber } = await params;

  /**
   * Mengubah string menjadi number
   * agar bisa digunakan untuk query data 
   */
  const currentPage = Number(pageNumber);

  /**
   * Validasi nomor halaman
   * 
   * Contoh yang tidak valid:
   * /news/page/abs
   * /news/page/-1
   * /news/page/0
   */
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  /**
   * Mengambil data berita berdasarkan halaman
   * 
   * Return:
   * - news       : daftar berita halaman saat ini
   * - totalPages : total jumlah halaman
   */
  const { news, totalPages } = await getNews(currentPage);

  /**
   * Jika user mengakses halaman yang melebihi jumlah
   * halaman yang terdedia, tampilkan halaman 404
   * 
   * Contoh:
   * totalPages = 5
   * user membuka /news/pages/10
   */
  if (currentPage > totalPages) {
    notFound();
  }

  /**
   * Mengirim data ke komponen client
   * untuk ditampilkan pengguna
   */
  return (
    <NewsClient
      allNews={news}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
