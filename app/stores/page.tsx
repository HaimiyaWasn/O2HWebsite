import StoresClient from "./client";
import { getProducts } from "./data";

export default async function StoresPage() {
  const { products, totalPages, currentPage } = await getProducts(1);

  return (
    <StoresClient
      allProducts={products}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}