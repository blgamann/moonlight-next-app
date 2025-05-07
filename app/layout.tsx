import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moonlight",
  description: "관계가 피어나는 달빛 정원",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="max-w-md mx-auto min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
