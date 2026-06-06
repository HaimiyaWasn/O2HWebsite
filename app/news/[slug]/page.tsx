import type { Metadata } from "next"; 
import { notFound } from "next/navigation";

import { getNewsBySlug } from "../data";
import DetailClient from "./detailClient";

/**
 * Tipe data yang diterima halaman
 * 
 * Next.js App Router mengirim parameter route
 * melalui props params
 * 
 * Contoh URL:
 * /news/example-news
 * 
 * Maka:
 * slug = "example-news"
 */
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Membuat metadata (SEO) secara dinamis
 * berdasarkan berita yang sedang dibuka
 * 
 * FUngsi ini dijalankan oleh Next.js
 * sebelum halaman dirender
 * 
 * Contoh hasil:
 * <title>Judul Berita</title>
 * <meta name="description" />
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  /**
   * Mengambil slug dari URL
   */
  const { slug } = await params;

  /**
   * Mencari berita berdasarkan slug
   */
  const news = await getNewsBySlug(slug);

  /**
   * Jika berita tidak ditemukan,
   * gunakan metadata fallback
   */
  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  /**
   * Metadata SEO untuk berita yang ditemukan
   */
  return {
    title: `${news.title}`,
    description: news.content.slice(0, 150),
  };
}

/**
 * Halaman detail berita
 * 
 * Bertugas:
 * - Mengambil data berita berdasarkan slug
 * - Menampilkan halaman 404 jika tidak ditemukan
 * - Mengirim data ke komponen client
 */
export default async function NewsDetailPage({
  params,
}: Props) {
  /**
   * Mengambil slug dari URL
   */
  const { slug } = await params;

  /**
   * Mengambil data berita dari slug
   */
  const news = await getNewsBySlug(slug);

  /**
   * Jika berita tidak ditemukan,
   * tampilkan halaman 404 bawaan Next.js 
   */
  if (!news) {
    notFound();
  }

  /**
   * Render halaman detail berita
   */
  return <DetailClient news={news} />;
}