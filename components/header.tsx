"use client";

import { TextLogo } from "./text";
import { useIsGardenPage } from "@/hooks/useIsGardenPage";

export function Header() {
  const isGardenPage = useIsGardenPage();

  return (
    <div
      className={`w-full fixed top-0 flex items-center gap-1 h-14  z-10 ${
        isGardenPage ? "bg-transparent" : "bg-white"
      }`}
    >
      <TextLogo className="mt-[-2px] ml-13 cursor-pointer">moonlight</TextLogo>
    </div>
  );
}
