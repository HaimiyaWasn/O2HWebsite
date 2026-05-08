import Link from "next/link";
import { notFound } from "next/navigation"; // Fungsi untuk menampilkan halaman 404
import { getNewsBySlug } from "../data"; // Fungsi untuk mengambil berita berdasarkan slug
import { Playfair_Display } from "next/font/google"; // Font Playfair Display
import Navbar from "@/app/components/Navbar"; // Komponen navbar
import Footer from "@/app/components/Footer"; // Komponen footer dengan varian warna kuning
import FloatingLogo from "@/app/components/FloatingLogo"; // Komponen logo mengambang
import { FaArrowAltCircleRight } from "react-icons/fa"; // Icon panah kanan

// Tipe props untuk halaman detail berita
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
  // Ambil slug dari params
  const { slug } = await params;

  // Ambil berita berdasarkan slug
  const news = await getNewsBySlug(slug);

  //  Jika berita tidak ditemukan, tampilkan halaman 404
  if (!news) {
    notFound();
  }

  return (
    <>
      <Navbar />
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
