"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { FaRegHeart } from "react-icons/fa";

import Navbar from "@/app/components/NavbarO2H";
import Footer from "@/app/components/Footer";
import FloatingLogo from "@/app/components/FloatingLogo";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import ProductDescriptionModal from "../components/productDescriptionModal";
import ProductImageSlider from "../components/productImageSlider";
import ProductCardRekomendasi from "../components/productCardRekomendasi";

type Products = {
  id: number;
  title: string;
  price: string;
  label: string[];
  image: string | string[];
  deskripsi: string;
  sold: string;
  slug: string;
};

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

type DetailClientProps = {
  product: Products;
  products: Products[];
}

export default function DetailClient({ 
  product,
  products,
}: DetailClientProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const shortDescription =
    product.deskripsi.length > 275
      ? product.deskripsi.slice(0, 275) + "..."
      : product.deskripsi;

  return (
    <>
      <Navbar />

      <section className="min-h-screen py-12 pt-28 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <RevealOnScroll delay={300}>
              <ProductImageSlider
                imageProduct={
                  Array.isArray(product.image) ? product.image : [product.image]
                }
                titleProduct={product.title}
              />
            </RevealOnScroll>

            <RevealOnScroll delay={500}>
              <div className="flex flex-col mb-5 md:mb-7">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.label.map((item, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-xs md:text-sm rounded-md bg-yellow-400 text-black border border-white ${playfairDisplayBold.className}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <span
                  className={`text-xl md:text-3xl mb-3 ${playfairDisplayBold.className}`}
                >
                  {product.title}
                </span>

                <div className="flex flex-row gap-3 items-center justify-between mb-2">
                  <span
                    className={`text-lg md:text-xl text-yellow-400 ${playfairDisplayBold.className}`}
                  >
                    {product.price}
                  </span>
                  <button className="btn btn-sm rounded-xl hover:bg-yellow-400 active:bg-yellow-400 hover:text-black active:text-black text-yellow-400 transition-all duration-300">
                    <FaRegHeart size={16} />
                  </button>
                </div>

                <span className="text-sm opacity-65 mb-7">{product.sold}</span>

                <div className="mb-7">
                  <button
                    className={`btn btn-lg w-full bg-yellow-400 text-black rounded-xl border border-white hover:bg-yellow-500 active:bg-yellow-500 ${playfairDisplayBold.className}`}
                  >
                    Tambah ke Keranjang
                  </button>
                </div>

                <div className="bg-base-200 rounded-2xl p-5 border border-yellow-300">
                  <span
                    className={`block text-lg mb-4 text-yellow-400 ${playfairDisplayBold.className}`}
                  >
                    Product Description
                  </span>
                  <p
                    className={`whitespace-pre-line leading-7 text-sm md:text-base opacity-90 ${playfairDisplayRegular.className}`}
                  >
                    {shortDescription}
                  </p>

                  {product.deskripsi.length > 275 && (
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="mt-4 text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-sm font-semibold"
                    >
                      Baca Selengkapnya
                    </button>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={300}>
            <ProductCardRekomendasi product={products} currentProductId={product.id} />
          </RevealOnScroll>
        </div>
      </section>

      <ProductDescriptionModal
        openDescription={showFullDescription}
        closeDescription={() => setShowFullDescription(false)}
        description={product.deskripsi}
      />
      <FloatingLogo />
      <Footer />
    </>
  );
}
