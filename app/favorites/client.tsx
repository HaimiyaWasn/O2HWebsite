"use client"

import { useState, useEffect } from "react"

type ProductFavorite = {
  id: number;
  title: string;
  price: number;
  image: string[];
  isFavorite: boolean;
  slug: string;
}

export default function FavoriteContent() {
  const [favorites, setFavorites] = useState<ProductFavorite[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch("/api/products");
      const data: ProductFavorite[] = await res.json();

      setFavorites(data.filter((item) => item.isFavorite));
    }

    fetchProduct();
  }, []);

  return (
    <div className="grid gap-4">
      {favorites.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h2>{product.title}</h2>
          <p>Rp {product.price.toLocaleString("id-ID")}</p>
        </div>
      ))}

      {favorites.length === 0 && (
        <p>Belum ada produk favorit.</p>
      )}
    </div>
  )
}