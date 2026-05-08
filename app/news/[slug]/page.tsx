import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation"; // Halaman 404
import { getNewsBySlug } from "../data"; // Ambil berita
import { Playfair_Display } from "next/font/google"; // Google Font

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingLogo from "@/app/components/FloatingLogo";

import { FaArrowAltCircleRight } from "react-icons/fa";

// Tipe props
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

// Halaman detail berita
export default async function NewsDetailPage({ params }: Props) {
  // Ambil slug
  const { slug } = await params;

  // Cari berita
  const news = await getNewsBySlug(slug);

  // Jika berita tidak ada
  if (!news) {
    notFound();
  }

  return (
    <>
      <Navbar />

      {/* Konten berita */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <p
          className={`text-sm opacity-60 mb-4 ${playfairDisplayRegular.className}`}
        >
          {news.date}
        </p>

        <h1 className={`text-4xl mb-10 ${playfairDisplayBold.className}`}>
          {news.title}
        </h1>

        <article
          className={`leading-relaxed text-lg ${playfairDisplayRegular.className}`}
        >
          {news.content}
        </article>
      </section>

      {/* Tombol kembali */}
      <div className="max-w-4xl mx-auto px-6 pb-24 flex justify-end">
        <Link
          href="/news"
          className={`flex items-center gap-2 text-sm md:text-base leading-none opacity-50 hover:opacity-100 transition ${playfairDisplayRegular.className}`}
        >
          Back to news
          <FaArrowAltCircleRight size={20} className="translate-y-px" />
        </Link>
      </div>

      <Footer variant="yellow" />
      <FloatingLogo />
    </>
  );
}

// Metadata SEO dinamis
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Ambil slug
  const { slug } = await params;

  // Cari berita
  const news = await getNewsBySlug(slug);

  // Jika tidak ditemukan
  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  return {
    title: `${news.title} | O2H Web Center`,
    description: news.content.slice(0, 150),
  };
}
