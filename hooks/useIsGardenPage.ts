"use client";

import { usePathname } from "next/navigation";

export function useIsGardenPage(): boolean {
  const pathname = usePathname();
  return (
    pathname.startsWith("/garden/") && !pathname.startsWith("/garden/book/")
  );
}
