"use client";
import { useState, useEffect } from "react";
import { Share2 } from "lucide-react";

interface Heading {
  label: string;
  id: string;
}

interface TableContentProps {
  headings: Heading[];
}

export function TableContent({ headings }: TableContentProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(headings[i].id);
          break;
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
    <>
      <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <Share2 className="h-3.5 w-3.5 text-primary/60" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Контент
            </span>
          </div>
          <nav className="space-y-0.5">
            {headings.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-2 rounded px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/50 hover:bg-primary/5 hover:text-foreground/80"
                }`}
              >
                <div
                  className={`h-1 w-1 rounded-full ${
                    activeSection === item.id
                      ? "bg-primary"
                      : "bg-foreground/20"
                  }`}
                />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
        <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card/80 text-primary backdrop-blur-sm transition-all hover:bg-primary/10"
        >
          <div className="h-2 w-2 rotate-45 border-l-2 border-t-2 border-primary" />
        </button>
      )}
    </>
  );
}
