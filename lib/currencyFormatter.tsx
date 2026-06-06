/**
 * Formatter mata uang Rupiah (IDR)
 *
 * Dibuat satu kali di luar function agar:
 * - Tidak dibuat ulang setiap kali function dipanggil
 * - Lebih hemat performa
 * - Bisa digunakan berkali-kali di seluruh aplikasi
 *
 * Contoh hasil:
 * 150000  → Rp150.000
 * 2500000 → Rp2.500.000
 */
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/**
 * Mengubah angka menjadi format mata uang Rupiah
 *
 * Cocok digunakan untuk:
 * - Harga produk
 * - Total pembayaran
 * - Diskon
 * - Laporan keuangan sederhana
 *
 * @param amount Nilai angka yang akan diformat
 *
 * @example
 * formatCurrency(150000)
 * // "Rp150.000"
 *
 * @example
 * formatCurrency(2500000)
 * // "Rp2.500.000"
 */
export function formatCurrency(amount: number) {
  return formatter.format(amount);
}