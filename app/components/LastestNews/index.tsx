import { headers } from "next/headers"; // Import headers dari Next.js untuk mendapatkan header dari permintaan HTTP, yang akan digunakan untuk menentukan host saat melakukan fetch data berita dari API
import LatestNewsClient from "./client"; // Import komponen LatestNewsClient yang akan menampilkan daftar berita terbaru dengan efek animasi saat muncul di viewport, dengan prop latestNews yang berisi array berita terbaru yang akan ditampilkan

// Tipe data untuk berita, yang mencakup id, tanggal, judul, dan slug (URL) berita, yang akan digunakan untuk mendefinisikan tipe data dari berita yang diambil dari API dan ditampilkan di komponen LatestNewsClient
type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
}

// Komponen LatestNews untuk mengambil data berita terbaru dari API dan menampilkan daftar berita tersebut menggunakan komponen LatestNewsClient, dengan efek animasi saat muncul di viewport
export default async function LatestNews() {
  const headersList = await headers(); // Mendapatkan header dari permintaan HTTP untuk menentukan host saat melakukan fetch data berita dari API, yang akan digunakan untuk membangun URL saat melakukan fetch data berita dari API
  const host = headersList.get("host"); // Mendapatkan nilai host dari header yang diperoleh, yang akan digunakan untuk membangun URL saat melakukan fetch data berita dari API, sehingga data berita yang diambil akan sesuai dengan host tempat aplikasi dijalankan (misalnya localhost atau domain produksi)

  // Melakukan fetch data berita dari API menggunakan URL yang dibangun dengan host yang diperoleh dari header, serta mengatur cache menjadi "no-store" untuk memastikan data yang diambil selalu terbaru
  const res = await fetch(`http://${host}/api/news`, {
    cache: "no-store", // Mengatur cache menjadi "no-store" untuk memastikan data yang diambil selalu terbaru setiap kali halaman dimuat atau pengguna melakukan pencarian, sehingga daftar berita yang ditampilkan akan selalu mencerminkan data berita terbaru yang tersedia di API
  });

  // Jika respons dari API tidak berhasil (res.ok adalah false), maka akan melempar error dengan pesan "Failed to fetch news" untuk menangani kasus ketika data berita tidak dapat diambil dari API
  if (!res.ok) {
    throw new Error("Failed to fetch news"); // Melempar error dengan pesan "Failed to fetch news" jika respons dari API tidak berhasil, yang akan membantu dalam proses debugging dan memberikan informasi yang jelas tentang masalah yang terjadi saat mengambil data berita dari API untuk ditampilkan di bagian berita terbaru
  }

  const newsData: News[] = await res.json(); // Mengambil data berita dari respons API dalam format JSON dan menyimpannya dalam variabel newsData, yang akan digunakan untuk menampilkan daftar berita di bagian berita terbaru

  const sortedNews = newsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // Mengurutkan berita berdasarkan tanggal terbaru dengan membandingkan tanggal berita a dan b, sehingga berita dengan tanggal terbaru akan muncul terlebih dahulu dalam daftar berita yang ditampilkan di bagian berita terbaru, memberikan pengalaman pengguna yang lebih baik dengan menampilkan informasi yang paling relevan dan terkini di bagian berita terbaru
  })

  const latestNews = newsData.slice(0, 6); // Mengambil 6 berita terbaru dari data berita yang diambil dari API dengan menggunakan metode slice untuk mengambil 6 berita pertama dari array newsData, dan menyimpannya dalam variabel latestNews yang akan digunakan untuk menampilkan daftar berita di bagian berita terbaru

  return <LatestNewsClient latestNews={latestNews} />; // Mengembalikan komponen LatestNewsClient dengan prop latestNews yang berisi array berita terbaru yang akan ditampilkan, sehingga daftar berita terbaru akan ditampilkan di bagian berita terbaru dengan efek animasi saat muncul di viewport
}