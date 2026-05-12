import { NextResponse } from "next/server";

const productData = [
  {
    id: 1,
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket.jpg",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    id: 2,
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket.jpg",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    id: 3,
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket.jpg",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    id: 4,
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket.jpg",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    id: 5,
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket.jpg",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    id: 6,
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket.jpg",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    id: 7,
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    image: "/img/products/O2H_NFL_Black_Jersey.png",
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-black-jersey",
  },
  {
    id: 8,
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    image: "/img/products/O2H_NFL_Black_Jersey.png",
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-black-jersey",
  },
  {
    id: 9,
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    image: "/img/products/O2H_NFL_Black_Jersey.png",
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-black-jersey",
  },
  {
    id: 10,
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    image: "/img/products/O2H_NFL_Black_Jersey.png",
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-black-jersey",
  },
  {
    id: 11,
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    image: "/img/products/O2H_NFL_Black_Jersey.png",
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-black-jersey",
  },
  {
    id: 12,
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    image: "/img/products/O2H_NFL_Black_Jersey.png",
    sold: "10RB+ Terjual",
    slug: "o2h-nfl-black-jersey",
  },
  {
    id: 13,
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    id: 14,
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    id: 15,
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    id: 16,
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    id: 17,
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    id: 18,
    title: "O2H Hostel Embroidery Baseball Jersey Black",
    price: "Rp. 550.000",
    image: "/img/products/O2H_Hostel_Embroidery_Baseball_Jersey_Black.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostel-embroidery-baseball-jersey-black",
  },
  {
    id: 19,
    title: "O2H MILF Bucket Hat",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Bucket_Hat.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat"
  },
  {
    id: 20,
    title: "O2H MILF Bucket Hat",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Bucket_Hat.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat"
  },
  {
    id: 21,
    title: "O2H MILF Bucket Hat",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Bucket_Hat.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat"
  },
  {
    id: 22,
    title: "O2H MILF Bucket Hat",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Bucket_Hat.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat"
  },
  {
    id: 23,
    title: "O2H MILF Bucket Hat",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Bucket_Hat.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat"
  },
  {
    id: 24,
    title: "O2H MILF Bucket Hat",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Bucket_Hat.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat"
  },
  {
    id: 25,
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Vest.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-vest"
  },
  {
    id: 26,
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Vest.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-vest"
  },
  {
    id: 27,
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Vest.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-vest"
  },
  {
    id: 28,
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Vest.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-vest"
  },
  {
    id: 29,
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Vest.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-vest"
  },
  {
    id: 30,
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    image: "/img/products/O2H_MILF_Vest.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-vest"
  },
]

export function GET() {
  return NextResponse.json(productData);
}