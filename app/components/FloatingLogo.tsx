"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import O2HLogo from "@/public/img/logos/O2H_Logos_2.png";

// Logo mengambang dengan efek rotasi saat scroll
export default function FloatingLogo() {
  // State rotasi logo
  const [rotation, setRotation] = useState(0);

  // Scroll halus ke section hero
  const handleHome = () => {
    document
      .getElementById("hero-page-utama")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Mengubah rotasi saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.3);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-7 w-16 h-16 rounded-full overflow-hidden z-50 shadow-[0_0_15px_5px_rgba(0,0,0,0.5)]"
      style={{
        transform: `rotate(${rotation}deg)`, // Rotasi berdasarkan scroll
        transition: "transform 0.1s linear", // Transisi halus saat rotasi berubah
      }}
    >
      {/* Link ke halaman utama */}
      <Link href="/" onClick={handleHome}>
        <Image src={O2HLogo} alt="O2H Logo" fill className="object-cover" />
      </Link>
    </div>
  );
}
