"use client";

import Link from "next/link"; // Import Link dari Next.js untuk navigasi antar halaman
import { useEffect, useState, useRef } from "react"; // Import hooks useEffect, useState, dan useRef dari React untuk mengelola state dan efek samping
import { FaArrowAltCircleRight } from "react-icons/fa"; // Import ikon panah dari react-icons untuk digunakan dalam tampilan
import { Playfair_Display } from "next/font/google"; // Import font Playfair Display dari Google Fonts untuk digunakan dalam tampilan teks
import HomeProductCard from "./cardClient"; // Import komponen HomeProductCard untuk menampilkan informasi produk dalam bentuk kartu

// Tipe data untuk produk, yang mencakup id, judul, harga, gambar, dan jumlah terjual
type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
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

// Komponen AnimationClient untuk menampilkan daftar produk dengan efek animasi saat muncul di viewport
export default function AnimationClient({ products }: { products: Product[] }) {
  const [showContent, setShowContent] = useState(false); // State untuk mengontrol apakah konten produk sudah muncul di viewport atau belum
  const sectionRef = useRef<HTMLElement | null>(null); // Ref untuk mengakses elemen section yang akan diamati oleh Intersection Observer

  // useEffect untuk membuat Intersection Observer yang akan memantau apakah elemen section sudah masuk ke dalam viewport
  useEffect(() => {
    const observer = new IntersectionObserver( // Membuat instance Intersection Observer
      ([entry]) => {
        // Callback yang akan dipanggil saat terjadi perubahan pada elemen yang diamati
        if (entry.isIntersecting) {
          // Jika elemen sudah masuk ke dalam viewport (isIntersecting true), maka setShowContent akan diubah menjadi true untuk menampilkan konten produk
          setShowContent(true); // Set showContent menjadi true saat elemen masuk ke dalam viewport
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -90px 0px" } // Konfigurasi threshold dan rootMargin untuk menentukan kapan callback akan dipanggil (threshold 0.1 berarti 10% dari elemen harus terlihat, rootMargin untuk memberikan margin pada viewport)
    );

    if (sectionRef.current) {
      // Pastikan sectionRef sudah terisi dengan elemen section sebelum mulai mengamati
      observer.observe(sectionRef.current); // Amati elemen section yang direferensikan oleh sectionRef
    }

    return () => observer.disconnect(); // Bersihkan observer saat komponen unmount untuk mencegah memory leak
  }, []);

  return (
    <section
      ref={sectionRef} // Pasang ref pada elemen section untuk diobservasi oleh Intersection Observer
      className="py-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1
            className={`text-3xl md:text-4xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent // Jika showContent true, tampilkan dengan opacity 100% dan posisi normal, jika false, sembunyikan dengan opacity 0 dan geser ke bawah
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayBold.className}`}
          >
            Store
          </h1>
          <Link
            href="/stores"
            className={`flex items-center gap-2 text-sm md:text-base transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent // Jika showContent true, tampilkan dengan opacity 50% dan efek hover/active untuk meningkatkan opacity, jika false, sembunyikan dengan opacity 0 dan geser ke bawah
                ? "opacity-50 hover:opacity-100 active:opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayRegular.className}`}
          >
            View More
            <FaArrowAltCircleRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {products.map((product, index) => ( // Mengambil setiap produk dari array products dan menampilkan dalam bentuk kartu dengan efek animasi yang berbeda berdasarkan index untuk memberikan delay yang berbeda pada setiap kartu
            <div
              key={product.id} // Gunakan id produk sebagai key untuk setiap elemen dalam daftar produk
              className={`transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showContent // Jika showContent true, tampilkan dengan opacity 100% dan posisi normal, jika false, sembunyikan dengan opacity 0 dan geser ke bawah. Setiap kartu akan memiliki delay yang berbeda berdasarkan index untuk memberikan efek animasi yang berurutan
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: `${300 + index * 80}ms`, // Memberikan delay transisi yang berbeda untuk setiap kartu berdasarkan index, dimulai dari 300ms dan bertambah 80ms untuk setiap kartu berikutnya, sehingga menciptakan efek animasi yang berurutan saat muncul di viewport 
              }}
            >
              <HomeProductCard product={product} /> {/* Menggunakan komponen HomeProductCard untuk menampilkan informasi produk dalam bentuk kartu, dengan properti product yang berisi data produk yang akan ditampilkan */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
