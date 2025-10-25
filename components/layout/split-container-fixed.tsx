// components/split-container-fixed.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SplitContainerFixedProps {
  main: ReactNode;
  sidebar: ReactNode;
  className?: string;
}

export function SplitContainerFixed({
  main,
  sidebar,
  className,
}: SplitContainerFixedProps) {
  return (
    <section className={cn("container mx-auto p-4", className)}>
      <div className="flex flex-col md:flex-row gap-4 md:items-start">
        {/* Левая колонка — основной контент */}
        <div className="w-full md:w-3/4 md:pr-4 md:border-r">{main}</div>

        {/* Правая колонка — фиксируется при md+ */}
        <div className="w-full md:w-1/4">
          <div className="md:fixed md:top-20 md:w-1/4">{sidebar}</div>
        </div>
      </div>
    </section>
  );
}
