export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto max-w-7xl mt-8">{children}</div>;
}
