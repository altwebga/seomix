import Image from "next/image"
import Link from "next/link"
import { menuLinks } from "@/lib/menu-links"
import { socialLinks } from "@/lib/social-links"
import { Logo } from "@/components/shared/logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-primary/20 bg-panel">
      <div
        className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-10">
          <div className="space-y-5">
            <Logo className="text-primary" />
            <p className="max-w-md text-sm">
              Создаём сайты, дизайн и продвижение для бизнесов, которым важны
              скорость запуска, понятная структура и аккуратная визуальная
              система.
            </p>
            <div className="inline-flex items-center gap-2 rounded border border-primary/25 bg-primary/5 px-3 py-2 font-mono text-[10px] tracking-widest text-primary uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Online / ready for launch
            </div>
          </div>

          <nav aria-label="Навигация в подвале">
            <div className="mb-4 font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              Карта сайта
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {menuLinks.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded border border-transparent px-3 py-2 font-mono text-xs tracking-wider text-foreground/70 uppercase transition-colors hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
                  >
                    <span className="text-[10px] text-primary/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="mb-4 font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              Связаться
            </div>
            <div className="grid gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 overflow-hidden rounded border border-primary/20 bg-background/45 px-4 py-3 font-mono text-sm tracking-wider text-foreground transition-colors hover:border-primary/45 hover:bg-primary/5 hover:text-primary"
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5"
                    aria-hidden="true"
                  />
                  <span>{link.label}</span>
                  <span
                    className="ml-auto text-[10px] text-primary/45 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    OPEN
                  </span>
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary/15 pt-5">
          <div className="flex flex-col gap-3 font-mono text-[10px] tracking-widest text-foreground/45 uppercase md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[10px] leading-none tracking-widest text-foreground/45 uppercase">
              © {year} SEOMIX. Все права защищены.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/contact"
                className="transition-colors hover:text-primary"
              >
                Обсудить проект
              </Link>
              <Link
                href="/services"
                className="transition-colors hover:text-primary"
              >
                Услуги
              </Link>
              <Link
                href="/portfolio"
                className="transition-colors hover:text-primary"
              >
                Работы
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
