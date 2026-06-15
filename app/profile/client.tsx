"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

/**
 * Struktur data user yang disimpan
 * pada localStorage setelah login berhasil.
 *
 * Data ini digunakan untuk menampilkan
 * informasi profile pengguna.
 */
type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

/**
 * Halaman Profile User
 *
 * Fitur:
 * - Membaca data user dari localStorage
 * - Redirect ke halaman login jika belum login
 * - Menampilkan informasi profile
 * - Logout
 * - Animasi menggunakan Motion
 *
 * Cocok digunakan untuk:
 * - Dashboard sederhana
 * - Halaman akun pengguna
 * - Sistem login berbasis localStorage
 */
export default function ProfileContent() {
  const router = useRouter();

  /**
   * Menyimpan data user yang sedang login.
   *
   * null = belum ada data user
   * User = user berhasil ditemukan
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * Mengecek status login saat halaman dibuka.
   *
   * Alur:
   * 1. Ambil currentUser dari localStorage
   * 2. Jika tidak ada → redirect ke login
   * 3. Jika ada → tampilkan data profile
   * 4. Jika data rusak → hapus dan redirect
   */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");

      /**
       * Jika user belum login
       */
      if (!storedUser) {
        router.replace("/login");
        return;
      }

      /**
       * Konversi string JSON
       * menjadi object User
       */
      const parsedUser: User = JSON.parse(storedUser);

      setUser(parsedUser);
    } catch (error) {
      /**
       * Menangani data localStorage yang rusak
       * atau gagal diparsing.
       */
      console.error("Gagal membaca data currentUser:", error);

      localStorage.removeItem("currentUser");
      router.replace("/login");
    }
  }, [router]);

  /**
   * Saat data user masih dimuat,
   * jangan tampilkan halaman.
   *
   * Bisa diganti dengan Skeleton
   * atau Loading Spinner jika diperlukan.
   */
  if (!user) {
    return null;
  }

  /**
   * Menangani proses logout.
   *
   * Langkah:
   * 1. Hapus session login
   * 2. Kosongkan state user
   * 3. Redirect ke homepage
   */
  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setUser(null);

    router.replace("/");
  };

  return (
    <section className="relative min-h-screen pt-24 px-6 pb-10 justify-center items-center flex overflow-x-hidden bg-linear-to-br from-black via-zinc-950 to-black">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-yellow-400/50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-500/50 blur-3xl" />
      <div className="relative z-10 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            whileHover={{
              y: -4,
            }}
            className="w-full lg:w-80 rounded-3xl border border-yellow-400/50 bg-zinc-900/80 backdrop-blur-md shadow-xl shadow-yellow-400/10 p-7 flex flex-col items-center"
          >
            <Image
              src={user.avatar}
              alt={user.name}
              width={175}
              height={175}
              className="rounded-full object-cover border-4 border-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.35)]"
            />

            <h2 className="mt-5 text-xl md:text-3xl font-bold text-center">
              {user.name}
            </h2>

            <p className="text-gray-400 text-sm md:text-base text-center mt-1">
              {user.username}
            </p>

            <span className="mt-4 rounded-full bg-yellow-400 text-black py-1 px-4 font-semibold text-sm">
              {user.role.toUpperCase()}
            </span>

            <div className="mt-8 w-full border-t border-zinc-700 pt-5">
              <button
                onClick={handleLogout}
                className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-600 active:scale-95"
              >
                Logout
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            whileHover={{
              y: -4,
            }}
            className="flex-1 rounded-3xl border border-black/50 bg-linear-to-br from-yellow-300/80 via-yellow-400/80 to-yellow-500/80 backdrop-blur-md shadow-xl shadow-black/10 p-8"
          >
            <div className="border-b border-black/30 pb-5 text-black">
              <h2 className="text-xl md:text-3xl font-bold">
                Welcome to Your Profile
              </h2>

              <p className="mt-2 text-sm md:text-base opacity-50">
                Manage your personal information below
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 text-black">
              <div className="rounded-2xl border border-black bg-yellow-500/60 p-5 min-w-0">
                <p className="text-xs md:text-sm opacity-50">Full Name</p>
                <h3 className="mt-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base md:text-xl font-semibold">
                  {user.name}
                </h3>
              </div>
              <div className="rounded-2xl border border-black bg-yellow-500/60 p-5 min-w-0">
                <p className="text-xs md:text-sm opacity-50">Username</p>
                <h3 className="mt-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base md:text-xl font-semibold">
                  @{user.username}
                </h3>
              </div>
              <div className="rounded-2xl border border-black bg-yellow-500/60 p-5 md:col-span-2 min-w-0">
                <p className="text-xs md:text-sm opacity-50">Email Address</p>

                <h3 className="mt-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base md:text-xl font-semibold">
                  {user.email}
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
