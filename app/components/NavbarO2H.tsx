"use client";

import Link from "next/link"; 
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Icon cart
import { IoIosNotifications } from "react-icons/io"; // Icon notifikasi
import { Playfair_Display, Yesteryear } from "next/font/google"; // Google Fonts

import ProfileIconDefault from "@/public/img/profileIconDefault.jpg";
import O2HLogo from "@/public/img/logos/O2H_Logos_1.png";

// Konfigurasi font
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const yesteryear = Yesteryear({
  weight: "400",
  subsets: ["latin"],
});

// Navbar utama
export default function Navbar() {
  // State sidebar
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="navbar shadow-sm fixed top-0 z-30 bg-yellow-400 text-black">
        {/* Kiri */}
        <div className="navbar-start gap-0.5">
          {/* Tombol sidebar */}
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

          {/* Logo */}
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

        {/* Tengah */}
        <div className="navbar-center hidden lg:flex">
          <h1 className={`text-2xl ${yesteryear.className}`}>O2H Official Site</h1>
        </div>

        {/* Kanan */}
        <div className="navbar-end gap-0.5">
          {/* Cart */}
          <button className="p-3 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition">
            <FaHeart size={20} />
          </button>

          {/* Notifikasi */}
          <button className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition">
            <IoIosNotifications size={28} />
          </button>

          {/* Dropdown profile */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none avatar transition"
            >
              <div className="w-8 rounded-full">
                <Image alt="Avatar Player" src={ProfileIconDefault} />
              </div>
            </label>

            <ul
              tabIndex={0}
              className={`dropdown-content menu p-2 shadow bg-yellow-50 text-black rounded-tl-lg rounded-bl-lg rounded-br-lg w-40 mt-3 ${playfairDisplayRegular.className}`}
            >
              {["Profile", "Settings", "Logout"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:bg-yellow-400 hover:text-black transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-yellow-50 text-black z-50 transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header sidebar */}
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

        {/* Menu */}
        <ul
          className={`menu p-3 space-y-3 w-full text-base ${playfairDisplayRegular.className}`}
        >
          {[
            ["Home", "/"],
            ["News", "/news"],
            ["Products", "/products"],
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
