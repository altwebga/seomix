import { Hero } from "@/components/Hero";
import { ServicesHome } from "@/components/ServicesHome";
import { Technologies } from "@/components/Technologies";

export default function Home() {
  return (
    <div>
      <Hero />
      <Technologies />
      <ServicesHome />
    </div>
  );
}
