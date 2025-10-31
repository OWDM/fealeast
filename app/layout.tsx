import type { Metadata } from "next";
import { Roboto, Noto_Sans_Arabic, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto',
});

const notoSansArabic = Noto_Sans_Arabic({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["arabic"],
  display: 'swap',
  variable: '--font-arabic',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: "Fuel East - Scientific Equipment & Chemicals",
  description: "Your partner in scientific equipment and chemicals. Providing advanced laboratory equipment and technical solutions across Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} ${notoSansArabic.variable} ${dmMono.variable} font-roboto bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
