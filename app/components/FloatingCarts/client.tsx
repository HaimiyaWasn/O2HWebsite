"use client";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import type { CartItem } from "./data";

interface Props {
  carts: CartItem[];
}

export default function FloatingCartClient({ carts }: Props) {
  const totalItem = carts.reduce((total, item) => total + item.totalCart, 0);

  const totalPrice = carts.reduce((total, item) => {
    const finalPrice =
      item.discount > 0
        ? item.price - (item.price * item.discount) / 100
        : item.price;

    return total + finalPrice * item.totalCart;
  }, 0);

  if (!carts.length || totalItem === 0) return null;

  const firstItem = carts[0];

  return (
    <>
      <Link href="/carts" className="md:hidden fixed bottom-4 right-4 z-20">
        <div className="relative w-14 h-14 bg-yellow-400 text-black rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300">
          <FaShoppingCart size={24} />
          {totalItem > 0 && (
            <div className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItem}
            </div>
          )}
        </div>
      </Link>
      <Link
        href="/carts"
        className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-1rem)] max-w-xl p-2 md:p-3"
      >
        <div className="bg-white rounded-2xl shadow-xl border-4 border-yellow-400 px-2 py-2 md:px-3 md:py-3 flex items-center justify-between gap-2 md:gap-3 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <Image
                src={firstItem.image[0]}
                alt={firstItem.title}
                width={48}
                height={48}
                className="rounded object-cover md:w-14 md:h-14"
              />
              {totalItem > 1 && (
                <div className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItem}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-black">
                {totalItem} Barang di keranjang saya
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {firstItem.title}
              </p>
              <p className="text-sm font-bold text-yellow-400 mt-1">
                Rp {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div className="shrink-0 w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center">
            <FaShoppingCart size={20} />
          </div>
        </div>
      </Link>
    </>
  );
}
