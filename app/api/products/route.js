import { NextResponse } from "next/server";

const baseProducts = [
  {
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: 550000,
    label: ["Sale", "Jacket"],
    image: [
      "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket/1.png"
    ],
    deskripsi: `
Long sleeve

Sizing Measurement tshirt :
(Length x Width)
Size 1: 65cm X 58cm
Size 2: 67cm x 60cm
Size 3: 69cm x 62cm
(toleransi size 1-2cm)

Material:
Cotton Combed 20s Supersoft
Sablon

Wajib Dibaca!
Membeli = Setuju.

Wajib Melakukan Video Unboxing Barang Untuk Memastikan Apabila Produk Kami Cacat Atau Ada Kesalahan Pengiriman
Cara Order Barang
- Barang Yang Kami Kirimkan Hanya Yang Kaka Order Sesuai Dari Sistem Bukan Melalui Notes Catatan Atau Chat.
- Pastikan No Handphone Dan Alamat Sudah Sesuai, Agar Barang Bisa Sampai Ke Tempat Kaka Tanpa Ada Masalah.

Pembatalan Barang 
- Apabila Ada Pergantian Warna Atau Ukuran, Mohon Ajukan Batal Apabila Tidak Akan Tetap Dikirimkan Sesuai Pesanan KakaDan Tidak Berlaku Bila No Resi Proses Sudah Keluar.

Ketersediaan Barang :
- Selama size dan warna bisa dipilih berarti barang ready dan siap kirim.- Apabila barang ternyata kosong, akan kami infokan secepatnya

Jadwal Pengiriman:
- Senin s/d Jumat Maksimal transaksi pukul 15.00 WIB. Lebih dari itu masuk proses kirim besok
- Estimasi tiba Pengiriman Barang Tergantung Ekspedisi Dan Tanggung Jawab Ekspedisi

Keluhan Barang :
- Bintang 1 Tidak Akan Menyelesaikan Masalah, Apabila Ada Produk Kami Yang Bermasalah, Salah Kirim Atau CacatMohon Diinfokan Kepada Kami Langsung Via Chat Dengan Bukti Yang Ada.

Penukaran Barang :
- Tidak menerima penukaran barang, terkecuali dari kita memang ada barang cacat atau kesalahan kirim Return / Komplain Produk. Kalau ada produk atau orderan terjadi kendala seperti halnya:
Produk cacat
Produk kurang lengkap
Produk tidak sesuai deskripsi

Salah kirim produk (termasuk salah size)bisa ditanyakan terlebih dahulu via personal chat toko dan juga SERTAKAN bukti video unboxing dan foto saat barang diterima dari kurir. Jikalau 2 syarat ini tidak terpenuhi kita ga bisa proses apapun yang terjadi. Jadi di mohon dengan sangat untuk di simak yah!!.
    `.trim(),
    sold: "10RB+ Terjual",
    size: ["M", "L"],
    discount: 30,
    createdAt: "2025-02-13",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    title: "O2H NFL Black Jersey",
    price: 465000,
    label: ["Sale", "Jersey"],
    image: [
      "/img/products/O2H_NFL_Black_Jersey/1.png",
      "/img/products/O2H_NFL_Black_Jersey/2.png",
    ],
    deskripsi: `
Sizing Measurement
(Panjang x Lebar)

Size I: 70cm x 52cm
Size II: 72cm x 54cm
Size III: 74cm x 56cm

Material:
Mesh
Microfabric
Bordir

Wajib Dibaca! Membeli = Setuju.

Wajib Melakukan Video Unboxing Barang Untuk Memastikan Apabila Produk Kami Cacat Atau Ada Kesalahan Pengiriman

Cara Order Barang :
- Barang Yang Kami Kirimkan Hanya Yang Kaka Order Sesuai Dari Sistem Bukan Melalui Notes Catatan Atau Chat.
- Pastikan No Handphone Dan Alamat Sudah Sesuai, Agar Barang Bisa Sampai Ke Tempat Kaka Tanpa Ada Masalah.

Pembatalan Barang :
- Apabila Ada Pergantian Warna Atau Ukuran, Mohon Ajukan Batal Apabila Tidak Akan Tetap Dikirimkan Sesuai Pesanan Kaka
Dan Tidak Berlaku Bila No Resi Proses Sudah Keluar.

Ketersediaan Barang :
- Selama size dan warna bisa dipilih berarti barang ready dan siap kirim.
- Apabila barang ternyata kosong, akan kami infokan secepatnya

Jadwal Pengiriman:
- Senin s/d Jumat Maksimal transaksi pukul 15.00 WIB. Lebih dari itu masuk proses kirim besok
- Sabtu & Minggu atau Tanggal merah: Off Service (Admin dan Pengiriman libur)
- Estimasi tiba Pengiriman Barang Tergantung Ekspedisi Dan Tanggung Jawab Ekspedisi

Keluhan Barang :
- Bintang 1 Tidak Akan Menyelesaikan Masalah, Apabila Ada Produk Kami Yang Bermasalah, Salah Kirim Atau Cacat
Mohon Diinfokan Kepada Kami Langsung Via Chat Dengan Bukti Yang Ada.

Penukaran Barang :
- Tidak menerima penukaran barang, terkecuali dari kita memang ada barang cacat atau kesalahan kirim

Return / Komplain Produk

Kalau ada produk atau orderan terjadi kendala seperti halnya:
Produk cacat
Produk kurang lengkap
Produk tidak sesuai deskripsi
Salah kirim produk (termasuk salah size)
    `.trim(),
    sold: "8RB+ Terjual",
    size: ["M", "L", "XL"],
    discount: 40,
    createdAt: "2025-04-17",
    slug: "o2h-nfl-black-jersey",
  },
  {
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: 550000,
    label: ["Sale", "Jersey"],
    image: [
      "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black/1.png",
      "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black/2.png",
    ],
    deskripsi: `
Sizing Measurement
(Panjang x Lebar)

Size I: 72cm x 58cm
Size II: 74cm x 60cm
Size III: 76cm x 62cm

Material:
Adidas 180gsm
Full Bordir Patch

Wajib Dibaca! Membeli = Setuju.

Wajib Melakukan Video Unboxing Barang Untuk Memastikan Apabila Produk Kami Cacat Atau Ada Kesalahan Pengiriman

Cara Order Barang :
- Barang Yang Kami Kirimkan Hanya Yang Kaka Order Sesuai Dari Sistem Bukan Melalui Notes Catatan Atau Chat.
- Pastikan No Handphone Dan Alamat Sudah Sesuai, Agar Barang Bisa Sampai Ke Tempat Kaka Tanpa Ada Masalah.

Pembatalan Barang :
- Apabila Ada Pergantian Warna Atau Ukuran, Mohon Ajukan Batal Apabila Tidak Akan Tetap Dikirimkan Sesuai Pesanan Kaka
Dan Tidak Berlaku Bila No Resi Proses Sudah Keluar.

Ketersediaan Barang :
- Selama size dan warna bisa dipilih berarti barang ready dan siap kirim.
- Apabila barang ternyata kosong, akan kami infokan secepatnya

Jadwal Pengiriman:
- Senin s/d Jumat Maksimal transaksi pukul 15.00 WIB. Lebih dari itu masuk proses kirim besok
- Sabtu & Minggu atau Tanggal merah: Off Service (Admin dan Pengiriman libur)
- Estimasi tiba Pengiriman Barang Tergantung Ekspedisi Dan Tanggung Jawab Ekspedisi

Keluhan Barang :
- Bintang 1 Tidak Akan Menyelesaikan Masalah, Apabila Ada Produk Kami Yang Bermasalah, Salah Kirim Atau Cacat
Mohon Diinfokan Kepada Kami Langsung Via Chat Dengan Bukti Yang Ada.

Penukaran Barang :
- Tidak menerima penukaran barang, terkecuali dari kita memang ada barang cacat atau kesalahan kirim
Return / Komplain Produk

Kalau ada produk atau orderan terjadi kendala seperti halnya:
Produk cacat
Produk kurang lengkap
Produk tidak sesuai deskripsi
Salah kirim produk (termasuk salah size)

Bisa ditanyakan terlebih dahulu via personal chat toko dan juga SERTAKAN bukti video unboxing dan foto saat barang diterima dari kurir. Jikalau 2 syarat ini tidak terpenuhi kita ga bisa proses apapun yang terjadi. Jadi di mohon dengan sangat untuk di simak yah!!.
    `.trim(),
    sold: "4RB+ Terjual",
    size: ["L", "XL", "XXL"],
    discount: 35,
    createdAt: "2025-09-12",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    title: "O2H MILF Bucket Hat",
    price: 205000,
    label: ["Sale", "Hats"],
    image: [
      "/img/products/O2H_MILF_Bucket_Hat/1.png"
    ],
    deskripsi: `
Sizing Measurement:
All size

Material:
Baby Canvas

Wajib Dibaca! Membeli = Setuju.

Wajib Melakukan Video Unboxing Barang Untuk Memastikan Apabila Produk Kami Cacat Atau Ada Kesalahan Pengiriman

Cara Order Barang :
- Barang Yang Kami Kirimkan Hanya Yang Kaka Order Sesuai Dari Sistem Bukan Melalui Notes Catatan Atau Chat.
- Pastikan No Handphone Dan Alamat Sudah Sesuai, Agar Barang Bisa Sampai Ke Tempat Kaka Tanpa Ada Masalah.

Pembatalan Barang :
- Apabila Ada Pergantian Warna Atau Ukuran, Mohon Ajukan Batal Apabila Tidak Akan Tetap Dikirimkan Sesuai Pesanan Kaka
Dan Tidak Berlaku Bila No Resi Proses Sudah Keluar.

Ketersediaan Barang :
- Selama size dan warna bisa dipilih berarti barang ready dan siap kirim.
- Apabila barang ternyata kosong, akan kami infokan secepatnya

Jadwal Pengiriman:
- Senin s/d Jumat Maksimal transaksi pukul 15.00 WIB. Lebih dari itu masuk proses kirim besok
- Sabtu & Minggu atau Tanggal merah: Off Service (Admin dan Pengiriman libur)
- Estimasi tiba Pengiriman Barang Tergantung Ekspedisi Dan Tanggung Jawab Ekspedisi

Keluhan Barang :
- Bintang 1 Tidak Akan Menyelesaikan Masalah, Apabila Ada Produk Kami Yang Bermasalah, Salah Kirim Atau Cacat
Mohon Diinfokan Kepada Kami Langsung Via Chat Dengan Bukti Yang Ada.

Penukaran Barang :
- Tidak menerima penukaran barang, terkecuali dari kita memang ada barang cacat atau kesalahan kirim
Return / Komplain Produk
Kalau ada produk atau orderan terjadi kendala seperti halnya:
Produk cacat
Produk kurang lengkap
Produk tidak sesuai deskripsi
Salah kirim produk (termasuk salah size)

Bisa ditanyakan terlebih dahulu via personal chat toko dan juga SERTAKAN bukti video unboxing dan foto saat barang diterima dari kurir. Jikalau 2 syarat ini tidak terpenuhi kita ga bisa proses apapun yang terjadi. Jadi di mohon dengan sangat untuk di simak yah!!.    
    `.trim(),
    sold: "7RB+ Terjual",
    size: ["M"],
    discount: 20,
    createdAt: "2025-06-16",
    slug: "o2h-milf-bucket-hat",
  },
  {
    title: "O2H MILF Vest",
    price: 205000,
    label: ["Ada Stok", "Sale", "Jacket"],
    image: [
      "/img/products/O2H_MILF_Vest/1.png",
      "/img/products/O2H_MILF_Vest/2.png",
    ],
    deskripsi: `
Sizing measurement vest
Panjang x lebar

Size 1: 65cm x 55cm
Size 2: 67cm x 58cm
Size 3: 69cm x 61cm

Material:
Ripstop

Wajib Dibaca! Membeli = Setuju.

Wajib Melakukan Video Unboxing Barang Untuk Memastikan Apabila Produk Kami Cacat Atau Ada Kesalahan Pengiriman

Cara Order Barang :
- Barang Yang Kami Kirimkan Hanya Yang Kaka Order Sesuai Dari Sistem Bukan Melalui Notes Catatan Atau Chat.
- Pastikan No Handphone Dan Alamat Sudah Sesuai, Agar Barang Bisa Sampai Ke Tempat Kaka Tanpa Ada Masalah.

Pembatalan Barang :
- Apabila Ada Pergantian Warna Atau Ukuran, Mohon Ajukan Batal Apabila Tidak Akan Tetap Dikirimkan Sesuai Pesanan Kaka
Dan Tidak Berlaku Bila No Resi Proses Sudah Keluar.

Ketersediaan Barang :
- Selama size dan warna bisa dipilih berarti barang ready dan siap kirim.
- Apabila barang ternyata kosong, akan kami infokan secepatnya

Jadwal Pengiriman:
- Senin s/d Jumat Maksimal transaksi pukul 15.00 WIB. Lebih dari itu masuk proses kirim besok
- Sabtu & Minggu atau Tanggal merah: Off Service (Admin dan Pengiriman libur)
- Estimasi tiba Pengiriman Barang Tergantung Ekspedisi Dan Tanggung Jawab Ekspedisi

Keluhan Barang :
- Bintang 1 Tidak Akan Menyelesaikan Masalah, Apabila Ada Produk Kami Yang Bermasalah, Salah Kirim Atau Cacat
Mohon Diinfokan Kepada Kami Langsung Via Chat Dengan Bukti Yang Ada.

Penukaran Barang :
- Tidak menerima penukaran barang, terkecuali dari kita memang ada barang cacat atau kesalahan kirim
Return / Komplain Produk
Kalau ada produk atau orderan terjadi kendala seperti halnya:
Produk cacat
Produk kurang lengkap
Produk tidak sesuai deskripsi
Salah kirim produk (termasuk salah size)

Bisa ditanyakan terlebih dahulu via personal chat toko dan juga SERTAKAN bukti video unboxing dan foto saat barang diterima dari kurir. Jikalau 2 syarat ini tidak terpenuhi kita ga bisa proses apapun yang terjadi. Jadi di mohon dengan sangat untuk di simak yah!!.
    `.trim(),
    sold: "5RB+ Terjual",
    size: ["M", "L", "XL"],
    discount: 20,
    createdAt: "2025-05-04",
    slug: "o2h-milf-vest",
  },
  {
    title: "O2H NFL Jersey Vol.2 Black",
    price: 450000,
    label: ["Ada Stok", "Jersey"],
    image: [
      "/img/products/O2H_NFL_Jersey_Vol.2_Black/1.png",
      "/img/products/O2H_NFL_Jersey_Vol.2_Black/2.png",
    ],
    deskripsi: `
Sizing Measurement

(Panjang x Lebar)
Size I: 68cm x 54cm
Size II: 70cm x 56cm
Size III: 72cm x 58cm

Material:
Polyester
Mesh Jersey
Rubber Patch
Embroidery

Wajib Dibaca! Membeli = Setuju

Ketentuan Umum
-Dengan membeli, pembeli dianggap setuju dengan semua ketentuan
-Wajib melakukan video unboxing dan foto sebagai bukti
-Tanpa bukti, komplain/garansi tidak dapat diproses

Cara Order
-Barang dikirim sesuai pesanan di sistem (bukan catatan/chat)
-Pastikan alamat dan nomor HP sudah benar
-Produk pre-order diproses ±30 hari setelah pemesanan
-Produk ready stock dikirim di hari yang sama (sesuai jadwal pengiriman)

Pembatalan Pesanan
-Tidak menerima pembatalan dengan alasan apapun
-Mohon pastikan pesanan sudah benar sebelum checkout
-Disarankan untuk bertanya ke CS terlebih dahulu sebelum membeli

Ketersediaan Barang
-Jika varian bisa dipilih berarti barang ready
-Jika stok kosong akan diinformasikan secepatnya

Jadwal Pengiriman
-Pengiriman setiap hari
-Senin s/d Sabtu: pesanan sebelum 14.00 WIB dikirim hari yang sama
-Minggu: pesanan sebelum 13.00 WIB dikirim hari yang sama
-Hari libur nasional tidak ada pengiriman
-Estimasi tiba tergantung ekspedisi

Keluhan Produk
-Memberikan bintang 1 tidak menyelesaikan masalah
-Silakan hubungi kami via chat dengan bukti yang ada

Penukaran dan Retur
-Tidak menerima penukaran barang
-Kecuali barang cacat atau salah kirim

Komplain Produk
Jika terjadi kendala seperti:
-Barang cacat
-Barang kurang lengkap
-Tidak sesuai deskripsi
-Salah kirim atau salah size

Silakan hubungi via chat dengan melampirkan video unboxing dan foto saat barang diterima. Tanpa kedua bukti tersebut, komplain tidak dapat diproses.
    `.trim(),
    sold: "2RB+ Terjual",
    size: ["M", "L", "XL", "XXL"],
    discount: 25,
    createdAt: "2025-04-11",
    slug: "o2h-nfl-jersey-vol2-black",
  },
];

export function GET() {
  const products = baseProducts.map((product, index) => ({
    id: index + 1,
    ...product,
  }));

  return NextResponse.json(products);
}