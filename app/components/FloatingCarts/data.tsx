import { headers } from "next/headers";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  label: string[];
  image: string[];
  deskripsi: string;
  sold: string;
  totalCart: number;
  size: string[];
  discount: number;
  createdAt: string;
  slug: string;
}

export default async function getAllCarts(): Promise<CartItem[]> {
  const host = (await headers()).get("host");

  const res = await fetch(`http://${host}/api/carts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch carts");
  }

  return res.json();
}