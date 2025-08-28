import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
      title: "aracteklifi.com - Araç Değerleme ve Satış Platformu",
    description: "Aracınızın gerçek değerini öğrenin ve güvenle satın. aracteklifi.com ile araç değerleme ve satış işlemlerinizi kolayca yapın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
