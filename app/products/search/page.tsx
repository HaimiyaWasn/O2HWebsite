import { headers } from "next/headers";

import SearchProducts from "./searchClient";
import Navbar from "@/app/components/NavbarO2H";
import FloatingLogo from "@/app/components/FloatingLogo";

import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import Link from "next/link";
import Footer from "@/app/components/Footer";
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
  price: string;
  label: string;
  image: string;
  sold: string;
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

  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; page?: string }>;
}) {
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
      <Navbar />
      <section className="pt-20 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-center items-center mb-7">
            <SearchProducts defaultSearch={keyword} />
          </div>
          <div className="flex flex-col lg:flex-row gap-0 md:gap-6">
            <div className="w-full lg:w-60">
              <SearchFilterWrapper />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <RevealOnScroll delay={300}>
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

                <RevealOnScroll delay={300}>
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

              <RevealOnScroll delay={700}>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {paginatedProducts.map((product) => {
                      const images = Array.isArray(product.image)
                        ? product.image
                        : [product.image];

                      const hasSecondImage = images.length > 1;

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                        >
                          <div className="group flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer h-full">
                            <div className="relative w-full h-40 overflow-hidden rounded">
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

                            <div className="border-t border-yellow-400 my-3">
                              <p
                                className={`text-sm mt-2 line-clamp-2 text-black ${playfairDisplayBold.className}`}
                              >
                                {product.title}
                              </p>
                              <p className="text-yellow-500 mt-1 font-semibold">
                                {product.price}
                              </p>
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
                <RevealOnScroll delay={300}>
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
        <FloatingLogo />
        <Footer variant="yellow" />
      </section>
    </>
  );
}
