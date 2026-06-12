import { headers } from "next/headers";

/**
 * Mengambil seluruh data user dari API internal Next.js
 *
 * Cocok digunakan untuk:
 * - Halaman login
 * - Halaman profile
 * - Dashboard admin
 * - Sistem manajemen user
 *
 * Data diambil langsung dari endpoint:
 * /api/users
 *
 * Karena menggunakan `cache: "no-store"`,
 * data akan selalu diambil versi terbaru
 * setiap kali fungsi dipanggil.
 */
export default async function getUsers() {
  /**
   * Mengambil host aktif aplikasi.
   *
   * Contoh:
   * localhost:3000
   * example.com
   */
  const host = (await headers()).get("host");

  /**
   * Menentukan protocol berdasarkan environment.
   *
   * Development:
   * http://localhost:3000
   *
   * Production:
   * https://example.com
   */
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  /**
   * Mengambil data user dari API internal.
   *
   * cache: "no-store"
   * berarti data tidak disimpan dalam cache
   * sehingga selalu mendapatkan data terbaru.
   */
  const response = await fetch(`${protocol}://${host}/api/users`, {
    cache: "no-store",
  });

  /**
   * Jika request gagal,
   * lempar error agar bisa ditangani
   * oleh Error Boundary Next.js
   */
  if (!response.ok) {
    throw new Error("Gagal mengambil data users");
  };

  /**
   * Mengubah response menjadi JSON
   * lalu mengembalikannya ke pemanggil fungsi.
   */
  return response.json();
}
