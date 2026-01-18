interface OneColumnProps {
  children: React.ReactNode;
}

export function OneColumn({ children }: OneColumnProps) {
  return <div className="container mx-auto px-4">{children}</div>;
}
