"use client";

import Link from "next/link"; // Import Link dari Next.js untuk navigasi antar halaman
import Image from "next/image"; // Import Image dari Next.js untuk menampilkan gambar dengan optimasi otomatis
import { FaTiktok, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6"; // Import ikon media sosial dari react-icons untuk digunakan dalam tampilan link media sosial di footer
import O2HLogo from "../../public/img/logos/O2H_Logos_1.png"; // Import gambar logo O2H untuk digunakan dalam tampilan footer

// Tipe data untuk props Footer, yang mencakup varian tema yang dapat dipilih (dark, yellow, light) untuk menentukan tampilan footer yang sesuai dengan tema yang diinginkan.
type FooterProps = {
  variant?: "dark" | "yellow" | "light";
};

export default function Footer({ variant = "yellow" }: FooterProps) {
  // Definisikan varian untuk tema footer, dengan kelas Tailwind CSS yang sesuai untuk latar belakang, teks, pembatas, subteks, dan hak cipta. Setiap varian memiliki kombinasi warna yang berbeda untuk menciptakan tampilan yang konsisten dengan tema yang dipilih.
  const variants = {
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

  const current = variants[variant]; // Pilih varian yang sesuai berdasarkan props yang diterima, default ke "yellow" jika tidak ada props yang diberikan

  return (
    <footer className={`${current.bg} ${current.text} px-6 md:px-10 py-12`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1  md:grid-cols-[0.8fr_1.6fr] gap-8 items-start">
        <div className="flex flex-col gap-6">
          <Link href="/">          
            <div className="w-28 md:w-36">
              <Image src={O2HLogo} alt="O2H Logo" className="w-full h-auto object-contain" priority />
            </div>
          </Link>

          <div className="flex gap-4 text-lg">
            <Link href="#" target="_blank">
              <FaTiktok className="hover:text-gray-400 cursor-pointer" />
            </Link>
            <Link href="#" target="_blank">
              <FaXTwitter className="hover:text-gray-400 cursor-pointer" />
            </Link>
            <Link href="https://www.youtube.com/@o2halimawan" target="_blank">
              <FaYoutube className="hover:text-gray-400 cursor-pointer" />
            </Link>
            <Link href="https://www.instagram.com/orangoranganhalimawan" target="_blank">
              <FaInstagram className="hover:text-gray-400 cursor-pointer" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-sm">
          <div className="flex flex-wrap gap-x-5 gap-y-2 leading-relaxed">
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>About this site</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>About accounts</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>About payments</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>Acceptable use policy</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>Privacy Policy</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>Request to customers</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>About the operating company</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>System requiremens</p></Link>
            <Link href="#" className="opacity-50 hover:opacity-100 cursor-pointer"><p>FAQ</p></Link>
          </div>

          <hr className={`${current.divider} my-2`} />

          <p className={`${current.subText} leading-relaxed`}>
            Unauthorized reproduction of all published content (articles,
            images, audio data, video data, etc.) is prohibited.
          </p>
          <p className={current.copyright}>
            © 2026 O2H ALL RIGHTS RESERVED. powered by WASENIME.inc
          </p>
        </div>
      </div>
    </footer>
  )
}