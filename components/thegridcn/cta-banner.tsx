"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CTABannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  variant?: "default" | "highlight"
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "default",
  className,
  ...props
}: CTABannerProps) {
  return (
    <div
      data-slot="tron-cta-banner"
      className={cn(
        "group relative overflow-hidden rounded border bg-card/80 px-6 py-8 text-center backdrop-blur-sm",
        variant === "highlight"
          ? "border-primary/50 shadow-[0_0_40px_rgba(var(--primary-rgb,0,180,255),0.08)]"
          : "border-primary/20",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Animated top border glow */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-px">
        <div
          className="h-full w-1/3 bg-linear-to-r from-transparent via-primary/60 to-transparent"
          style={{ animation: "ctaSweep 4s ease-in-out infinite" }}
        />
      </div>

      <style jsx>{`
        @keyframes ctaSweep {
          0%,
          100% {
            margin-left: -10%;
          }
          50% {
            margin-left: 77%;
          }
        }
      `}</style>

      {/* Content */}
      <div className="relative">
        <h3 className="font-display text-lg font-bold tracking-wider text-foreground uppercase md:text-xl">
          {title}
        </h3>
        {description && (
          <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
            {description}
          </p>
        )}

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="mt-5 flex items-center justify-center gap-3">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] tracking-widest text-primary uppercase shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="rounded border border-primary/30 px-5 py-2 font-mono text-[10px] tracking-widest text-foreground/60 uppercase transition-colors hover:border-primary/50 hover:text-primary"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2 border-primary/40" />
    </div>
  )
}
