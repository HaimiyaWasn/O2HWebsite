"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Navbar from "../components/Navbar";
import SearchStore from "./search/searchClient";
import FloatingLogo from "../components/FloatingLogo";
import { BiCategory } from "react-icons/bi";

type Stores = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
};

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function StoresClient({
  allStore,
  totalPages,
  currentPage,
}: {
  allStore: any[];
  totalPages: number;
  currentPage: number;
}) {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productType, setProductType] = useState<string>("Semua Produk");
  const [stockStatus, setStockStatus] = useState<string>("Semua");
  const [priceRange, setPriceRange] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContent(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -90px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCategory = (category: string) => {
    setSelectedCategory((prevCategory) => prevCategory === category ? null : category);
  };

  const handlePrice = (range: string) => {
    setPriceRange((prevRange) => prevRange === range ? null : range);
  }

  return (
    <>
      <title>Store | O2H Official Site</title>
      <Navbar />
      <section className="py-20 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-center items-center mb-10">
            <SearchStore />
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-75 border border-yellow-400 rounded-xl h-fit">
              <div className="p-5 border-b border-yellow-400">
                <h1 className={`text-2xl ${playfairDisplayBold.className}`}>
                  Filter
                </h1>
              </div>

              <div className="px-5 py-3">
                <div className="collapse collapse-arrow border-b border-yellow-400 rounded-none">
                  <input type="checkbox" defaultChecked />
                  <div
                    className={`collapse-title font-semibold px-0 ${playfairDisplayRegular.className}`}
                  >
                    Kategori
                  </div>
                  <div className="collapse-content px-0">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checked:bg-black checked:text-white dark:checked:border-white dark:checked:bg-white dark:checked:text-black"
                          checked={selectedCategory === "Tshirt"}
                          onChange={() => handleCategory("Tshirt")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Tshirt
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checked:border-white checked:bg-black checked:text-white dark:checked:border-white dark:checked:bg-white dark:checked:text-black"
                          checked={selectedCategory === "Jacket"}
                          onChange={() => handleCategory("Jacket")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Jacket
                        </span>
                      </label>
                      <label className=" flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checked:border-white checked:bg-black checked:text-white dark:checked:border-white dark:checked:bg-white dark:checked:text-black"
                          checked={selectedCategory === "Jersey"}
                          onChange={() => handleCategory("Jersey")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Jersey
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checked:border-black checked:bg-black checked:text-white dark:checked:border-white dark:checked:bg-white dark:checked:text-black"
                          checked={selectedCategory === "Hats"}
                          onChange={() => handleCategory("Hats")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Hats
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checked:bg-black checked:text-white dark:checked:border-white dark:checked:bg-white dark:checked:text-black"
                          checked={selectedCategory === "Sale"}
                          onChange={() => handleCategory("Sale")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Sale
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checked:bg-black checked:text-white dark:checked:border-white dark:checked:bg-white dark:checked:text-black"
                          checked={selectedCategory === "Accessories"}
                          onChange={() => handleCategory("Accessories")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Accessories
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="collapse collapse-arrow border-b border-yellow-400 rounded-none">
                  <input type="checkbox" defaultChecked />
                  <div
                    className={`collapse-title font-semibold px-0 ${playfairDisplayRegular.className}`}
                  >
                    TIpe Produk
                  </div>
                  <div className="collapse-content px-0">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="produk"
                          className="radio radio-sm"
                          checked={productType === "Semua Produk"}
                          onChange={() => setProductType("Semua Produk")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Semua Produk
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="poduk"
                          className="radio radio-sm"
                          checked={productType === "Produk Baru"}
                          onChange={() => setProductType("Produk Baru")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Diskon
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="collapse collapse-arrow border-b border-yellow-400 rounded-none">
                  <input type="checkbox" defaultChecked />
                  <div
                    className={`collapse-title font-semibold px-0 ${playfairDisplayRegular.className}`}
                  >
                    Ketersediaan
                  </div>
                  <div className="collapse-content px-0">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="stock"
                          className="radio radio-sm"
                          checked={stockStatus === "Semua"}
                          onChange={() => setStockStatus("Semua")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Semua
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="stock"
                          className="radio radio-sm"
                          checked={stockStatus === "Ada Stok"}
                          onChange={() => setStockStatus("Ada Stok")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Ada stok
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="collapse collapse-arrow border-b border-yellow-400 rounded-none">
                  <input type="checkbox" defaultChecked />
                  <div
                    className={`collapse-title font-semibold px-0 ${playfairDisplayRegular.className}`}
                  >
                    Harga
                  </div>
                  <div className="collapse collapse-content px-0">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="harga"
                          className="radio radio-sm"
                          checked={priceRange === "under260"}
                          onChange={() => handlePrice("under260")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Di bawah Rp 260,000
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="harga"
                          className="radio radio-sm"
                          checked={priceRange === "260-350"}
                          onChange={() => handlePrice("260-350")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Rp 260,000 - Rp 350,000
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="harga"
                          className="radio radio-sm"
                          checked={priceRange === "350-450"}
                          onChange={() => handlePrice("350-450")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Rp 350,000 - Rp 450,000
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="harga"
                          className="radio radio-sm"
                          checked={priceRange === "450plus"}
                          onChange={() => handlePrice("450plus")}
                        />
                        <span className={`${playfairDisplayRegular.className}`}>
                          Rp 450,000 +
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="collapse collapse-arrow rounded-none">
                  <input type="checkbox" defaultChecked />
                  <div
                    className={`collapse-title font-semibold px-0 ${playfairDisplayRegular.className}`}
                  >
                    Size
                  </div>
                  <div className="collapse-content px-0">
                    <form className="flex flex-wrap gap-2">
                      <input
                        className={`btn btn-sm border border-yellow-400 checked:bg-yellow-400 checked:text-black ${playfairDisplayRegular.className}`}
                        type="checkbox"
                        aria-label="M"
                      />
                      <input
                        className={`btn btn-sm border border-yellow-400 checked:bg-yellow-400 checked:text-black ${playfairDisplayRegular.className}`}
                        type="checkbox"
                        aria-label="L"
                      />
                      <input
                        className={`btn btn-sm border border-yellow-400 checked:bg-yellow-400 checked:text-black ${playfairDisplayRegular.className}`}
                        type="checkbox"
                        aria-label="XL"
                      />
                      <input
                        className={`btn btn-sm border border-yellow-400 checked:bg-yellow-400 checked:text-black ${playfairDisplayRegular.className}`}
                        type="checkbox"
                        aria-label="XXL"
                      />
                      <input
                        className={`btn btn-sm border border-yellow-400 hover:bg-yellow-400 active:bg-yellow-400 hover:text-black active:text-black ${playfairDisplayRegular.className}`}
                        type="reset"
                        value="Delete"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FloatingLogo />
      </section>
    </>
  );
}
