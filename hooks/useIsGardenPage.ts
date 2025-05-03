"use client";

import { usePathname } from "next/navigation";

export function useIsGardenPage(): boolean {
  const pathname = usePathname();
  return (
    pathname.startsWith("/garden/") && !pathname.startsWith("/garden/book/")
  );
}

export function useIsSoulLinkPage(): boolean {
  const pathname = usePathname();
  return pathname.startsWith("/soullink");
}

export function useIsCollectionPage(): boolean {
  const pathname = usePathname();
  return pathname.startsWith("/collection");
}
