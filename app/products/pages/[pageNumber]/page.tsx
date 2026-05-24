import ProductsClient from "../../client";
import getAllProducts from "../../data";

type Props = {
  params: Promise<{
    pageNumber: string;
  }>;
};

export default async function PaginationPage({ params }: Props) {
  await params;

  const allProducts = await getAllProducts();

  return <ProductsClient allProducts={allProducts} />;
}
