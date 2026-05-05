"use client"

import { FaSearch } from "react-icons/fa"; // Import ikon pencarian dari react-icons untuk digunakan di tombol pencarian
import { useState, useEffect } from "react"; // Import React Hooks useState dan useEffect untuk mengelola state input pencarian dan efek samping saat defaultSearch berubah
import { useRouter } from "next/navigation"; // Import useRouter dari Next.js untuk navigasi programatik ke halaman hasil pencarian setelah pengguna melakukan pencarian

export default function SearchStore({ defaultSearch = "" }: any) {
  const router = useRouter(); // Hook untuk navigasi programatik ke halaman lain
  const [inputValue, setinputValue] = useState(defaultSearch); // State untuk menyimpan nilai input pencarian, diinisialisasi dengan defaultSearch yang diterima sebagai prop, sehingga jika ada nilai default yang diberikan, input akan langsung terisi dengan nilai tersebut

  // Fungsi untuk menangani pencarian, membersihkan input, dan mengarahkan ke halaman hasil pencarian
  const handleSearch = () => {
    const clean = inputValue.trim().toLowerCase(); // Membersihkan input dengan menghapus spasi di awal dan akhir, serta mengubah ke huruf kecil untuk konsistensi pencarian

    if (!clean) return; // Jika input kosong setelah dibersihkan, jangan lakukan apa-apa

    router.push(`/stores/search?keyword=${encodeURIComponent(clean)}`); // Redirect ke halaman search dengan query parameter keyword yang sudah di-encode untuk menghindari masalah karakter khusus
  };

  // Fungsi untuk menangani event keydown pada input pencarian, jika tombol Enter ditekan maka akan memanggil fungsi handleSearch
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Jika tombol yang ditekan adalah "Enter", maka panggil fungsi handleSearch untuk melakukan pencarian
    if (e.key === "Enter") {
      handleSearch(); // Memanggil fungsi handleSearch untuk melakukan pencarian ketika tombol Enter ditekan
    }
  };

  // useEffect untuk memperbarui nilai input pencarian setiap kali defaultSearch berubah, sehingga input akan selalu sinkron dengan nilai default yang diberikan
  useEffect(() => {
    setinputValue(defaultSearch); // Memperbarui nilai input pencarian dengan defaultSearch setiap kali defaultSearch berubah, sehingga input akan selalu mencerminkan nilai default yang diberikan
  }, [defaultSearch]); // Menambahkan defaultSearch sebagai dependency untuk memastikan useEffect dijalankan setiap kali defaultSearch berubah

  return (
    <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      {/* Input Search */}
      <input
        type="text"
        placeholder="Telusuri..."
        value={inputValue}// Mengikat nilai input dengan state inputValue, sehingga setiap perubahan pada input akan memperbarui state dan sebaliknya, jika state berubah maka nilai input juga akan diperbarui
        onChange={(e) => setinputValue(e.target.value)} // Menangani perubahan pada input dengan memperbarui state inputValue setiap kali pengguna mengetik di dalam input, sehingga state selalu mencerminkan nilai terbaru dari input
        onKeyDown={handleKeyDown} // Menangani event keydown pada input, jika tombol Enter ditekan maka akan memanggil fungsi handleSearch untuk melakukan pencarian
        className=" input w-full rounded-l-full text-black bg-yellow-100 border border-yellow-500/30 focus:border-yellow-600 focus:outline-none"
      />
      {/* Button Search */}
      <button
        onClick={handleSearch} // Menangani klik pada tombol pencarian dengan memanggil fungsi handleSearch untuk melakukan pencarian
        className=" px-5 rounded-r-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 border border-yellow-500/30 transition"
      >
        <FaSearch size={20} />
      </button>
    </div>
  );
}
