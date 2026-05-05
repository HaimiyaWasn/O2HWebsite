"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function CarouselAlbum() {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContent(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -90px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 bg-yellow-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10 text-black">
          <h1
            className={`text-3xl md:text-4xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayBold.className}`}
          >
            Albums
          </h1>
          <Link
            href="/photobooks"
            className={`flex items-center gap-2 text-sm md:text=base transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent
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
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: showContent ? "300ms" : "0ms" }}
        >
          <div className="w-full flex flex-col items-center py-3">
            <Swiper
              effect="coverflow"
              grabCursor
              modules={[EffectCoverflow, Pagination, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ el: ".custom-pagination", clickable: true }}
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
                    src={src}
                    alt={`Albums ${i + 1}`}
                    fill
                    className="object-cover transition duration-300 group-hover:opacity-75"
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
