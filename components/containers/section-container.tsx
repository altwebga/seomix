type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <section className="container mx-auto px-4">
      <div className={className}>{children}</div>
    </section>
  );
}
