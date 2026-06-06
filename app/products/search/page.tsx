import { headers } from "next/headers";

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

import SearchProducts from "./searchClient";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import SearchFilterWrapper from "./client";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

interface Product {
  id: number;
  title: string;
  price: number;
  label: string[];
  image: string[];
  sold: string;
  isOutOfStock: boolean;
  size: string[];
  discount: number;
  createdAt: string;
  slug: string;
}

async function getProducts(): Promise<Product[]> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";

  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const allProducts: Product[] = await res.json();

  const availableProducts = allProducts
    .filter((product) => !product.isOutOfStock)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const outOfStockProducts = allProducts
    .filter((product) => product.isOutOfStock)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return [...availableProducts, ...outOfStockProducts];
}

type SearchPageProps = {
  searchParams: Promise<{ keyword?: string; page?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const keyword = params.keyword?.toLowerCase() || "";
  const currentPage = Number(params.page) || 1;

  const products = await getProducts();

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(keyword)
  );

  const PRODUCTS_PER_PAGE = 20;
  const MAX_VISIBLE_PAGES = 5;

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const paginatedProducts = filtered.slice(startIndex, endIndex);

  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  if (endPage > totalPages) {
    endPage = totalPages;

    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  const visiblePages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <>
      <title>Search | O2H Official Site</title>
      <section className="pt-5 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-center items-center mb-7">
            <SearchProducts defaultSearch={keyword} />
          </div>
          <div className="flex flex-col lg:flex-row gap-0 md:gap-6">
            <div className="w-full lg:w-60">
              <SearchFilterWrapper />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <RevealOnScroll delay={0.3}>
                  <div
                    className={`flex w-full md:w-fit items-center justify-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md`}
                  >
                    <span
                      className={`text-md md:text-2xl tracking-[0.2rem] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
                    >
                      Search Product
                    </span>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.3}>
                  <p
                    className={`text-sm md:text-base text-gray-300 ${playfairDisplayRegular.className}`}
                  >
                    Hasil pencarian untuk anda:
                    <span
                      className={`text-yellow-400 ml-2 ${playfairDisplayBold.className}`}
                    >
                      "{keyword}"
                    </span>
                  </p>
                </RevealOnScroll>
              </div>

              <RevealOnScroll delay={0.75}>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {paginatedProducts.map((product) => {
                      const finalPrice =
                        product.discount > 0
                          ? product.price -
                            (product.price * product.discount) / 100
                          : product.price;

                      const isNew =
                        new Date(product.createdAt).getTime() >
                        Date.now() - 30 * 24 * 60 * 60 * 1000;

                      const images = Array.isArray(product.image)
                        ? product.image
                        : [product.image];

                      const hasSecondImage = images.length > 1;

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                        >
                          <div
                            className={`group flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer h-full ${
                              product.isOutOfStock ? "opacity-75" : ""
                            }`}
                          >
                            <div className="relative aspect-square overflow-hidden rounded">
                              {product.isOutOfStock && (
                                <div className="absolute top-1 left-1 z-30 bg-black text-white text-[10px] px-2 py-1 rounded font-bold">
                                  Stok Habis
                                </div>
                              )}
                              {isNew && (
                                <div
                                  className={`absolute left-1 z-20 bg-black text-white text-[10px] px-2 py-1 rounded font-bold ${
                                    product.isOutOfStock ? "top-8" : "top-1"
                                  }`}
                                >
                                  NEW
                                </div>
                              )}

                              {product.discount > 0 && (
                                <div className="absolute top-1 right-1 z-20 bg-red-500 text-white text-[10px] px-2 py-1 rounded font-bold">
                                  -{product.discount}%
                                </div>
                              )}

                              <Image
                                src={images[0]}
                                alt={product.title}
                                fill
                                className={`object-cover transition-all duration-500 ${
                                  hasSecondImage
                                    ? "group-hover:opacity-0 group-hover:scale-105"
                                    : "group-hover:scale-105"
                                }`}
                              />
                              {hasSecondImage && (
                                <Image
                                  src={images[1]}
                                  alt={product.title}
                                  fill
                                  className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                />
                              )}
                            </div>

                            <div className="border-t border-yellow-400 my-3 flex flex-col flex-1">
                              <p
                                className={`text-sm mt-2 line-clamp-2 h-10 text-black ${playfairDisplayBold.className}`}
                              >
                                {product.title}
                              </p>
                              <div className="mt-1 flex flex-col pt-3">
                                {product.discount > 0 ? (
                                  <>
                                    <p className="text-xs text-gray-400 line-through">
                                      {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: 0,
                                      }).format(product.price)}
                                    </p>
                                    <p className="text-yellow-500 font-semibold">
                                      {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: 0,
                                      }).format(finalPrice)}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-xs invisible">
                                      {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: 0,
                                      }).format(product.price)}
                                    </p>
                                    <p className="text-yellow-500 font-semibold">
                                      {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: 0,
                                      }).format(product.price)}
                                    </p>
                                  </>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">
                                {product.sold}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center min-h-75 border border-dashed border-yellow-400 rounded-xl">
                    <p
                      className={`text-xl text-yellow-400 text-center ${playfairDisplayBold.className}`}
                    >
                      Produk tidak ditemukan
                    </p>
                  </div>
                )}
              </RevealOnScroll>
              {totalPages > 1 && (
                <RevealOnScroll delay={0.3}>
                  <div className="flex items-center justify-center gap-3 my-14 flex-wrap">
                    {visiblePages.map((page) => {
                      const queryParams = new URLSearchParams();

                      // simpan keyword
                      if (keyword) {
                        queryParams.set("keyword", keyword);
                      }

                      // simpan page
                      if (page > 1) {
                        queryParams.set("page", String(page));
                      }

                      return (
                        <Link
                          key={page}
                          href={`/products/search?${queryParams.toString()}`}
                          className={`px-4 py-2 border transition cursor-pointer ${
                            currentPage === page
                              ? "bg-white text-black"
                              : "bg-transparent text-white hover:bg-white hover:text-black"
                          }`}
                        >
                          {page}
                        </Link>
                      );
                    })}
                  </div>
                </RevealOnScroll>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
