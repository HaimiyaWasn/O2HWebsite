"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

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

  return null;
}
