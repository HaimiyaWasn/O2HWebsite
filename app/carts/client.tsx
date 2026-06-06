"use client"

import { useState } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

import RevealOnScroll from "../components/RevealOnScroll";

/**
 * Representasi satu produk yang berada di dalam keranjang
 * 
 * Dapat digunakan kembali untuk:
 * - Cart
 * - Checkout
 * - Wishlist
 * - Riwayat Pesanan
 * - POS System
 */
type CartItem = {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga asli sebelum diskon
  image: string[]; // Daftar gambar produk
  totalCart: number; // Jumlah produk yang dibeli
  size: string[]; // Daftar ukuran yang dipilih
  discount: number; // Persentase diskon (0 - 100)
};

/**
 * Props yang diterima oleh komponen CartClient
 * Berisi seluruh data keranjang dari server/page
 */
type CartClientProps = {
  carts: CartItem[];
};

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export default function CartClient({ carts }: CartClientProps) {
  /**
   * Menyimpan seluruh item yang ada di keranjang 
   * Setiap item otomatis diberi properti 'checked' untuk menandai apakah produk dipilih saaat checkout
   */
  const [cartItems, setCartItems] = useState(
    carts.map((item) => ({
      ...item,
      checked: true,
    }))
  );

  /**
   * Menambah quantity produk berdasarkan ID
   */
  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              totalCart: item.totalCart + 1,
            }
          : item
      )
    );
  };

  /**
   * Mengubah jumlah produk melalui input angka
   * Minimal jumlah produk adalah 1
   */
  const changeQty = (id: number, value: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              totalCart: Math.max(1, value),
            }
          : item
      )
    );
  };

  /**
   * Mengurangi jumlah produk
   * Tidak boleh kurang dari 1
   */
  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              totalCart: Math.max(1, item.totalCart - 1),
            }
          : item
      )
    );
  };

  /**
   * Menghapus produk dari keranjang berdasarkan ID produk
   */
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * Mengubah status centang produk tertentu
   */
  const toggleItem = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item
      )
    );
  };

  /**
   * Jika semua produk sudah dicentang,
   * maka akan menghilangkan semua centang
   * Jika belum, maka semua akan dicentang
   */
  const toggleAll = () => {
    const allChecked = cartItems.every((item) => item.checked);

    setCartItems((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !allChecked,
      }))
    );
  };

  /**
   * Hanya mengambil produk yang dicentang
   */
  const selectedItems = cartItems.filter((item) => item.checked);

  /**
   * Menghitung total jumlah barang yang dipilih
   */
  const totalItem = selectedItems.reduce(
    (acc, item) => acc + item.totalCart,
    0
  );

  /**
   * Menghitung total harga setelah diskon
   */
  const totalPrice = selectedItems.reduce((acc, item) => {
    const finalPrice = item.price - (item.price * item.discount) / 100;

    return acc + finalPrice * item.totalCart;
  }, 0);

  /**
   * Menghitung total uang yang dihemat dari diskon
   */
  const totalDiscount = selectedItems.reduce((acc, item) => {
    return acc + ((item.price * item.discount) / 100) * item.totalCart;
  }, 0);

  return (
    <>
      <title>Carts | O2H Official Site</title>

      <section className="pt-14 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <RevealOnScroll delay={0.3}>
              <div className="inline-flex items-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md">
                <span
                  className={`text-md md:text-2xl tracking-[0.2rem] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
                >
                  Keranjang Saya
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.5}>
            {cartItems.length > 0 && (
              <div className="mt-7 md:mt-0 flex items-center gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning checkbox-sm md:checkbox-md cursor-pointer"
                  checked={cartItems.every((item) => item.checked)}
                  onChange={toggleAll}
                />

                <span className="text-sm md:text-base">Pilih Semua</span>
              </div>
            )}
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.75}>
            <div className="mt-8 space-y-4 pb-32">
              {cartItems.length === 0 && (
                <div className="text-center py-20">
                  <h2
                    className={`text-2xl text-yellow-400 ${playfairDisplayBold.className}`}
                  >
                    Keranjang Kosong
                  </h2>

                  <p className="opacity-60 mt-3">
                    Belum ada produk di keranjang.
                  </p>
                </div>
              )}

              {cartItems.map((cart) => {
                const finalPrice =
                  cart.price - (cart.price * cart.discount) / 100;

                return (
                  <div
                    key={cart.id}
                    className="bg-base-200 rounded-2xl p-5 border border-yellow-400/30"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-warning mt-8"
                        checked={cart.checked}
                        onChange={() => toggleItem(cart.id)}
                      />

                      <div className="w-30 h-40 bg-white rounded-xl overflow-hidden shrink-0 mx-auto md:mx-0">
                        <Image
                          src={cart.image[0]}
                          alt={cart.title}
                          width={120}
                          height={160}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h2
                          className={`text-lg mb-2 ${playfairDisplayBold.className}`}
                        >
                          {cart.title}
                        </h2>

                        <p className="text-sm opacity-70">
                          Size: {cart.size.join(", ")}
                        </p>

                        <div className="badge badge-outline badge-warning mt-3">
                          Diskon Rp{" "}
                          {((cart.price * cart.discount) / 100).toLocaleString(
                            "id-ID"
                          )}
                        </div>

                        <div className="mt-4 flex justify-center md:justify-start">
                          <div className="flex items-center gap-2 rounded-full border border-yellow-400/30 bg-base-100 px-2 py-1">
                            <button
                              className="btn btn-circle btn-xs bg-yellow-400 text-black font-bold text-lg"
                              onClick={() => decreaseQty(cart.id)}
                            >
                              -
                            </button>
                            
                            {/* Input jumlah produk secara manual */}
                            <input
                              type="text"
                              inputMode="numeric"
                              value={cart.totalCart}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // Hanya mengizinkan angka

                                changeQty(
                                  cart.id,
                                  value === "" ? 1 : Number(value)
                                );
                              }}
                              className="w-12 bg-transparent text-center font-semibold outline-none [appearance:textfield]"
                            />

                            <button
                              className="btn btn-circle btn-xs btn-error bg-yellow-400 text-black font-bold text-lg"
                              onClick={() => increaseQty(cart.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 flex justify-center md:justify-start gap-5 text-sm flex-wrap">
                          <button className="hover:text-yellow-400 transition">
                            Pindahkan ke Wishlist
                          </button>

                          <button
                            className="text-red-500"
                            onClick={() => removeItem(cart.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>

                      <div className="text-center md:text-right border-t md:border-0 pt-4 md:pt-0 border-yellow-400/20">
                        <p className="text-sm line-through opacity-40">
                          Rp {cart.price.toLocaleString("id-ID")}
                        </p>

                        <p className="text-xl font-bold text-yellow-400">
                          Rp {finalPrice.toLocaleString("id-ID")}
                        </p>

                        <div className="mt-8">
                          <p className="text-xs opacity-50">Subtotal</p>

                          <p className="font-bold">
                            Rp{" "}
                            {(finalPrice * cart.totalCart).toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>

        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-yellow-400/20 backdrop-blur-md z-20">
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
              <div>
                <p className="text-sm opacity-60">{totalItem} barang dipilih</p>

                <p className="text-sm text-green-500">
                  Hemat Rp {totalDiscount.toLocaleString("id-ID")}
                </p>

                <h2 className="text-2xl font-bold text-yellow-400">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </h2>
              </div>

              <button className="btn btn-warning rounded-full px-10">
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
