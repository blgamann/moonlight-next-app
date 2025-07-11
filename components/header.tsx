"use client";

import { TextLogo, TextLogoSoullink, TextLogoSoulVault } from "./text";
import {
  useIsGardenPage,
  useIsSoulLinkPage,
  useIsCollectionPage,
} from "@/hooks/useIsGardenPage";

export function Header() {
  const isGardenPage = useIsGardenPage();
  const isSoulLinkPage = useIsSoulLinkPage();
  const isCollectionPage = useIsCollectionPage();

  return (
    <div
      className={`fixed top-0 flex items-center gap-1 h-14 bg-blue-200 ${
        isGardenPage ? "bg-transparent" : "bg-transparent"
      }`}
    >
      {isSoulLinkPage ? (
        <TextLogoSoullink className="mt-[-2px] cursor-pointer" />
      ) : isCollectionPage ? (
        <TextLogoSoulVault className="mt-[-2px] cursor-pointer" />
      ) : (
        <TextLogo className="mt-[-2px] cursor-pointer" />
      )}
    </div>
  );
}
