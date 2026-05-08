"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll ke atas saat halaman berubah
export default function ScrollToTop() {
  // Ambil path saat ini
  const pathname = usePathname();

  // Efek untuk scroll ke atas saat path berubah
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch {
        window.scrollTo(0, 0);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Tidak merender apa pun, hanya efek scroll
  return null;
}
