import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children?: ReactNode;
  className?: string;
  /** id заголовка, если нужно связать section с h2/h3 для a11y */
  ariaLabelledby?: string;
  /** id самой секции (для якорных ссылок) */
  id?: string;
}

export function SectionContainer({
  children,
  className,
  ariaLabelledby,
  id,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("container mx-auto p-4", className)}
    >
      {children}
    </section>
  );
}
