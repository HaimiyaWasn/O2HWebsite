"use client"

import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchProducts({ defaultSearch = "" }: any) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(defaultSearch);

  const handleSearch = () => {
    const clean = inputValue.trim().toLowerCase();

    if (!clean) {
      router.push("/products");
      return;
    };

    router.push(`/products/search?keyword=${encodeURIComponent(clean)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setInputValue(defaultSearch);
  }, [defaultSearch]);

  return (
    <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <input
        type="text"
        placeholder="Telusuri..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className=" input w-full rounded-l-full text-black bg-yellow-100 border border-yellow-500/30 focus:border-yellow-600 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className=" px-5 rounded-r-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 border border-yellow-500/30 transition"
      >
        <FaSearch size={20} />
      </button>
    </div>
  );
}
