import ProfileContent from "./client";

/**
 * Metadata halaman Profile.
 *
 * Metadata ini akan digunakan oleh Next.js
 * untuk mengisi:
 *
 * <title>Profile | O2H Official Site</title>
 *
 * Cocok digunakan untuk:
 * - SEO dasar
 * - Nama tab browser
 * - Preview saat halaman dibagikan
 */
export const metadata = {
  title: "Profile | O2H Official Site",
};

/**
 * Halaman Profile.
 *
 * Tugas halaman ini hanya sebagai
 * Server Component pembungkus yang:
 *
 * 1. Menentukan metadata halaman
 * 2. Merender komponen ProfileContent
 *
 * Pemisahan seperti ini membuat:
 * - page.tsx tetap sederhana
 * - logic UI berada di client.tsx
 * - lebih mudah dirawat dan dikembangkan
 */
export default function ProfilePage() {
  return <ProfileContent />;
}