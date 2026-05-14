import type { Metadata } from "next"; // Tipe untuk metadata SEO
import { notFound } from "next/navigation"; // Fungsi untuk menampilkan halaman 404
import { getNewsBySlug } from "../data"; // Fungsi untuk mengambil berita berdasarkan slug

import DetailClient from "./detailClient";

// Tipe props
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Metadata SEO
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  // Ambil slug dari URL
  const { slug } = await params;

  // Ambil data berita berdasarkan slug
  const news = await getNewsBySlug(slug);

  // Jika berita tidak ditemukan, tampilkan metadata untuk halaman 404
  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  // Kembalikan metadata berdasarkan data berita
  return {
    title: `${news.title}`,
    description: news.content.slice(0, 150),
  };
}

// Halaman detail
export default async function NewsDetailPage({
  params,
}: Props) {
  // Ambil slug dari URL
  const { slug } = await params;

  // Ambil data berita berdasarkan slug
  const news = await getNewsBySlug(slug);

  // Jika berita tidak ditemukan, tampilkan halaman 404
  if (!news) {
    notFound();
  }

  // Kirim data ke client component
  return <DetailClient news={news} />;
}