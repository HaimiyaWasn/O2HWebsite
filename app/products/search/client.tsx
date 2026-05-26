"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProductsFilter from "../components/productsFilter";

export default function SearchFilterWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const productType = searchParams.get("type") || "Semua Produk";
  const stockStatus = searchParams.get("stock") || "Semua";
  const priceRange = searchParams.get("priceRange");
  const selectedSize = searchParams.get("size")?.split(",") ?? [];

  const updateFilter = (key: string, value: string | string[] | null) => {
    const params = new URLSearchParams();

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      } else {
        params.delete(key);
      }
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <ProductsFilter
      selectedCategory={selectedCategory}
      productType={productType}
      stockStatus={stockStatus}
      priceRange={priceRange}
      selectedSize={selectedSize}
      updateFilter={updateFilter}
    />
  );
}
