"use client";

import Link from "next/link"; // Import Link dari Next.js untuk navigasi antar halaman
import Image from "next/image"; // Import Image dari Next.js untuk menampilkan gambar dengan optimasi otomatis
import { useState, useEffect, useRef } from "react"; // Import hooks useState, useEffect, dan useRef dari React untuk mengelola state dan efek samping
import { Swiper, SwiperSlide } from "swiper/react"; // Import komponen Swiper dan SwiperSlide dari library Swiper untuk membuat carousel atau slider gambar
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules"; // Import modul efek coverflow, pagination, dan autoplay dari Swiper untuk menambahkan fitur pada carousel
import { FaArrowAltCircleRight } from "react-icons/fa"; // Import ikon panah dari react-icons untuk digunakan dalam tampilan link "View More"
import { Playfair_Display } from "next/font/google"; // Import font Playfair Display dari Google Fonts untuk digunakan dalam tampilan teks pada komponen CarouselAlbum

// Import gaya CSS untuk Swiper dan modul-modul yang digunakan dalam carousel
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Konfigurasi font Playfair Display untuk gaya teks yang berbeda (bold dan regular) yang akan digunakan dalam judul dan link pada komponen CarouselAlbum
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

// Komponen CarouselAlbum untuk menampilkan carousel gambar album dengan efek animasi saat muncul di viewport
export default function CarouselAlbum() {
  const [showContent, setShowContent] = useState(false); // State untuk mengontrol apakah konten carousel sudah muncul di viewport atau belum
  const sectionRef = useRef<HTMLElement | null>(null); // Ref untuk mengakses elemen section yang akan diamati oleh Intersection Observer

  // useEffect untuk membuat Intersection Observer yang akan memantau apakah elemen section sudah masuk ke dalam viewport
  useEffect(() => { // Membuat instance Intersection Observer
    const observer = new IntersectionObserver( // Callback yang akan dipanggil saat terjadi perubahan pada elemen yang diamati
      ([entry]) => { // Jika elemen sudah masuk ke dalam viewport (isIntersecting true), maka setShowContent akan diubah menjadi true untuk menampilkan konten carousel
        if (entry.isIntersecting) {
          setShowContent(true); // Set showContent menjadi true saat elemen masuk ke dalam viewport
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -90px 0px" } // Konfigurasi threshold dan rootMargin untuk menentukan kapan callback akan dipanggil (threshold 0.1 berarti 10% dari elemen harus terlihat, rootMargin untuk memberikan margin pada viewport)
    );

    if (sectionRef.current) { // Pastikan sectionRef sudah terisi dengan elemen section sebelum mulai mengamati
      observer.observe(sectionRef.current); // Amati elemen section yang direferensikan oleh sectionRef
    }

    return () => observer.disconnect(); // Bersihkan observer saat komponen unmount untuk mencegah memory leak
  }, []);

  return (
    <section 
      ref={sectionRef} // Pasang ref pada elemen section untuk diobservasi oleh Intersection Observer
      className="py-10 bg-yellow-400"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10 text-black">
          <h1
            className={`text-3xl md:text-4xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent // Jika showContent true, tampilkan dengan opacity 100% dan posisi normal, jika false, sembunyikan dengan opacity 0 dan geser ke bawah
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayBold.className}`}
          >
            Albums
          </h1>
          <Link
            href="/photobooks"
            className={`flex items-center gap-2 text-sm md:text=base transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent // Jika showContent true, tampilkan dengan opacity 50% dan efek hover/active untuk meningkatkan opacity, jika false, sembunyikan dengan opacity 0 dan geser ke bawah
                ? "opacity-50 hover:opacity-100 active:opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayRegular.className}`}
          >
            View More
            <FaArrowAltCircleRight size={20} />
          </Link>
        </div>

        <div
          className={`transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showContent // Jika showContent true, tampilkan dengan opacity 100% dan posisi normal, jika false, sembunyikan dengan opacity 0 dan geser ke bawah
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: showContent ? "300ms" : "0ms" }} // Tambahkan delay pada transisi untuk memberikan efek staggered saat konten carousel muncul setelah judul dan link muncul
        >
          <div className="w-full flex flex-col items-center py-3">
            <Swiper
              effect="coverflow"
              grabCursor
              modules={[EffectCoverflow, Pagination, Autoplay]} // Tambahkan modul efek coverflow, pagination, dan autoplay untuk memberikan fitur pada carousel
              autoplay={{ delay: 3000, disableOnInteraction: false }} // Konfigurasi autoplay untuk mengubah slide secara otomatis setiap 3 detik, dan tetap berjalan meskipun pengguna berinteraksi dengan carousel
              pagination={{ el: ".custom-pagination", clickable: true }} // Konfigurasi pagination untuk menampilkan indikator pagination yang dapat diklik, dengan elemen pagination yang ditargetkan menggunakan kelas "custom-pagination"
              loop
              className="w-[85%] max-w-4xl aspect-square md:aspect-video"
            >
              {[
                "/img/albums/O2H_1.jpg",
                "/img/albums/O2H_2.jpg",
                "/img/albums/O2H_4.jpg",
              ].map((src, i) => (
                <SwiperSlide key={i} className="relative rounded-xl overflow-hidden group">
                  <Image
                    src={src} // Sumber gambar untuk setiap slide dalam carousel, diambil dari array yang berisi path gambar album
                    alt={`Albums ${i + 1}`} // Alt text untuk gambar album, menggunakan index untuk memberikan deskripsi yang berbeda pada setiap gambar
                    fill
                    className="object-cover transition duration-300 group-hover:opacity-75 group-active:opacity-75"
                    priority
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-pagination mt-7"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
