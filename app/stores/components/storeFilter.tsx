"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { LuSlidersHorizontal } from "react-icons/lu";

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function StoreFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productType, setProductType] = useState<string>("Semua Produk");
  const [stockStatus, setStockStatus] = useState<string>("Semua");
  const [priceRange, setPriceRange] = useState<string | null>(null);

  const [openFilter, setOpenFilter] = useState(false);

  const handleCategory = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const handlePrice = (range: string) => {
    setPriceRange((prevRange) => (prevRange === range ? null : range));
  };

  return (
    <section>
      {/* Dekstop */}
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block w-full lg:w-75 border border-yellow-400 rounded-xl h-fit">
          <div className="p-5 border-b border-yellow-400">
            <h1 className={`text-2xl ${playfairDisplayBold.className}`}>
              Filter
            </h1>
          </div>

          <div className="px-5 py-3">
            <div className="collapse collapse-arrow border-b border-yellow-400 rounded-none">
              <input type="checkbox" defaultChecked />
              <div
                className={`collapse-title px-0 ${playfairDisplayRegular.className}`}
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

      {/* Mobile */}
      <div className="flex gap-3 mb-5 lg:hidden">
        <button
          onClick={() => setOpenFilter(true)}
          className={`btn flex-1 rounded-xl border border-yellow-400 shadow-none hover:bg-yellow-400 active:bg-yellow-400 hover:text-black active:text-black ${playfairDisplayBold.className}`}
        >
          <LuSlidersHorizontal size={18} />
          Filter
        </button>
        {/* <button onClick={() => setOpenFilter(true)} className={`btn flex-1 rounded-xl border border-yellow-400 shadow-none hover:bg-yellow-400 active:bg-yellow-400 hover:text-black active:text-black`}>
              <LuArrowUpDown size={18} />
              Urutkan
            </button> */}
      </div>

      <div
        onClick={() => setOpenFilter(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          openFilter
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-9999 bg-yellow-400 rounded-t-4xl transition-transform duration-300 lg:hidden ${
          openFilter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-black">
          <h1
            className={`text-3xl text-black ${playfairDisplayBold.className}`}
          >
            Filter
          </h1>
          <button
            onClick={() => setOpenFilter(false)}
            className="btn rounded-xl text-md leading-none"
          >
            Close
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-5 py-3">
          <div className="collapse collapse-arrow border-b border-black rounded-none">
            <input type="checkbox" defaultChecked />
            <div
              className={`collapse-title px-0 text-black ${playfairDisplayRegular.className}`}
            >
              Kategori
            </div>
            <div className="collapse-content px-0">
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border border-black checked:bg-white checked:text-black dark:checked:border-black dark:checked:bg-black dark:checked:text-white"
                    checked={selectedCategory === "Tshirt"}
                    onChange={() => handleCategory("Tshirt")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Tshirt
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border border-black checked:bg-white checked:text-black dark:checked:border-black dark:checked:bg-black dark:checked:text-white"
                    checked={selectedCategory === "Jacket"}
                    onChange={() => handleCategory("Jacket")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Jacket
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border border-black checked:bg-white checked:text-black dark:checked:border-black dark:checked:bg-black dark:checked:text-white"
                    checked={selectedCategory === "Jersey"}
                    onChange={() => handleCategory("Jersey")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Jersey
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border border-black checked:bg-white checked:text-black dark:checked:border-black dark:checked:bg-black dark:checked:text-white"
                    checked={selectedCategory === "Hats"}
                    onChange={() => handleCategory("Hats")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Hats
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border border-black checked:bg-white checked:text-black dark:checked:border-black dark:checked:bg-black dark:checked:text-white"
                    checked={selectedCategory === "Sale"}
                    onChange={() => handleCategory("Sale")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Sale
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border border-black checked:bg-white checked:text-black dark:checked:border-black dark:checked:bg-black dark:checked:text-white"
                    checked={selectedCategory === "Accessories"}
                    onChange={() => handleCategory("Accessories")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Accessories
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow border-b border-black rounded-none">
            <input type="checkbox" defaultChecked />
            <div
              className={`collapse-title px-0 text-black ${playfairDisplayRegular.className}`}
            >
              Tipe Produk
            </div>
            <div className="collapse-content px-0">
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="radio radio-sm border-black"
                    checked={productType === "Semua Produk"}
                    onChange={() => setProductType("Semua Produk")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Semua Produk
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="radio radio-sm border-black"
                    checked={productType === "Diskon"}
                    onChange={() => setProductType("Diskon")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Diskon
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow border-b border-black rounded-none">
            <input type="checkbox" defaultChecked />
            <div
              className={`collapse-title px-0 text-black ${playfairDisplayRegular.className}`}
            >
              Ketersediaan
            </div>
            <div className="collapse-content px-0">
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="radio radio-sm border-black"
                    checked={stockStatus === "Semua"}
                    onChange={() => setStockStatus("Semua")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Semua
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="radio radio-sm border-black"
                    checked={stockStatus === "Ada Stock"}
                    onChange={() => setStockStatus("Ada Stock")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Ada Stock
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow border-b border-black px-0">
            <input type="checkbox" defaultChecked />
            <div
              className={`collapse-title px-0 text-black ${playfairDisplayRegular.className}`}
            >
              Harga
            </div>
            <div className="collapse-content px-0">
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="radio radio-sm border-black"
                    checked={priceRange === "under260"}
                    onChange={() => handlePrice("under260")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Di bawah Rp 260,000
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="radio radio-sm border-black"
                    checked={priceRange === "260-350"}
                    onChange={() => handlePrice("260-350")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Rp 260,000 - Rp 350,000
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="radio radio-sm border-black"
                    checked={priceRange === "350-450"}
                    onChange={() => handlePrice("350-450")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Rp 350,000 - Rp 450,000
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="radio radio-sm border-black"
                    checked={priceRange === "450plus"}
                    onChange={() => handlePrice("450plus")}
                  />
                  <span
                    className={`text-black ${playfairDisplayRegular.className}`}
                  >
                    Rp 450,000 +
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow px-0">
            <input type="checkbox" defaultChecked />
            <div
              className={`collapse-title px-0 text-black ${playfairDisplayRegular.className}`}
            >
              Size
            </div>
            <div className="collapse-content px-0">
              <div className="space-y-3">
                <form className="flex flex-wrap gap-2">
                  <input
                    className={`btn btn-sm border border-yellow-400 checked:bg-white checked:text-black ${playfairDisplayRegular.className}`}
                    type="checkbox"
                    aria-label="M"
                  />
                  <input
                    className={`btn btn-sm border border-yellow-400 checked:bg-white checked:text-black ${playfairDisplayRegular.className}`}
                    type="checkbox"
                    aria-label="L"
                  />
                  <input
                    className={`btn btn-sm border border-yellow-400 checked:bg-white checked:text-black ${playfairDisplayRegular.className}`}
                    type="checkbox"
                    aria-label="XL"
                  />
                  <input
                    className={`btn btn-sm border border-yellow-400 checked:bg-white checked:text-black ${playfairDisplayRegular.className}`}
                    type="checkbox"
                    aria-label="XXL"
                  />
                  <input
                    className={`btn btn-sm border border-yellow-400 hover:bg-white active:bg-white hover:text-black active:text-black ${playfairDisplayRegular.className}`}
                    type="reset"
                    value="Delete"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
