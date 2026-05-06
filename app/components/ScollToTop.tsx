"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // delay kecil biar transisi halaman lebih natural
    const timeout = setTimeout(() => {
      try {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch {
        // fallback kalau smooth tidak didukung
        window.scrollTo(0, 0);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}