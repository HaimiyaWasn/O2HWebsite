"use client";

import { usePathname } from "next/navigation";

export default function FooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/carts") {
    return null;
  }

  return <>{children}</>;
}