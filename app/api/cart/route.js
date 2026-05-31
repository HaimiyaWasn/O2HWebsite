import { NextResponse } from "next/server";

const baseCart = [
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
    discount: 0,
    createdAt: "2025-05-04",
    slug: "o2h-milf-vest",
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
]

export function GET() {
  const carts = baseCart.map((cart, index) => ({
    id: index + 1,
    ...cart,
  }));

  return NextResponse.json(carts)
}