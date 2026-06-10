"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import LogoAnimation from "@/lib/logoAnimation";

/**
 * Struktur data user
 *
 * Data ini berasal dari API atau dummy database
 * yang dikirim dari Server Component ke Client Component.
 */
type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  createdAt: string;
};

/**
 * Props yang diterima komponen LoginContent
 */
type LoginContentProps = {
  users: User[];
};

/**
 * Variasi animasi untuk setiap elemen
 * agar muncul satu per satu saat halaman dimuat.
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
 * Halaman Login
 *
 * Fitur:
 * - Login menggunakan data user
 * - Validasi email dan password
 * - Menyimpan user login ke localStorage
 * - Redirect ke halaman utama setelah login berhasil
 * - Animasi menggunakan Motion
 *
 * Cocok digunakan sebagai:
 * - Login dummy
 * - Prototype authentication
 * - Simulasi login sebelum memakai backend asli
 */
export default function LoginContent({ users }: LoginContentProps) {
  const router = useRouter();

  /**
   * User demo yang otomatis mengisi form login.
   *
   * Misalnya:
   * ID 3 = akun demo untuk testing.
   */
  const demoUser = users.find((user) => user.id === 3);

  /**
   * State email dan password.
   *
   * Secara default akan terisi data user demo
   * jika user tersebut ditemukan.
   */
  const [email, setEmail] = useState(demoUser?.email ?? "");
  const [password, setPassword] = useState(demoUser?.password ?? "");

  /**
   * Menyimpan pesan error login.
   */
  const [error, setError] = useState("");

  /**
   * Mengontrol apakah password ditampilkan
   *
   * false = password disembunyikan
   * true = password ditampilkan
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Menangani proses login.
   */
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Hapus error sebelumnya
    setError("");

    /**
     * Validasi field kosong
     */
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi!");
      return;
    }

    const registeredUser =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("registeredUser") || "null")
        : null;

    const allUsers = registeredUser ? [...users, registeredUser] : users;

    const user = allUsers.find(
      (user) => user.email === email && user.password === password
    );

    /**
     * Jika user tidak ditemukan
     */
    if (!user) {
      setError("Email atau password salah!");
      return;
    }

    /**
     * Simpan data user yang berhasil login
     * ke localStorage.
     *
     * Password sengaja tidak disimpan.
     */
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      })
    );

    /**
     * Redirect ke halaman utama.
     */
    router.push("/");
  };

  return (
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
          <div className="flex items-center justify-center p-6 md:p-12">
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
                Login an Account
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-1 md:mt-2 text-sm md:text-base opacity-75"
              >
                Silahkan login untuk melanjutkan
              </motion.p>

              <motion.form
                variants={item}
                onSubmit={handleLogin}
                className="mt-6 md:mt-8 space-y-4 md:space-y-6"
              >
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  {error && <p className="text-sm text-red-500">{error}</p>}
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
                  Login
                </motion.button>
              </motion.form>

              <motion.div variants={item} className="mt-2 text-center">
                <p className="opacity-75">
                  Belum punya akun?
                  <Link href="/register">
                    <span className="font-bold text-yellow-500"> Register</span>
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
        </motion.div>
      </div>
    </section>
  );
}
