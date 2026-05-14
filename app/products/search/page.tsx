import { headers } from "next/headers"; // Import headers dari Next.js untuk mendapatkan informasi header dari permintaan HTTP, yang akan digunakan untuk menentukan host saat melakukan fetch data produk dari API

import SearchProducts from "./searchClient"; // Import komponen SearchProducts yang akan menampilkan form pencarian dan hasil pencarian produk berdasarkan keyword yang dimasukkan oleh pengguna, dengan properti defaultSearch untuk mengisi nilai default pada form pencarian dengan keyword yang diambil dari parameter pencarian di URL
import Navbar from "@/app/components/NavbarO2H"; // Import komponen NavbarClient yang akan menampilkan bagian navigasi atas halaman, dengan tautan ke halaman utama, toko, berita, dan kontak, serta logo O2H yang mengarah ke halaman utama saat diklik
import FloatingLogo from "@/app/components/FloatingLogo"; // Import komponen FloatingLogo yang akan menampilkan logo O2H yang mengambang di sudut kanan bawah halaman, dengan efek rotasi saat pengguna menggulir halaman untuk memberikan tampilan yang dinamis dan menarik, serta tautan ke halaman utama saat logo diklik

import Image from "next/image"; // Import Image dari Next.js untuk optimasi gambar produk yang ditampilkan di hasil pencarian
import { Playfair_Display } from "next/font/google"; // Import font Playfair Display dengan varian bold dan regular untuk digunakan pada judul hasil pencarian, nama produk, harga, dan informasi penjualan di hasil pencarian

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
  image: string;
  sold: string;
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
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(keyword) //  Memeriksa apakah judul produk (p.title) yang sudah diubah menjadi huruf kecil mengandung keyword yang juga sudah diubah menjadi huruf kecil, sehingga pencarian tidak sensitif terhadap huruf kapital dan hanya produk yang relevan dengan keyword yang akan ditampilkan di hasil pencarian
  );

  return (
    <section>
      <title>Search | O2H Official Site</title>
      <Navbar />

      <div className="flex justify-center px-4 mt-20">
        <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <SearchProducts defaultSearch={keyword} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <h1 className={`text-lg my-7 ${playfairDisplayRegular.className}`}>
          Hasil pencarian: "<a className={`${playfairDisplayBold.className}`}>{keyword}</a>"
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <div
                key={product.id}
                className="flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer h-full"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="border-t border-yellow-400 my-3">
                  <p
                    className={`text-sm mt-2 line-clamp-2 text-black ${playfairDisplayBold.className}`}
                  >
                    {product.title}
                  </p>
                  <p className="text-yellow-500 mt-1 font-semibold">
                    {product.price}
                  </p>
                  <p className="text-xs text-gray-500">{product.sold}</p>
                </div>
              </div>
            ))
          ) : (
            <p
              className={`col-span-full flex justify-center items-center min-h-[60vh] text-2xl ${playfairDisplayBold.className}`}
            >
              Produk tidak ditemukan
            </p>
          )}
        </div>
      </div>
      <FloatingLogo />
    </section>
  );
}
