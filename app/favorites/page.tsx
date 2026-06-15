import FavoriteContent from "./client";

/**
 * Metadata halaman Favorite.
 *
 * Metadata ini akan digunakan oleh Next.js
 * untuk mengisi:
 *
 * <title>Favorite | O2H Official Site</title>
 *
 * Cocok digunakan untuk:
 * - SEO dasar
 * - Nama tab browser
 * - Preview saat halaman dibagikan
 */
export const metadata = {
  title: 'Favorite | O2H Official Site',
};

/**
 * Halaman Favorite.
 *
 * Tugas halaman ini hanya sebagai
 * Server Component pembungkus yang:
 *
 * 1. Menentukan metadata halaman
 * 2. Merender komponen FavoriteContent
 *
 * Pemisahan seperti ini membuat:
 * - page.tsx tetap sederhana
 * - logic UI berada di client.tsx
 * - lebih mudah dirawat dan dikembangkan
 * app/profile/client.tsx
 */
export default function FavoritePage() {
  return <FavoriteContent />
}