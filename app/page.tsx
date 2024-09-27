import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { title } from "@/components/primitives";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="flex flex-col items-center justify-center">
        <h1 className={title()}>Home</h1>
      </main>
      <Footer />
    </>
  );
}
