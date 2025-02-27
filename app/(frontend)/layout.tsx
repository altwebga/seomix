export default function FrontEndLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="container px-4 mx-auto">{children}</main>;
}
