"use client";

import { usePathname } from "next/navigation";

/**
 * Props untuk FooterWrapper
 * 
 * children:
 * Komponen Footer yang akan ditampilkan
 * jika memenuhi kondisi yang ditentukan
 */
type NavbarWrapperProps = {
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
export default function NavbarWrapper({
  children,
}: NavbarWrapperProps) {
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
    "/profile",
    "/login",
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