import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
  /** id заголовка, если нужно связать section с h2/h3 для a11y */
  ariaLabelledby?: string;
  /** id самой секции (для якорных ссылок) */
  id?: string;
}

export function Container({
  children,
  className,
  ariaLabelledby,
  id,
}: ContainerProps) {
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
