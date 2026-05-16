import label from "daisyui/components/label";
import { NextResponse } from "next/server";

const baseProducts = [
  {
    title: "O2H Hostle Navy Half-Zip Jacket",
    price: "Rp. 550.000",
    label: [
      "Sale",
      "Jacket",
    ],
    image: "/img/products/O2H_Hostel_Navy_Half-Zip_Jacket/1.png",
    sold: "10RB+ Terjual",
    slug: "o2h-hostle-navy-half-zip-jacket",
  },
  {
    title: "O2H NFL Black Jersey",
    price: "Rp. 465.000",
    label : [
      "Sale",
      "Jersey",
    ],
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
    label: [
      "Sale",
      "Jersey",
    ],
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
    label: [
      "Sale",
      "Hats",
    ],
    image: "/img/products/O2H_MILF_Bucket_Hat/1.png",
    sold: "10RB+ Terjual",
    slug: "o2h-milf-bucket-hat",
  },
  {
    title: "O2H MILF Vest",
    price: "Rp. 165.000",
    label: [
      "Ada Stok",
      "Sale",
      "Jacket"
    ],
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
    label: [
      "Ada Stok",
      "Jersey",
    ],
    image: [
      "/img/products/O2H_NFL_Jersey_Vol.2_Black/1.png",
      "/img/products/O2H_NFL_Jersey_Vol.2_Black/2.png",
    ],
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
    image: product.image,
    sold: product.sold,
    slug: `${product.slug}`,
  };
});

export function GET() {
  return NextResponse.json(productData);
}