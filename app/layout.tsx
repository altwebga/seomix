import localFont from "next/font/local"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { YandexMetrika } from "@/components/shared/yandex-metrika"
import { AIBot } from "@/components/shared/ai-bot"

const geistHeading = localFont({
  src: [
    {
      path: "../public/font/Geist[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/font/Geist-Italic[wght].woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-heading",
})

const inter = localFont({
  src: [
    {
      path: "../public/font/InterVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/font/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
})

const fontMono = localFont({
  src: [
    {
      path: "../public/font/GeistMono[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/font/GeistMono-Italic[wght].woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-mono",
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SEOMIX",
    template: "%s | SEOMIX",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        geistHeading.variable
      )}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded focus:border focus:border-primary/40 focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-primary focus:uppercase"
        >
          Перейти к содержимому
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main id="main-content" className="grow">
            {children}
          </main>
          <Toaster />
          <Footer />
          <YandexMetrika />
          <AIBot />
        </ThemeProvider>
      </body>
    </html>
  )
}
