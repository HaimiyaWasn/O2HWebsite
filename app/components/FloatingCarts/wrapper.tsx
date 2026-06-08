"use client";

import { usePathname } from "next/navigation";

/**
 * Props untuk wrapper Component
 *
 * childrem:
 * Komponen akan ditampilkan jika memenuhi kondisi yang ditentukan
 */
type FloatingCartWrapperProps = {
  children: React.ReactNode;
};

/**
 * Bertugas mengontrol kapan Floating Cart boleh ditampilkan atau disembunyikan
 *
 * Saat ini Floating Cart disembunyikan ketika pengguna berada di halaman Cart
 * agar tidak terjadi duplikasi informasi
 *
 * Cocok digunakan untuk:
 * - Floating Cart
 * - Floating Wishlist
 * - FLoating Chat Button
 * - Floating Action Button (FAB)
 * - Button Navigation
 */
export default function FloatingCartWrapper({
  children,
}: FloatingCartWrapperProps) {
  /**
   * Mengambil pathname (URL aktif) saat ini
   *
   * Contoh:
   * /carts
   */
  const pathname = usePathname();

  /**
   * Daftar halaman yang tidak boleh menampilkan Floating Cart
   */
  const hiddenPaths = [
    "/carts",
    "/profile",
    "/login",
    "/register",
  ];

  /**
   * Jika pathname saat ini ada di dalam hiddenPaths,
   * komponen tidak akan dirender
   */
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  /**
   * Menampilkan komponen yang dibungkus oleh FLoatingCartWrapper
   */
  return <>{children}</>;
}
