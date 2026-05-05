"use client";

import Image from "next/image"; // Import Image dari Next.js untuk menampilkan gambar dengan optimasi otomatis
import Link from "next/link"; // Import Link dari Next.js untuk navigasi antar halaman
import { useState } from "react"; // Import React Hooks dan Router untuk navigasi
import { FaShoppingCart } from "react-icons/fa"; // Import ikon keranjang belanja dari react-icons untuk digunakan dalam tampilan
import { IoIosNotifications } from "react-icons/io"; // Import ikon notifikasi dari react-icons untuk digunakan dalam tampilan
import { Playfair_Display, Yesteryear } from "next/font/google"; // Import font Playfair Display dari Google Fonts untuk digunakan dalam tampilan teks
import AvatarSementara from "../../public/img/backgrounds/O2H_ImagesHero_2.jpg"; // Import gambar avatar sementara untuk digunakan dalam dropdown profil
import O2HLogo from "../../public/img/logos/O2H_Logos_1.png"; // Import gambar logo O2H untuk digunakan dalam navbar

// Import font Playfair Display dengan varian regular dan bold untuk digunakan di navbar dan dropdown
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
})

// Komponen NavbarClient untuk menampilkan navbar dengan fitur pencarian, ikon, dan dropdown profil
export default function Navbar() {
  const [open, setOpen] = useState(false); // State untuk mengontrol apakah sidebar terbuka atau tidak

  return (
    <>
      {/* Navbar Utama */}
      <div className="navbar shadow-sm fixed top-0 z-30 bg-yellow-400 text-black">
        {/* Kiri (Menu + Logo) */}
        <div className="navbar-start gap-0.5">
          {/* Button Sidebar */}
          <button
            onClick={() => setOpen(true)} // Klik untuk membuka sidebar
            aria-label="Open menu"
            className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition"
          >
            {/* Icon Hamburger */}
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
            <Image alt="" src={O2HLogo} width={48} height={48} priority />
          </Link>
        </div>

        {/* Tengah (Search Bar Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <h1 className={`text-2xl ${yesteryear.className}`}>
            O2H Website
          </h1>
        </div>

        {/* Kanan (Icon & Profile) */}
        <div className="navbar-end gap-0.5">
          {/* Icon Cart */}
          <button className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition">
            <FaShoppingCart size={24} />
          </button>

          {/* Icon Notifikasi */}
          <button className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none transition">
            <IoIosNotifications size={28} />
          </button>

          {/* Dropdown Profile */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="p-2 rounded-full hover:bg-yellow-300 active:bg-yellow-500 focus:outline-none avatar transition"
            >
              {/* Avatar */}
              <div className="w-8 rounded-full">
                <Image alt="Avatar Player" src={AvatarSementara} />
              </div>
            </label>

            {/* Menu Dropdown */}
            <ul
              tabIndex={0}
              className={`dropdown-content menu p-2 shadow bg-yellow-50 text-black rounded-tl-lg rounded-bl-lg rounded-br-lg w-40 mt-3 ${playfairDisplayRegular.className}`}
            >
              <li>
                <Link
                  href="#"
                  className="hover:bg-yellow-400 hover:text-black transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:bg-yellow-400 hover:text-black transition"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:bg-yellow-400 hover:text-black transition"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay (Background gelap saat sidebar dibuka) */}
      {open && ( // Hanya tampilkan overlay jika sidebar terbuka (open === true)
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)} // Klik untuk tutup sidebar
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-yellow-50 text-black z-50 transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full" // Jika open true, sidebar berada di posisi normal (translate-x-0), jika false maka sidebar tersembunyi di sebelah kiri (translate-x-full)
        }`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-yellow-400">
          {/* Button Close */}
          <button
            onClick={() => setOpen(false)} // Klik untuk menutup sidebar
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-400 active:bg-yellow-500 focus:outline-none transition text-lg font-bold"
          >
            ✕
          </button>

          {/* Title */}
          <span className={`text-2xl ${playfairDisplayBold.className}`}>
            Menu
          </span>
        </div>

        {/* Search Mobile */}
        {/* <div className="p-4 lg:hidden">
          <div className="flex">
            <input
              type="text"
              placeholder="Telusuri..."
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input w-full rounded-l-full bg-yellow-100 border border-yellow-400/40 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-4 rounded-r-full bg-yellow-400 hover:bg-yellow-500"
            >
              <FaSearch size={18} />
            </button>
          </div>
        </div> */}

        {/* Menu Sidebar */}
        <ul
          className={`menu p-3 space-y-3 w-full text-base ${playfairDisplayRegular.className}`}
        >
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="hover:bg-yellow-400 hover:text-black transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/news"
              onClick={() => setOpen(false)}
              className="hover:bg-yellow-400 hover:text-black transition"
            >
              News
            </Link>
          </li>
          <li>
            <Link
              href="/stores"
              onClick={() => setOpen(false)}
              className="hover:bg-yellow-400 hover:text-black transition"
            >
              Store
            </Link>
          </li>
          <li>
            <Link
              href="/members"
              onClick={() => setOpen(false)}
              className="hover:bg-yellow-400 hover:text-black transition"
            >
              Members
            </Link>
          </li>
          <li>
            <Link
              href="/photobooks"
              onClick={() => setOpen(false)}
              className="hover:bg-yellow-400 hover:text-black transition"
            >
              Photobooks
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
