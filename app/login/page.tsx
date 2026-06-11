import LoginContent from "./client";
import getUsers from "./data";

/**
 * Metadata halaman
 *
 * Digunakan oleh Next.js App Router untuk
 * menghasilkan tag <title> secara otomatis.
 *
 * Hasil:
 * <title>Login | O2H Official Site</title>
 */
export const metadata = {
  title: "Login | O2H Official Site",
};

/**
 * Halaman Login
 *
 * Bertugas:
 * - Mengambil data user dari server
 * - Mengirim data tersebut ke komponen LoginContent
 *
 * Karena menggunakan async function,
 * komponen ini dijalankan sebagai Server Component.
 */
export default async function LoginPage() {
  /**
   * Mengambil seluruh data user
   * dari API atau sumber data lainnya.
   */
  const users = await getUsers();

  /**
   * Mengirim data user ke Client Component
   * yang menangani tampilan dan proses login.
   */
  return <LoginContent users={users} />;
}
