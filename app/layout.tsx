import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/LenisProvider";
import { SlidingCart } from "@/components/SlidingCart";
import { ToastHost } from "@/components/ToastHost";
import { ThemeProvider } from "@/components/ThemeProvider";
import { THEME_STORAGE_SCRIPT } from "@/lib/theme-script";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JP Parts International",
  description: "JP Parts International — quality parts worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Script
          id="jp-parts-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_STORAGE_SCRIPT }}
        />
        <ThemeProvider>
          <LenisProvider>
            {children}
            <Footer />
            <SlidingCart />
            <ToastHost />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
