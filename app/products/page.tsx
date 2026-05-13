import ProductsClient from "./client";
import { getProducts } from "./data";

export default async function ProductsPage() {
  const { products, totalPages, currentPage } = await getProducts(1);

  return (
    <ProductsClient
      allProducts={products}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}