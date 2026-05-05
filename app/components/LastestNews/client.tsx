"use client";

import Link from "next/link"; // Import Link dari Next.js untuk navigasi antar halaman
import { useEffect, useRef, useState } from "react"; // Import hook useEffect, useRef, dan useState dari React untuk mengelola state dan efek samping
import { FaArrowAltCircleRight } from "react-icons/fa"; // Import ikon panah dari react-icons untuk digunakan dalam tampilan
import { Playfair_Display } from "next/font/google"; // Import font Playfair Display dari Google Fonts untuk digunakan dalam tampilan teks

// Tipe data untuk berita, yang mencakup id, tanggal, judul, dan slug (URL) berita
type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
};

// Konfigurasi font Playfair Display untuk gaya teks yang berbeda (bold dan regular)
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

// Komponen LatestNewsClient untuk menampilkan daftar berita terbaru dengan efek animasi saat muncul di viewport
export default function LatestNewsClient({
  latestNews // Prop yang berisi array berita terbaru yang akan ditampilkan
}: {
  latestNews: News[]; // Tipe data untuk prop latestNews yang merupakan array dari tipe News
}) {
  const [showContent, setShowContent] = useState(false); // State untuk mengontrol apakah konten berita sudah muncul di viewport atau belum
  const sectionRef = useRef<HTMLElement | null>(null); // Ref untuk mengakses elemen section yang akan diamati oleh Intersection Observer

  //vuseEffect untuk membuat Intersection Observer yang akan memantau apakah elemen section sudah masuk ke dalam viewport
  useEffect(() => {
    const observer = new IntersectionObserver( // Membuat instance Intersection Observer
      ([entry]) => { // Callback yang akan dipanggil saat terjadi perubahan pada elemen yang diamati
        // Jika elemen sudah masuk ke dalam viewport (isIntersecting true), maka setShowContent akan diubah menjadi true untuk menampilkan konten berita
        if (entry.isIntersecting) {
          setShowContent(true); // Set showContent menjadi true saat elemen masuk ke dalam viewport
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -90px 0px" } // Konfigurasi threshold dan rootMargin untuk menentukan kapan callback akan dipanggil (threshold 0.1 berarti 10% dari elemen harus terlihat, rootMargin untuk memberikan margin pada viewport)
    );

    // Mulai mengamati elemen section menggunakan ref
    if (sectionRef.current) {  // Pastikan sectionRef sudah terisi dengan elemen section sebelum mulai mengamati
      observer.observe(sectionRef.current); // Amati elemen section yang direferensikan oleh sectionRef
    }

    return () => observer.disconnect(); // Bersihkan observer saat komponen unmount untuk mencegah memory leak
  }, []);

  return (
    <section
      ref={sectionRef} // Pasang ref pada elemen section untuk diobservasi oleh Intersection Observer
      className="py-10 scroll-mt-12 md:scroll-mt-16"
      id="latest-news"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1
            className={`text-3xl md:text-4xl text-center md:text-left transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent // Jika showContent true, maka judul akan muncul dengan opacity 100% dan posisi normal (translate-y-0), jika false maka judul akan tersembunyi dengan opacity 0 dan sedikit bergeser ke bawah (translate-y-5)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayBold.className}`}
          >
            Latest News
          </h1>

          <Link
            href="/news"
            className={`flex items-center gap-2 text-sm md:text-base leading-none transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent // Jika showContent true, maka link "View More" akan muncul dengan opacity 50% dan berubah menjadi 100% saat hover atau active, serta posisi normal (translate-y-0). Jika false maka link akan tersembunyi dengan opacity 0 dan sedikit bergeser ke bawah (translate-y-5)
                ? "opacity-50 hover:opacity-100 active:opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayRegular.className}`}
          >
            View More
            <FaArrowAltCircleRight size={20} className="translate-y-px" />
          </Link>
        </div>

        <div className="divide-y divide-white/30">
          {latestNews.map((news, index) => ( // Iterasi melalui array latestNews untuk menampilkan setiap berita dalam bentuk Link yang dapat diklik untuk menuju ke halaman detail berita
            <Link
              key={news.id} // Gunakan id berita sebagai key untuk setiap elemen dalam iterasi
              href={news.slug} // Gunakan slug berita sebagai href untuk navigasi ke halaman detail berita
              className={`group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-6 md:py-8 hover:no-underline transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showContent // Jika showContent true, maka setiap berita akan muncul dengan opacity 100% dan posisi normal (translate-y-0), jika false maka berita akan tersembunyi dengan opacity 0 dan sedikit bergeser ke bawah (translate-y-5). Setiap berita juga memiliki delay transisi yang berbeda berdasarkan index untuk menciptakan efek staggered saat muncul
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${250 + index * 150}ms` }} // Memberikan delay transisi yang berbeda untuk setiap berita berdasarkan index (250ms + 150ms per index) untuk menciptakan efek staggered saat muncul
            >
              <span
                className={`text-sm md:text-base md:w-28 md:shrink-0 group-hover:opacity-50 group-active:opacity-50 ${playfairDisplayRegular.className}`}
              >
                {news.date}
              </span>

              <p
                className={`flex-1 text-base md:text-lg leading-relaxed group-hover:opacity-50 ${playfairDisplayRegular.className}`}
              >
                {news.title}
              </p>

              <div className="self-end md:self-auto mt-2 md:mt-0">
                <FaArrowAltCircleRight
                  size={24}
                  className="group-hover:opacity-50 transition"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
