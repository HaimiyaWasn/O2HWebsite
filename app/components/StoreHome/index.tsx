import Link from "next/link"; // Import Link dari Next.js untuk navigasi antar halaman
import { headers } from "next/headers"; // Import headers dari Next.js untuk mendapatkan informasi header dari permintaan HTTP, yang akan digunakan untuk menentukan host saat melakukan fetch data produk dari API
import { Playfair_Display } from "next/font/google"; // Import font Playfair Display dengan varian bold dan regular untuk digunakan pada judul "Store" dan tombol "View More"
import { FaArrowAltCircleRight } from "react-icons/fa"; // Import Icon dari React Icons untuk ikon panah kanan pada tombol "View More"
import HomeProductCard from "./cardClient"; // Import komponen HomeProductCard yang akan menampilkan kartu produk untuk setiap produk yang diambil dari API, dengan properti yang sesuai seperti id, title, price, image, dan sold

// Tipe untuk produk yang akan diambil dari API, dengan properti id, title, price, image, dan sold yang sesuai dengan data yang diharapkan dari API
type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
};

// Import font Playfair Display dengan varian bold dan regular untuk digunakan pada judul "Store" dan tombol "View More"
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

// Komponen HomeStorePageCard untuk menampilkan bagian toko di halaman utama, dengan judul "Store", tombol "View More" yang mengarah ke halaman toko, dan daftar produk yang diambil dari API dan ditampilkan menggunakan komponen HomeProductCard
export default async function HomeStorePageCard() {
  const headersList = await headers(); // Mendapatkan header dari permintaan HTTP untuk menentukan host saat melakukan fetch data produk dari API
  const host = headersList.get("host"); // Mendapatkan nilai host dari header yang diperoleh, yang akan digunakan untuk membangun URL saat melakukan fetch data produk dari API

  // Melakukan fetch data produk dari API menggunakan URL yang dibangun dengan host yang diperoleh dari header, serta mengatur cache menjadi "no-store" untuk memastikan data yang diambil selalu terbaru
  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store", // Mengatur cache menjadi "no-store" untuk memastikan data yang diambil selalu terbaru setiap kali halaman dimuat atau pengguna melakukan pencarian, sehingga daftar produk yang ditampilkan di bagian toko akan selalu mencerminkan data produk terbaru yang tersedia di API
  });

  // Jika respons dari API tidak berhasil (res.ok adalah false), maka akan melempar error dengan pesan "Failed to fetch products" untuk menangani kasus ketika data produk tidak dapat diambil dari API
  if (!res.ok) {
    throw new Error("Failed to fetch products"); // Melempar error dengan pesan "Failed to fetch products" jika respons dari API tidak berhasil, yang akan membantu dalam proses debugging dan memberikan informasi yang jelas tentang masalah yang terjadi saat mengambil data produk dari API untuk ditampilkan di bagian toko
  }

  const productsData: Product[] = await res.json(); // Mengambil data produk dari respons API dalam format JSON dan menyimpannya dalam variabel productsData, yang akan digunakan untuk menampilkan daftar produk di bagian toko
  const limitedRandomProducts = [...productsData].sort(() => Math.random() - 0.5).slice(0, 18); // Mengambil 18 produk secara acak dari data produk yang diambil dari API dengan menggunakan metode sort untuk mengacak urutan produk dan slice untuk mengambil 18 produk pertama dari array yang sudah diacak, dan menyimpannya dalam variabel limitedRandomProducts yang akan digunakan untuk menampilkan daftar produk di bagian toko

  return (
    // Section utama untuk bagian toko dengan padding vertikal
    <section className="py-10">
      {/* Container utama untuk bagian toko dengan lebar maksimum, margin otomatis untuk pusat, dan padding horizontal */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Header untuk bagian toko dengan judul "Store" dan tombol "View More" yang mengarah ke halaman toko, menggunakan flexbox untuk tata letak dan kelas CSS untuk styling */}
        <div className="flex items-center justify-between mb-10">
          {/* Judul Section dengan kelas CSS untuk ukuran teks, perataan, dan font yang digunakan */}
          <h1
            className={`text-3xl md:text-4xl text-center md:text-left font-bold ${playfairDisplayBold.className}`}
          >
            Store
          </h1>

          {/* Link ke halaman store */}
          <Link
            href="/stores"
            className={`flex items-center gap-2 text-sm md:text-base opacity-50 hover:opacity-100 transition leading-none ${playfairDisplayRegular.className}`}
          >
            View More
            <FaArrowAltCircleRight size={20} className="translate-y-px" />
          </Link>
        </div>
        {/* Grid untuk menampilkan daftar produk dengan tata letak responsif yang menyesuaikan jumlah kolom berdasarkan ukuran layar, serta gap antara item grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {/* Melakukan iterasi pada data produk yang diambil dari API (productsData) dan untuk setiap produk, akan menampilkan komponen HomeProductCard dengan properti yang sesuai seperti id, title, price, image, dan sold, serta memberikan key yang unik untuk setiap item dalam daftar agar React dapat mengelola rendering dengan efisien */}
          {limitedRandomProducts.map((product) => ( // Melakukan iterasi pada array limitedRandomProducts yang berisi produk-produk yang sudah diacak dan dibatasi jumlahnya, untuk menampilkan setiap produk menggunakan komponen HomeProductCard dengan properti yang sesuai seperti id, title, price, image, dan sold, serta memberikan key yang unik untuk setiap item dalam daftar berdasarkan id produk untuk membantu React dalam mengelola rendering dengan efisien
            <HomeProductCard
              key={product.id} // Memberikan key unik untuk setiap item dalam daftar produk berdasarkan id produk
              product={product} // Menyerahkan data produk sebagai properti ke komponen HomeProductCard untuk menampilkan informasi produk seperti title, price, image, dan sold
            />
          ))}
        </div>
      </div>
    </section>
  );
}
