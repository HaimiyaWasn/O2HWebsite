"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Playfair_Display } from "next/font/google";

import RevealOnScroll from "./RevealOnScroll";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

/**
 * Font untuk judul section
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Menampilkan foto dalam bentuk slider interaktif menggunakan Swiper.js
 * 
 * Fitur:
 * - Autoplay otomatis
 * - Infinite loop
 * - Pagination Indicator
 * - Efek coverflow
 * - Responsive mobile & desktop
 * - Animasi muncul saat discroll
 * 
 * Cocok digunakan untuk:
 * - Album Foto
 * - Gallery Produk
 * - Portfolio Showcase
 * - Event Gallery
 * - Banner Slider
 */
export default function CarouselAlbum() {
  /**
   * Daftar gambar yang ditampilkan pada carousel
   * 
   * Jika jumlah gambar bertambah, 
   * cukup tambahkan path baru ke array ini
   */
  const albumImages = [
    "/img/albums/O2H_1.jpg",
    "/img/albums/O2H_2.jpg",
    "/img/albums/O2H_4.jpg",
  ]

  return (
    <section className="py-10 bg-yellow-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10 text-black">
          <RevealOnScroll delay={0.05}>
            <div
              className={`inline-flex items-center rounded-full shadow-sm shadow-black border-4 border-black/40 bg-black/10 px-4 py-2 backdrop-blur-md ${playfairDisplayBold.className}`}
            >
              <span
                className={`text-md md:text-2xl tracking-[0.2em] uppercase ${playfairDisplayBold.className}`}
              >
                Albums
              </span>
            </div>
          </RevealOnScroll>

          {/* <RevealOnScroll delay={500}>
            <Link
              href="/photobooks"
              className={`flex items-center gap-2 text-sm md:text-base opacity-50 hover:opacity-100 ${playfairDisplayRegular.className}`}
            >
              View More
              <FaArrowAltCircleRight size={20} />
            </Link>
          </RevealOnScroll> */}
        </div>

        <RevealOnScroll delay={0.15}>
          <div className="w-full flex flex-col items-center py-3">
            <Swiper
              effect="coverflow"
              grabCursor
              modules={[EffectCoverflow, Pagination, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".custom-pagination",
                clickable: true,
              }}
              loop
              className="w-[85%] max-w-4xl aspect-square md:aspect-video"
            >
              {albumImages.map((src, i) => (
                <SwiperSlide
                  key={i}
                  className="relative rounded-xl overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt={`Albums ${i + 1}`}
                    fill
                    priority
                    className="object-cover transition duration-300 group-hover:opacity-75 group-active:opacity-75"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-pagination mt-7"></div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
