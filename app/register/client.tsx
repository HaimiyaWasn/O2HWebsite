"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import LogoAnimation from "@/lib/logoAnimation";

/**
 * Struktur data User.
 *
 * Digunakan untuk data user yang berasal dari API
 * maupun user baru yang dibuat saat registrasi.
 */
type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
};

/**
 * Props yang diterima komponen RegisterContent.
 *
 * users digunakan untuk:
 * - Mengecek email yang sudah terdaftar
 * - Menentukan ID user baru
 */
type RegisterContentProps = {
  users: User[];
};

/**
 * Variasi animasi Motion.
 *
 * Digunakan agar setiap elemen muncul
 * secara bertahap saat halaman dimuat.
 */
const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

/**
 * Halaman Register
 *
 * Fitur:
 * - Validasi field kosong
 * - Validasi konfirmasi password
 * - Cek email yang sudah digunakan
 * - Menyimpan user baru ke localStorage
 * - Redirect ke halaman login
 * - Toggle tampil/sembunyikan password
 *
 * Cocok digunakan untuk:
 * - Prototype authentication
 * - Dummy login/register
 * - Simulasi sebelum memakai backend asli
 */
export default function RegisterContent({ users }: RegisterContentProps) {
  const router = useRouter();

  /**
   * State form registrasi.
   */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * State untuk menampilkan / menyembunyikan password.
   */
  const [showPassword, setShowPassword] = useState(false);
  /**
   * State untuk menampilkan / menyembunyikan
   * password konfirmasi.
   */
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  /**
   * Menyimpan pesan error validasi.
   */
  const [error, setError] = useState("");
  /**
   * Menyimpan pesan sukses registrasi.
   */
  const [success, setSuccess] = useState("");

  /**
   * Menangani proses registrasi user.
   */
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset pesan sebelumnya
    setError("");
    setSuccess("");

    /**
     * Validasi field kosong.
     */
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Semua field wajib diisi!");
      return;
    }

    /**
     * Validasi password dan konfirmasi password.
     */
    if (password != confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    /**
     * Mengecek apakah email sudah digunakan.
     *
     * Pencarian dibuat case-insensitive.
     */
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      setError("Email sudah digunakan!");
      return;
    }

    /**
     * Membuat data user baru.
     *
     * Pada aplikasi production,
     * proses ini biasanya dikirim ke API/backend.
     */
    const newUser = {
      id: users.length + 1,
      username,
      name: username,
      email,
      password,
      role: "member",
      avatar: "/img/profileIconDefault.jpg",
      createdAt: new Date().toISOString(),
    };

    /**
     * Menyimpan user baru ke localStorage.
     *
     * Hanya untuk simulasi register.
     * Tidak direkomendasikan untuk production.
     */
    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    /**
     * Menampilkan pesan sukses.
     */
    setSuccess("Register berhasil! Redirect ke halaman login...");

    /**
     * Redirect ke halaman login
     * setelah 1.5 detik.
     */
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <>
      <section className="min-h-screen bg-yellow-400 max-md:bg-linear-to-br max-md:from-yellow-300 max-md:via-yellow-400 max-md:to-yellow-500">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
            }}
            className="grid w-full overflow-hidden rounded-3xl bg-yellow-50 shadow-2xl md:grid-cols-2"
          >
            <div className="hidden flex-col bg-linear-to-br from-yellow-300 via-yellow-400 to-yellow-500 p-8 md:flex">
              <div className="flex items-center justify-between">
                <div className="text-black">
                  <h2 className="text-3xl font-bold">O2H Official Site</h2>

                  <p className="mt-1 opacity-80">
                    Temukan koleksi favoritmu disini!!!
                  </p>
                </div>

                <Link
                  href="/"
                  className="opacity-50 transition-all duration-500 hover:opacity-100 text-black"
                >
                  Back to home
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <LogoAnimation />
              </div>

              <p className="text-right text-sm opacity-75 text-black">
                © 2026 O2H Official Site
              </p>
            </div>

            <div className="flex items-center justify-center p-6 md:p-10">
              <motion.div
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.12,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                className="w-full max-w-md text-black"
              >
                <motion.h1
                  variants={item}
                  className="text-2xl md:text-4xl font-bold"
                >
                  Create an Account
                </motion.h1>
                <motion.p
                  variants={item}
                  className="mt-1 md:mt-2 text-sm md:text-base opacity-75"
                >
                  Silahkan buat akun anda
                </motion.p>

                <motion.form
                  variants={item}
                  onSubmit={handleRegister}
                  className="mt-6 md:mt-8 space-y-4 md:space-y-6"
                >
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Username</label>
                    <input
                      minLength={3}
                      maxLength={20}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase())}
                      placeholder="Masukkan username anda"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500 focus:border-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input
                      minLength={5}
                      maxLength={100}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      placeholder="Masukkan email anda"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500 focus:border-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Password</label>
                    <div className="relative">
                      <input
                        minLength={8}
                        maxLength={32}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password anda"
                        className="w-full rounded-lg border border-yellow-400 bg-white px-4 py-3 pr-14 outline-none transition focus:border-yellow-500 focus:border-2"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword
                            ? "Sembunyikan password"
                            : "Tampilkan password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-all"
                      >
                        {showPassword ? (
                          <FaEyeSlash size={18} />
                        ) : (
                          <FaEye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Konfirmasi Password</label>
                    <div className="relative">
                      <input
                        minLength={8}
                        maxLength={32}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={confirmShowPassword ? "text" : "password"}
                        placeholder="Masukkan konfirmasi password anda"
                        className="w-full rounded-lg border border-yellow-400 bg-white px-4 py-3 pr-14 outline-none transition focus:border-yellow-500 focus:border-2"
                      />

                      <button
                        type="button"
                        onClick={() => setConfirmShowPassword((prev) => !prev)}
                        aria-label={
                          confirmShowPassword
                            ? "Sembunyikan password"
                            : "Tampilkan password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-all"
                      >
                        {confirmShowPassword ? (
                          <FaEyeSlash size={18} />
                        ) : (
                          <FaEye size={18} />
                        )}
                      </button>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    {success && (
                      <p className="text-sm text-green-600">{success}</p>
                    )}
                  </div>
                  <motion.button
                    variants={item}
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-yellow-400 py-3 font-bold"
                  >
                    Register
                  </motion.button>
                </motion.form>

                <motion.div variants={item} className="mt-2 text-center">
                  <p className="opacity-75">
                    Sudah punya akun?
                    <Link href="/login">
                      <span className="font-bold text-yellow-500"> Login</span>
                    </Link>
                  </p>
                </motion.div>

                <motion.div
                  variants={item}
                  className="mt-6 text-center md:hidden"
                >
                  <Link
                    href="/"
                    className="opacity-50 transition-all duration-500 hover:opacity-100"
                  >
                    Back to home
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
