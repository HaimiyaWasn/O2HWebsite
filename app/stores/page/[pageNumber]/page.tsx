import StoresClient from "../../client";
import { getProducts } from "../../data";
import { notFound } from "next/navigation";

type Props = {
  params: {
    pageNumber: string;
  };
};

export default async function PaginationPage({ params }: Props) {
  const currentPage = Number(params.pageNumber);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const { products, totalPages } = await getProducts(currentPage);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <StoresClient
      allProducts={products}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}