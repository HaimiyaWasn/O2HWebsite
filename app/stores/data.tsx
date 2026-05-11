import { headers } from "next/headers";

export type Stores = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
}

export default async function getAllStores() {
  const host = (await headers()).get("host");

  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stores");
  }

  const allStore: Stores[] = await res.json();

  return allStore.sort(
    (a, b) => new Date(b.title).getTime() - new Date(a.title).getTime()
  );
}

export async function getStores(page: number = 1) {
  const allStore = await getAllStores();

  const STORES_PER_PAGE = 50;

  const startIndex = (page - 1) * STORES_PER_PAGE;
  const endIndex = startIndex + STORES_PER_PAGE;

  const paginatedStores = allStore.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allStore.length / STORES_PER_PAGE);

  return {
    store: paginatedStores,
    totalPages,
    currentPage: page,
  };
}

export async function getStoresBySlug(slug: string) {
  const allNews = await getAllStores();

  return allNews.find((store) => store.title === slug);
}