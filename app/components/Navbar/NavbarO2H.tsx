"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Playfair_Display, Yesteryear } from "next/font/google";

import ProfileIconDefault from "@/public/img/profileIconDefault.jpg";
import O2HLogo from "@/public/img/logos/O2H_Logos_1.png";

/**
 * Font untuk menu, dropdown, dan teks semua
 */
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Font untuk judul menu sidebar
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Font dekoratif untuk branding website
 */
const yesteryear = Yesteryear({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Menampilkan:
 * - Tombol buka sidebar
 * - Logo website
 * - Nama website
 * - Tombol favorit
 * - Tombol notifikasi
 * - Dropdown profile
 * - Siedbar navigasi
 *
 * Cocok digunakan untuk:
 * - E-commerce
 * - Portfolio
 * - Blog
 * - Company Profile
 * - Dashboard sederhana
 */
export default function Navbar() {
  /**
   * Mengontrol status sidebar
   *
   * true = Sidebar terbuka
   * false = Sidebar tertutup
   */
  const [open, setOpen] = useState(false);

  /**
   * Mengontrol status dropdown profile
   *
   * true = Dropdown terbuka
   * false = Dropdown tertutup
   */
  const [profileOpen, setProfileOpen] = useState(false);

  /**
   * Referensi area dropdown profile
   *
   * Digunakan untuk mendeteksi klik di luar dropdown
   */
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Menutup dropdown profile ketika user mengklik
   * area diluar dropdown
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar shadow-sm fixed top-0 z-50 bg-yellow-400 text-black">
        <div className="navbar-start gap-0.5">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link href="/">
            <Image
              alt="O2H Logo"
              src={O2HLogo}
              width={48}
              height={48}
              priority
            />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <h1 className={`text-2xl ${yesteryear.className}`}>
            O2H Official Site
          </h1>
        </div>

        <div className="navbar-end gap-0.5">
          <Link href="/favorites">          
            <button className="p-3 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition">
              <FaHeart size={20} />
            </button>
          </Link>

          <button className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition">
            <IoIosNotifications size={28} />
          </button>

          <div ref={profileDropdownRef} className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-label="Open Profile Menu"
              className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition"
            >
              <div className="w-8 overflow-hidden rounded-full">
                <Image src={ProfileIconDefault} alt="Avatar Player" />
              </div>
            </button>

            <div
              className={`absolute -right-2 mt-3 w-40 md:w-60 overflow-hidden rounded-lg rounded-tr-none bg-yellow-50 text-black shadow-lg transition-all duration-500 ${
                profileOpen
                  ? "visible opacity-100 translate-y-0"
                  : "invisible opacity-0 -translate-y-2"
              }`}
            >
              <Link
                href="/profile"
                onClick={() => setProfileOpen(false)}
                className={`block px-4 py-2 hover:bg-yellow-400 transition ${playfairDisplayRegular.className}`}
              >
                Profile
              </Link>
              <Link
                href="/login"
                onClick={() => setProfileOpen(false)}
                className={`block px-4 py-2 hover:bg-yellow-400 transition ${playfairDisplayRegular.className}`}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-yellow-50 text-black z-50 transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-yellow-400">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-400 active:bg-yellow-500 focus:outline-none transition text-lg font-bold"
          >
            ✕
          </button>

          <span className={`text-2xl ${playfairDisplayBold.className}`}>
            Menu
          </span>
        </div>

        <ul
          className={`menu p-3 space-y-3 w-full text-base ${playfairDisplayRegular.className}`}
        >
          {[
            ["Home", "/"],
            ["News", "/news"],
            ["Products", "/products"],
            ["Carts", "/carts"],
            // ["Members", "/members"],
            // ["Photobooks", "/photobooks"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="hover:bg-yellow-400 hover:text-black transition"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
