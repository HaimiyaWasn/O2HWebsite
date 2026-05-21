import { headers } from "next/headers"; // Import headers dari Next.js untuk mendapatkan informasi header dari permintaan HTTP, yang akan digunakan untuk menentukan host saat melakukan fetch data produk dari API

import SearchProducts from "./searchClient"; // Import komponen SearchProducts yang akan menampilkan form pencarian dan hasil pencarian produk berdasarkan keyword yang dimasukkan oleh pengguna, dengan properti defaultSearch untuk mengisi nilai default pada form pencarian dengan keyword yang diambil dari parameter pencarian di URL
import Navbar from "@/app/components/NavbarO2H"; // Import komponen NavbarClient yang akan menampilkan bagian navigasi atas halaman, dengan tautan ke halaman utama, toko, berita, dan kontak, serta logo O2H yang mengarah ke halaman utama saat diklik
import FloatingLogo from "@/app/components/FloatingLogo"; // Import komponen FloatingLogo yang akan menampilkan logo O2H yang mengambang di sudut kanan bawah halaman, dengan efek rotasi saat pengguna menggulir halaman untuk memberikan tampilan yang dinamis dan menarik, serta tautan ke halaman utama saat logo diklik

import Image from "next/image"; // Import Image dari Next.js untuk optimasi gambar produk yang ditampilkan di hasil pencarian
import { Playfair_Display } from "next/font/google"; // Import font Playfair Display dengan varian bold dan regular untuk digunakan pada judul hasil pencarian, nama produk, harga, dan informasi penjualan di hasil pencarian
import RevealOnScroll from "@/app/components/RevealOnScroll";
import ProductsFilter from "../components/productsFilter";
import Link from "next/link";
import Footer from "@/app/components/Footer";

// Import font Playfair Display dengan varian bold dan regular untuk digunakan pada judul hasil pencarian, nama produk, harga, dan informasi penjualan di hasil pencarian
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

// Tipe untuk produk yang akan diambil dari API, dengan properti id, title, price, image, dan sold yang sesuai dengan data yang diharapkan dari API
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

  // const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Melakukan fetch data produk dari API menggunakan URL yang dibangun dengan host yang diperoleh dari header, serta mengatur cache menjadi "no-store" untuk memastikan data yang diambil selalu terbaru
  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store", // Mengatur cache menjadi "no-store" untuk memastikan data yang diambil selalu terbaru setiap kali halaman dimuat atau pengguna melakukan pencarian, sehingga hasil pencarian akan selalu mencerminkan data produk terbaru yang tersedia di API
  });

  // Jika respons dari API tidak berhasil (res.ok adalah false), maka akan melempar error dengan pesan "Failed to fetch products" untuk menangani kasus ketika data produk tidak dapat diambil dari API, sehingga pengguna akan mendapatkan informasi yang jelas jika terjadi masalah saat mengambil data produk
  if (!res.ok) {
    throw new Error("Failed to fetch products"); // Melempar error dengan pesan "Failed to fetch products" jika respons dari API tidak berhasil, yang akan membantu dalam proses debugging dan memberikan informasi yang jelas tentang masalah yang terjadi saat mengambil data produk dari API
  }

  return res.json(); // Mengambil data produk dari respons API dalam format JSON dan mengembalikannya sebagai hasil dari fungsi getProducts, yang akan digunakan untuk menampilkan daftar produk di hasil pencarian berdasarkan keyword yang dimasukkan oleh pengguna
}

// Komponen SearchPage untuk menampilkan halaman hasil pencarian produk berdasarkan keyword yang dimasukkan oleh pengguna, dengan judul hasil pencarian yang menampilkan keyword yang dicari, daftar produk yang difilter berdasarkan keyword, dan tampilan yang responsif untuk berbagai ukuran layar
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>; // Tipe untuk properti searchParams yang merupakan Promise yang akan menghasilkan objek dengan properti keyword yang bersifat opsional, yang akan digunakan untuk mengambil nilai keyword dari parameter pencarian di URL dan menampilkan hasil pencarian berdasarkan keyword tersebut
}) {
  const params = await searchParams; // Menunggu Promise searchParams untuk diselesaikan dan menyimpan hasilnya dalam variabel params, yang akan digunakan untuk mengambil nilai keyword dari parameter pencarian di URL dan menampilkan hasil pencarian berdasarkan keyword tersebut
  const keyword = params.keyword?.toLowerCase() || ""; // Mengambil nilai keyword dari params, mengubahnya menjadi huruf kecil dengan toLowerCase() untuk memastikan pencarian tidak sensitif terhadap huruf kapital, dan memberikan nilai default berupa string kosong jika keyword tidak tersedia, yang akan digunakan untuk memfilter produk berdasarkan keyword yang dimasukkan oleh pengguna di hasil pencarian

  const products = await getProducts(); // Menunggu fungsi getProducts untuk diselesaikan dan menyimpan hasilnya dalam variabel products, yang akan digunakan untuk menampilkan daftar produk di hasil pencarian berdasarkan keyword yang dimasukkan oleh pengguna

  // Memfilter produk berdasarkan keyword yang dimasukkan oleh pengguna dengan menggunakan metode filter untuk memeriksa apakah judul produk (p.title) mengandung keyword yang sudah diubah menjadi huruf kecil, sehingga hanya produk yang relevan dengan keyword yang akan ditampilkan di hasil pencarian
  const filtered = products.filter(
    (p) => p.title.toLowerCase().includes(keyword) //  Memeriksa apakah judul produk (p.title) yang sudah diubah menjadi huruf kecil mengandung keyword yang juga sudah diubah menjadi huruf kecil, sehingga pencarian tidak sensitif terhadap huruf kapital dan hanya produk yang relevan dengan keyword yang akan ditampilkan di hasil pencarian
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
              <ProductsFilter />
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
                    {filtered.map((product) => {
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
            </div>
          </div>
        </div>
        <FloatingLogo />
        <Footer variant="yellow" />
      </section>
    </>
  );
}
