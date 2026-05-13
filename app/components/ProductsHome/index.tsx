import { headers } from "next/headers"; // Mengambil header request

import AnimationClient from "./animationClient";

// Tipe data produk
type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
  slug: string;
};

// Mengambil dan menampilkan produk store
export default async function HomeProductsPageCard() {
  const headersList = await headers();
  const host = headersList.get("host");

  // Fetch data produk
  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store", // Selalu ambil data terbaru
  });

  // Error jika fetch gagal
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // Ambil data JSON
  const productsData: Product[] = await res.json();

  // Acak dan ambil 18 produk
  const limitedRandomProducts = [...productsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 18);

  return <AnimationClient products={limitedRandomProducts} />;
}
