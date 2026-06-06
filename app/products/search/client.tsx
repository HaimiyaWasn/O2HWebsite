"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProductsFilter from "../components/productsFilter";

/**
 * Wrapper untuk menghubungkan:
 * URL Search Params
 * ↕
 * ProductsFilter Component
 *
 * Komponen ini bertugas:
 * - Membaca filter dari URL
 * - Mengubah URL saat filter berubah
 * - Mengirim data filter ke ProductsFilter
 *
 * Dengan pendekatan ini:
 *
 * /products?category=Shirt&size=M,L
 *
 * filter akan tetap tersimpan di URL sehingga:
 * - bisa di-refresh
 * - bisa dibagikan ke orang lain
 * - SEO lebih baik
 */
export default function SearchFilterWrapper() {
  /**
   * Router Next.js
   *
   * Digunakan untuk mengubah URL
   * tanpa reload halaman penuh.
   */
  const router = useRouter();

  /**
   * Mengambil query parameter saat ini.
   *
   * Contoh:
   * /products?category=Shirt&size=M,L
   */
  const searchParams = useSearchParams();

  /**
   * Kategori yang sedang dipilih.
   *
   * Contoh:
   * ?category=Shirt
   */
  const selectedCategory = searchParams.get("category");

  /**
   * Jenis produk yang dipilih.
   *
   * Jika belum ada di URL,
   * gunakan nilai default.
   */
  const productType = searchParams.get("type") || "Semua Produk";

  /**
   * Status stok yang dipilih.
   *
   * Jika belum ada,
   * gunakan nilai default.
   */
  const stockStatus = searchParams.get("stock") || "Semua";

  /**
   * Rentang harga yang dipilih.
   *
   * Contoh:
   * ?priceRange=100000-200000
   */
  const priceRange = searchParams.get("priceRange");

  /**
   * Ukuran yang dipilih.
   *
   * Contoh URL:
   * ?size=M,L,XL
   *
   * Hasil:
   * ["M", "L", "XL"]
   */
  const selectedSize = searchParams.get("size")?.split(",") ?? [];

  /**
   * Fungsi untuk mengubah filter.
   *
   * Parameter:
   * key   = nama filter
   * value = nilai filter baru
   *
   * Contoh:
   * updateFilter("category", "Shirt")
   * updateFilter("size", ["M", "L"])
   */
  const updateFilter = (key: string, value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams.toString());

    /**
     * Menangani filter bertipe array.
     *
     * Contoh:
     * ["M", "L"]
     *
     * Menjadi:
     * size=M,L
     */
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      } else {
        params.delete(key);
      }
    } 
    
    /**
     * Menangani filter bertipe string.
     */
    else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    /**
     * Saat filter berubah,
     * selalu kembali ke halaman pertama.
     *
     * Hal ini mencegah kasus:
     * User berada di page 5,
     * lalu hasil filter hanya memiliki 1 halaman.
     */
    params.set("page", "1");

    /**
     * Update URL.
     */
    router.push(`/products?${params.toString()}`);
  };

  /**
   * Mengirim seluruh data filter
   * ke komponen UI filter.
   */
  return (
    <ProductsFilter
      selectedCategory={selectedCategory}
      productType={productType}
      stockStatus={stockStatus}
      priceRange={priceRange}
      selectedSize={selectedSize}
      updateFilter={updateFilter}
    />
  );
}
