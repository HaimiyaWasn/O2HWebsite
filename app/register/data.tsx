import { headers } from "next/headers";

/**
 * Struktur data User
 *
 * Digunakan sebagai tipe data hasil dari API /api/users.
 *
 * Contoh data:
 * {
 *   id: 1,
 *   username: "admin",
 *   name: "Administrator",
 *   email: "admin@example.com",
 *   password: "******",
 *   role: "admin",
 *   createdAt: "2026-01-01"
 * }
 */
export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
};

/**
 * Mengambil seluruh data user dari API internal Next.js.
 *
 * Fungsi ini biasanya digunakan pada:
 * - Server Component
 * - generateMetadata()
 * - Layout
 * - Page
 *
 * Kenapa menggunakan headers()?
 * Karena host dapat berbeda antara:
 * - Development  → localhost:3000
 * - Production   → domain website
 *
 * Dengan mengambil host dari request saat ini,
 * URL API akan selalu sesuai dengan environment yang berjalan.
 */
export default async function getUsers(): Promise<User[]> {
  /**
   * Mengambil host aktif.
   *
   * Contoh:
   * localhost:3000
   * o2h-official.vercel.app
   */
  const host = (await headers()).get("host");

  /**
   * Menentukan protocol berdasarkan environment.
   *
   * Development:
   * http://localhost:3000
   *
   * Production:
   * https://domain.com
   */
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  /**
   * Request data user ke API internal.
   *
   * cache: "no-store"
   * berarti data selalu diambil ulang
   * setiap request dan tidak menggunakan cache.
   */
  const response = await fetch (`${protocol}://${host}/api/users`, {
    cache: "no-store",
  });

  /**
   * Jika request gagal,
   * lempar error agar mudah dideteksi.
   */
  if (!response.ok) {
    throw new Error("Gagal mengambil data user")
  }

  /**
   * Mengembalikan data user dalam bentuk array.
   */
  return response.json();
}