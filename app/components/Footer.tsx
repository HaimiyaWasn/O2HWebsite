"use client";

import Link from "next/link";
import Image from "next/image";
import { FaTiktok, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";

import O2HLogo from "@/public/img/logos/O2H_Logos_1.png";

type FooterProps = {
  variant?: "dark" | "yellow" | "light";
};

export default function Footer({ variant = "yellow" }: FooterProps) {
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

  const current = variants[variant];

  return (
    <footer className={`${current.bg} ${current.text} px-6 md:px-10 py-12 md:pb-40`}>
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
            <Link href="#" target="_blank">
              <FaTiktok className="hover:text-gray-400 cursor-pointer" />
            </Link>

            <Link href="#" target="_blank">
              <FaXTwitter className="hover:text-gray-400 cursor-pointer" />
            </Link>

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
            {[
              "About this site",
              "About accounts",
              "About payments",
              "Acceptable use policy",
              "Privacy Policy",
              "Request to customers",
              "About the operating company",
              "System requiremens",
              "FAQ",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                className="opacity-50 hover:opacity-100 cursor-pointer"
              >
                <p>{item}</p>
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
