import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "aracteklifi.com - Araç Değerleme Platformu",
  description: "Türkiye'nin en güvenilir araç değerleme platformu. Aracınızın gerçek değerini öğrenin ve en iyi fiyata satın.",
  keywords: "araç değerleme, araç satış, araç alım, araç fiyatı, araç piyasası",
  authors: [{ name: "aracteklifi.com" }],
  creator: "aracteklifi.com",
  publisher: "aracteklifi.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aracteklifi-100.vercel.app'),
  openGraph: {
    title: "aracteklifi.com - Araç Değerleme Platformu",
    description: "Türkiye'nin en güvenilir araç değerleme platformu",
    url: 'https://aracteklifi-100.vercel.app',
    siteName: 'aracteklifi.com',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "aracteklifi.com - Araç Değerleme Platformu",
    description: "Türkiye'nin en güvenilir araç değerleme platformu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
