import getAllCarts from "./data";
import FloatingCartClient from "./client";

export default async function FloatingCart() {
  const carts = await getAllCarts();

  return <FloatingCartClient carts={carts} />;
}