import ProductsClient from "./client";
import getAllProducts from "./data";

export default async function ProductsPage() {
  const allProducts = await getAllProducts();

  return <ProductsClient allProducts={allProducts} />;
}
