import Image from "next/image"
import { socialLinks } from "@/lib/social-links"
import { Logo } from "@/components/shared/logo"
import { Badge } from "../thegridcn/badge"

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
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-5">
            <Logo className="text-primary" />
            <Badge dot pulse className="h-8">
              Online / ready for launch
            </Badge>
          </div>

          <div className="max-w-md space-y-4 md:text-center">
            <p className="font-mono text-sm leading-7 text-foreground/70 md:text-base">
              Сайты, дизайн и продвижение для бизнеса, которому нужен понятный
              результат.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
              Связаться
            </div>
            <div
              className="flex flex-wrap gap-3 md:justify-end"
              aria-label="Социальные сети"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex size-11 items-center justify-center overflow-hidden rounded border border-primary/20 bg-background/45 text-foreground transition-colors hover:border-primary/45 hover:bg-primary/5 hover:text-primary"
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="size-5.5"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary/15 pt-5">
          <p className="font-mono text-[10px] leading-none tracking-widest text-foreground/45 uppercase">
            © {year} SEOMIX. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
