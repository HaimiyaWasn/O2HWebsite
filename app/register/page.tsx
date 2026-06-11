import RegisterContent from "./client";
import getUsers from "./data";

/**
 * Metadata halaman Register.
 *
 * Metadata ini akan digunakan oleh Next.js
 * untuk mengisi:
 *
 * <title>Register | O2H Official Site</title>
 *
 * Cocok digunakan untuk:
 * - SEO dasar
 * - Nama tab browser
 * - Preview saat halaman dibagikan
 */
export const metadata = {
  title: "Register | O2H Official Site",
}

/**
 * Halaman Register
 *
 * Tugas:
 * - Mengambil data user dari server
 * - Mengirim data user ke Client Component
 *
 * Alur:
 * 1. Ambil seluruh data user
 * 2. Kirim ke RegisterContent
 * 3. RegisterContent menangani form registrasi
 *
 * Karena ini adalah Server Component,
 * data akan diambil sebelum halaman dirender.
 */
export default async function RegisterPage() {
  /**
   * Mengambil seluruh data user.
   *
   * Biasanya digunakan untuk:
   * - Mengecek email yang sudah terdaftar
   * - Mengecek username yang sudah digunakan
   * - Validasi data registrasi
   */
  const users = await getUsers();

  /**
   * Render halaman register
   * dan kirim data user ke Client Component.
   */
  return <RegisterContent users={users} />
}