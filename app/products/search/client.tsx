"use client"

import { useState } from "react"
import ProductsFilter from "../components/productsFilter"

export default function SearchFilterWrapper() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productType, setProductType] = useState<string>("Semua Produk");
  const [stockStatus, setStockStatus] = useState<string>("Semua");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <ProductsFilter
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      productType={productType}
      setProductType={setProductType}
      stockStatus={stockStatus}
      setStockStatus={setStockStatus}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      selectedSize={selectedSize}
      setSelectedSize={setSelectedSize}
    />
  )
}