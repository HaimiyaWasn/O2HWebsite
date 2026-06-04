import CartClient from "./client";
import getAllCarts from "./data";

export default async function CartPage() {
  const carts = await getAllCarts();

  return <CartClient carts={carts} />;
}