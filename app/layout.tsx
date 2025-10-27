import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { siteMetadata } from "@/shared/config/site-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteMetadata.metadataBase,
  title: {
    default: `${siteMetadata.name} — цифровое агентство`,
    template: `%s — ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: siteMetadata.authors,
  creator: siteMetadata.creator,
  openGraph: {
    type: "website",
    siteName: siteMetadata.name,
    title: siteMetadata.name,
    description: siteMetadata.description,
    url: siteMetadata.metadataBase,
  },
  twitter: siteMetadata.twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col justify-between`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
