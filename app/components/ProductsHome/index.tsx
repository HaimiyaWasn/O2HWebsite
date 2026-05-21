import { headers } from "next/headers";

import AnimationClient from "./animationClient";

// Tipe data produk
type Product = {
  id: number;
  title: string;
  price: string;
  image: string | string[];
  sold: string;
  diskon: boolean;
  slug: string;
};

// Mengambil dan menampilkan produk store
export default async function HomeProductsPageCard() {
  const headersList = await headers();
  const host = headersList.get("host");

  // Fetch data produk
  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store",
  });

  // Error jika fetch gagal
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // Ambil data JSON
  const productsData: Product[] = await res.json();

  // Fisher-Yates Shuffle (lebih aman)
  const shuffledProducts = [...productsData];

  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledProducts[i], shuffledProducts[j]] = [
      shuffledProducts[j],
      shuffledProducts[i],
    ];
  }

  // Ambil 18 produk
  const limitedRandomProducts = shuffledProducts.slice(0, 18);

  return <AnimationClient products={limitedRandomProducts} />;
}