import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsBySlug } from "../data";

import DetailClient from "./detailClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const products = await getProductsBySlug(slug);

  if (!products) {
    return {
      title: "Products Not Found",
    };
  }

  return {
    title: `${products.title} | O2H Official Site`,
    description: `Price: ${products.price}, Sold: ${products.sold}`,
  };
}

export default async function ProductsDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const products = await getProductsBySlug(slug);

  if (!products) {
    notFound();
  }

  return <DetailClient products={products} />
}