import { Header } from "@/components/header";
export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 mt-4">{children}</main>
    </>
  );
}
