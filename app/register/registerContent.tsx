"use client"

import Link from "next/link";
import { motion } from "motion/react";

import LogoAnimation from "@/lib/logoAnimation";

export default function RegisterContent() {
  return (
    <>
      <section className="min-h-screen bg-yellow-400 max-md:bg-linear-to-br max-md:from-yellow-300 max-md:via-yellow-400 max-md:to-yellow-500">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <div className="grid w-full overflow-hidden rounded-3xl bg-yellow-50 shadow-2xl md:grid-cols-2">
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
              <div className="w-full max-w-md text-black">
                <h1 className="text-2xl md:text-4xl font-bold">
                  Create an Account
                </h1>
                <p className="mt-1 md:mt-2 text-sm md:text-base opacity-75">
                  Silahkan buat akun anda
                </p>
                <form className="mt-6 md:mt-8 space-y-4 md:space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Username</label>
                    <input
                      type="text"
                      placeholder="Masukkan username anda"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500 focus:border-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      placeholder="Masukkan email anda"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500 focus:border-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Password</label>
                    <input
                      type="password"
                      placeholder="Masukkan password anda"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500 focus:border-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Konfirmasi Password</label>
                    <input
                      type="password"
                      placeholder="Masukkan konfirmasi password anda"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500 focus:border-2"
                    />
                  </div>
                  <button className="mt-4 w-full rounded-lg bg-yellow-400 py-3 font-bold">
                    Register
                  </button>
                </form>
                <div className="mt-2 text-center">
                  <p className="opacity-75">
                    Sudah punya akun?
                    <Link href="/login">
                      <span className="font-bold text-yellow-500"> Login</span>
                    </Link>
                  </p>
                </div>
                <div className="mt-6 text-center md:hidden">
                  <Link
                    href="/"
                    className="opacity-50 transition-all duration-500 hover:opacity-100"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
