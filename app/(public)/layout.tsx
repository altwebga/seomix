import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="inline-block max-w-lg text-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
