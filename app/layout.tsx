import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
