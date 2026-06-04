"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

import O2HLogo from "@/public/img/logos/O2H_Logos_2.png";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export default function FloatingLogo() {
  const [rotation, setRotation] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setRotation(window.scrollY * 0.3);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted]);

  const handleHome = () => {
    document
      .getElementById("hero-page-utama")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <div className="fab">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle w-14 h-14 bg-transparent border-none shadow-none p-0 overflow-hidden"
      >
        <Image
          src={O2HLogo}
          alt="O2H Logo"
          className="w-full h-full object-cover"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      <div className={`fab-close ${playfairDisplayBold.className}`}>
        Close
        <span className="btn btn-circle w-14 h-14 btn-error bg-red-600 text-white text-lg">
          ✕
        </span>
      </div>

      <div className={playfairDisplayBold.className}>
        Home{" "}
        <Link
          href="/"
          onClick={handleHome}
          className="btn w-14 h-14 btn-circle bg-yellow-400 text-black text-lg"
        >
          <FaHome />
        </Link>
      </div>
    </div>
  );
}