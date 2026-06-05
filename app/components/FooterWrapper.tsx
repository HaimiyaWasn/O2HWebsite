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
   * Jangan tampilkan Footer ketika pengguna
   * berada di halaman keranjang
   */
  if (pathname === "/carts") {
    return null;
  }

  /**
   * Menampilkan komponen yang dibungkus 
   * oleh FooterWrapper
   */
  return <>{children}</>;
}