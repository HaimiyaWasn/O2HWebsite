import label from "daisyui/components/label";
import { NextResponse } from "next/server";

const baseProducts = [
  {
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    label: ["Sale", "Jacket"],
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket/1.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    label: ["Sale", "Jersey"],
    image: [
      "/img/products/O2H_NFL_Black_Jersey/1.png",
      "/img/products/O2H_NFL_Black_Jersey/2.png",
    ],
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-black-jersey",
  },
  {
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: "Rp. 550.000",
    label: ["Sale", "Jersey"],
    image: [
      "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black/1.png",
      "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black/2.png",
    ],
    sold: "10RB+ Terjual",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    title: "O2H MILF Bucket Hat",
    price: "Rp. 165.000",
    label: ["Sale", "Hats"],
    image: "/img/products/O2H_MILF_Bucket_Hat/1.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat",
  },
  {
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    label: ["Ada Stok", "Sale", "Jacket"],
    image: [
      "/img/products/O2H_MILF_Vest/1.png",
      "/img/products/O2H_MILF_Vest/2.png",
    ],
    sold: "10RB+ Terjual",
    slug: "o2h-milf-vest",
  },
  {
    title: "O2H NFL Jersey Vol.2 Black",
    price: "Rp. 450.000",
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
      -Senin hingga Sabtu: pesanan sebelum 14.00 WIB dikirim hari yang sama
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
    `,
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-jersey-vol2-black",
  },
];

// Generate 100 products
const productData = Array.from({ length: 150 }, (_, index) => {
  const product = baseProducts[index % baseProducts.length];

  return {
    id: index + 1,
    title: `${product.title}`,
    price: product.price,
    label: product.label,
    image: product.image,
    deskripsi: product.deskripsi || "",
    sold: product.sold,
    slug: `${product.slug}`,
  };
});

export function GET() {
  return NextResponse.json(productData);
}
