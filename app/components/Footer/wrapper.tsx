"use client";

import { usePathname } from "next/navigation";

/**
 * Props untuk FooterWrapper
 * 
 * children:
 * Komponen Footer yang akan ditampilkan
 * jika memenuhi kondisi yang ditentukan
 */
type FooterWrapperProps = {
  children: React.ReactNode;
}

/**
 * Bertugas mengontrol kapan Footer boleh ditampilkan
 * pada halaman tertentu agar tampilan lebih fokus
 * dan tidak menggangu pengalamn pengguna
 * 
 * Cocok digunakan untuk:
 * - Footer
 * - Header
 * - Floating Cart
 * - Floating Button 
 * - Bottom Navigation
 */
export default function FooterWrapper({
  children,
}: FooterWrapperProps) {
  /**
   * Mengambil pathname (URL aktif) saat ini
   * 
   * Contoh:
   * /carts
   */
  const pathname = usePathname();

  /**
   * Daftar halaman yang tidak boleh
   * menampilkan Footer
   */
  const hiddenPaths = [
    "/carts",
    "/profile",
    "/login",
    "/register",
    "/favorites",
  ]

  /**
   * Jika pathname saat ini ada di dalam hiddenPaths,
   * komponen tidak akan dirender
   */
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  /**
   * Menampilkan komponen yang dibungkus 
   * oleh FooterWrapper
   */
  return <>{children}</>;
}