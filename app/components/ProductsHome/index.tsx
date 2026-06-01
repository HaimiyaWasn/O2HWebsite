import { headers } from "next/headers";

import AnimationClient from "./animationClient";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string[];
  sold: string;
  isOutOfStock: boolean;
  size: string[];
  discount: number;
  createdAt: string;
  slug: string;
};

export default async function HomeProductsPageCard() {
  const headersList = await headers();
  const host = headersList.get("host");

  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const productsData: Product[] = await res.json();

  const shuffledProducts = [...productsData];

  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledProducts[i], shuffledProducts[j]] = [
      shuffledProducts[j],
      shuffledProducts[i],
    ];
  }

  const randomProducts = shuffledProducts.slice(0, 18);

  return <AnimationClient products={randomProducts} />;
}