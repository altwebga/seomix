"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbNavProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: "chevron" | "slash" | "dot"
}

function SeparatorIcon({ type }: { type: string }) {
  if (type === "slash") {
    return (
      <span
        aria-hidden="true"
        className="font-mono text-[10px] text-foreground/20"
      >
        /
      </span>
    )
  }
  if (type === "dot") {
    return (
      <span
        aria-hidden="true"
        className="h-1 w-1 rounded-full bg-foreground/20"
      />
    )
  }
  // chevron
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className="text-foreground/20"
      aria-hidden="true"
    >
      <path
        d="M3.5 2l3.5 3-3.5 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BreadcrumbNav({
  items,
  separator = "chevron",
  className,
  ...props
}: BreadcrumbNavProps) {
  return (
    <nav
      data-slot="tron-breadcrumb"
      aria-label="Breadcrumb"
      className={cn(
        "inline-flex items-center gap-2 rounded border border-primary/20 bg-card/80 px-3 py-1.5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="flex items-center" aria-hidden="true">
              <SeparatorIcon type={separator} />
            </span>
          )}
          {item.active ? (
            <span
              className="font-mono text-[10px] tracking-widest text-primary uppercase"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : item.href ? (
            <Link
              href={item.href}
              className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
