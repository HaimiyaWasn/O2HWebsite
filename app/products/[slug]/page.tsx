import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getAllProducts, { getProductsBySlug } from "../data";

import DetailClient from "./detailClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const products = await getProductsBySlug(slug);

  if (!products) {
    return {
      title: "Products Not Found",
    };
  }

  return {
    title: `${products.title}`,
    description: `Price: ${products.price}, Sold: ${products.sold}`,
  };
}

export default async function ProductsDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductsBySlug(slug);

  const products = await getAllProducts();

  if (!product) {
    notFound();
  }

  return <DetailClient product={product} products={products} />;
}
