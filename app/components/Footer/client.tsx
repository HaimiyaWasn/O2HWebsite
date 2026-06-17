"use client";

import Link from "next/link";
import Image from "next/image";
import { FaTiktok, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";

import O2HLogo from "@/public/img/logoO2HNoBG.png";

/**
 * Variasi tema Footer
 *
 * dark = Tema gelap
 * yellow = Tema utama brand
 * white = Tema terang
 */
type FooterProps = {
  variant?: "dark" | "yellow" | "light";
};

/**
 * Kumpulan style untuk setiap tema Footer
 *
 * Dengan memisahkan konfigurasi tema,
 * komponen menjadi lebih mudah digunakan ulang
 * pada halaman dengan warna yang berbeda
 */
const FOOTER_VARIANTS = {
  dark: {
    bg: "bg-[#070b1a]",
    text: "text-white",
    divider: "border-gray-600",
    subText: "text-gray-300",
    copyright: "text-gray-400",
  },
  yellow: {
    bg: "bg-yellow-400",
    text: "text-black",
    divider: "border-black/30",
    subText: "text-black/70",
    copyright: "text-black/60",
  },
  light: {
    bg: "bg-gray-100",
    text: "text-black",
    divider: "border-gray-300",
    subText: "text-gray-600",
    copyright: "text-gray-500",
  },
};

/**
 * Daftar link informasi footer
 *
 * Cocok dipisahkan menjadi array agar mudah ditambahkan
 * atau dikurangi tanpa mengubah struktur JSX
 */
const footerLinks = [
  {
    label: "About this site",
    href: "/about/site-info",
  },
  {
    label: "About accounts",
    href: "/about/account",
  },
  {
    label: "About payments",
    href: "/about/payment",
  },
  {
    label: "Acceptable use policy",
    href: "/about/terms",
  },
  {
    label: "Privacy Policy",
    href: "/about/privacy"
  },
  {
    label: "Request to customers",
    href: "/about/customer-harassment",
  },
  {
    label: "About the operating company",
    href: "/about/law",
  },
  {
    label: "System requiremens",
    href: "/about/environment",
  },
  {
    label: "FAQ",
    href: "/about/help",
  },
];

/**
 * Menampilkan:
 * - Logo Website
 * - Social Media
 * - Navigation Links
 * - Copyright
 * - Informasi Legal
 *
 * Cocok digunakan untuk:
 * - E-commerce
 * - Portfolio
 * - Company Profile
 * - Landing Page
 * - Blog
 */
export default function Footer({ variant = "yellow" }: FooterProps) {
  /**
   *Mengambil konfigurasi tema aktif
   */
  const current = FOOTER_VARIANTS[variant];

  return (
    <footer
      className={`${current.bg} ${current.text} px-6 md:px-10 py-12 md:pb-40`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12 text-center md:text-left">
        <div className="flex flex-col gap-5 text-sm items-center justify-center md:max-w-md w-full">
          <Link href="/">
            <div className="w-28 md:w-36">
              <Image
                src={O2HLogo}
                alt="O2H Logo"
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </Link>

          <div className="flex gap-4 text-lg items-center justify-center md:justify-start">
            {/* <Link href="#" target="_blank">
              <FaTiktok className="hover:text-gray-400 cursor-pointer" />
            </Link>

            <Link href="#" target="_blank">
              <FaXTwitter className="hover:text-gray-400 cursor-pointer" />
            </Link> */}

            <Link href="https://www.youtube.com/@o2halimawan" target="_blank">
              <FaYoutube className="hover:text-gray-400 cursor-pointer" />
            </Link>

            <Link
              href="https://www.instagram.com/orangoranganhalimawan"
              target="_blank"
            >
              <FaInstagram className="hover:text-gray-400 cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-col gap-5 text-sm items-center md:items-start">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 leading-relaxed">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="opacity-50 hover:opacity-100 cursor-pointer"
              >
                <p>{item.label}</p>
              </Link>
            ))}
          </div>

          <hr className={`w-full border-t ${current.divider} my-4`} />

          <p className={`${current.subText} leading-relaxed`}>
            Unauthorized reproduction of all published content is prohibited.
          </p>

          <p className={current.copyright}>
            © 2026 O2H ALL RIGHTS RESERVED. powered by WASENIME.inc
          </p>
        </div>
      </div>
    </footer>
  );
}
