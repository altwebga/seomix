import { Geist, Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const geistHeading = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
})

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin", "cyrillic"],
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
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        geistHeading.variable
      )}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:border focus:border-primary/40 focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-primary focus:uppercase"
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
          <main id="main-content">{children}</main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
