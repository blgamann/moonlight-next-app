// fonts.ts
import localFont from "next/font/local";

export const gurmukhiMN = localFont({
  src: [
    {
      path: "../public/fonts/GurmukhiMN.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GurmukhiMN-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gurmukhi-mn",
});

export const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Helvetica-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-helvetica",
});

export const nanumMyeongjo = localFont({
  src: [
    {
      path: "../public/fonts/NanumMyeongjo.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NanumMyeongjo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-nanum-myeongjo",
});
