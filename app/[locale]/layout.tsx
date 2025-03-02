import "../globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google Map",
  description: "Google Map is a simple example of how to use Google Maps in Next.js",
};

export default async function RootLayout({ children, params }: {
  children: React.ReactNode, params: Promise<{ locale: "en" | "he" }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const message = await getMessages();

  return (
    <html lang={locale} >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={message}>
          <Header />
          {children}
          <NextTopLoader color="#e75480" height={4} crawlSpeed={200} zIndex={2000} showSpinner={false} shadow="0 0 10px #e75480,0 0 5px #f0e1e7" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


