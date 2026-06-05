"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/**
 * Props untuk komponen RevealOnScroll
 * 
 * Komponen ini membungkus elemen lain dan akan
 * menampilkan animasi ketika elemen masuk ke area viewport
 */
type RevealOnScrollProps = {
  children: ReactNode; // Konten yang akan diberikan efek animasi
  className?: string; // Class tambahan dari luar komponen

  /**
   * Jarak awal animasi sumbu Y
   * 
   * 20 = Muncul dari bawah 20px
   * 50 = Muncul dari bawah 50px
   */
  y?: number;
  duration?: number; // Durasi animasi (ms)
  delay?: number; // Delay sebelum animasi dimulai (ms)

  /**
   * Persentase element yang harus telihat
   * sebelum animasi dijalankan
   * 
   * 0 = Langsung saat menyentuh viewport
   * 0.5 = 50% dari element terlihat
   * 1 = Seluruh element terlihat
   */
  threshold?: number;

  /**
   * Margin tambahan untuk aarea deteksi viewport
   * 
   * Contoh:
   * "100px"
   * "0px 0px -100px 0px"
   */
  rootMargin?: string;

  /**
   * Menentukan apakah animasi hanya berjalan sekali
   * 
   * true = Sekali saja
   * false = Setiap masuk/keluar viewport
   */
  once?: boolean;
};

/**
 * Komponen reusable untuk animasi saat scroll
 * 
 * Fitur:
 * - Fade In
 * - Slide Up
 * - Delay Animation
 * - Custom Duration
 * - Intersection Observer
 * - Reusable di seluruh projek
 * 
 * Cocok digunakan untuk:
 * - Section Landing Page
 * - Product Card
 * - News List
 * - Hero Content
 * - Gallery
 * - Testimonial
 */
export default function RevealOnScroll({
  children,
  className = "",
  y = 20,
  duration = 700,
  delay = 0,
  threshold = 0,
  rootMargin = "0px",
  once = true,
}: RevealOnScrollProps) {
  /**
   * Menyimpan status apakah elemen sudah terlihat di viewport
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Referensi ke element DOM yang akan diamati
   * oleh Intersevtion Oserver
   */
  const sectionRef = useRef<HTMLDivElement | null>(null);

  /**
   * Membuat observer ketika komponen dirender
   * 
   * Observer akan memantau apakah elemen masuk ke dalam viewport pengguna
   */
  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        /**
         * Ketika element masuk viewport
         */
        if (entry.isIntersecting) {
          setIsVisible(true);

          /**
           * Jika hanya ingin animasi sekali, 
           * hentikan observer setelah terlihat
           */
          if (once) {
            observer.unobserve(element);
          }
        } else {
          /**
           * Jika ada repeat aktif, animasi akan kembali ke kondisi awal
           * ketika elemen keluar viewport
           */
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    /**
     * Membersihkan observer saat komponen dilepas
     */
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div
      ref={sectionRef}
      className={`transform-gpu transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
