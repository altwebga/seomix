import { Header } from "@/components/shared/header";

export default function FrontEndLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container px-4 mx-auto">{children}</main>
    </>
  );
}
