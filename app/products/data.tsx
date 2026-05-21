import { headers } from "next/headers";

export type Products = {
  id: number;
  title: string;
  price: string;
  label: string[];
  image: string | string[];
  deskripsi: string;
  sold: string;
  diskon: boolean;
  slug: string;
}

export default async function getAllProducts() {
  const host = (await headers()).get("host");

  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const allProducts: Products[] = await res.json();

  return allProducts;
}

export async function getProducts(page: number = 1) {
  const allProducts = await getAllProducts();

  const PRODUCTS_PER_PAGE = 50;

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  return {
    products: paginatedProducts,
    totalPages,
    currentPage: page,
  };
}

export async function getProductsBySlug(slug: string) {
  const allProducts = await getAllProducts();

  return allProducts.find((products) => products.slug === slug);
}

export async function getAllProduct() {
  
}