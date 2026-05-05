import { headers } from "next/headers"; // Import headers dari Next.js untuk mendapatkan informasi header dari permintaan HTTP, yang akan digunakan untuk menentukan host saat melakukan fetch data produk dari API
import AnimationClient from "./animationClient";

// Tipe untuk produk yang akan diambil dari API, dengan properti id, title, price, image, dan sold yang sesuai dengan data yang diharapkan dari API
type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
};

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
  const limitedRandomProducts = [...productsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 18);

  return <AnimationClient products={limitedRandomProducts} />;
}
