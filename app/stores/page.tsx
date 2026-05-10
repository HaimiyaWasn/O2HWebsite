import StoresClient from "./client";
import { getStores } from "./data";

export default async function StoresPage() {
  const { store, totalPages, currentPage } = await getStores(1);

  return (
    <StoresClient
      allStore={store}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}