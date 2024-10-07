import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="px-4">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
