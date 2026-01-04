import { Hero } from "@/components/layout/hero";
import { OurAvantage } from "@/components/layout/our-advantage";
import { OurExperience } from "@/components/layout/our-experience";
import { OurServices } from "@/components/layout/our-services";

export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <OurExperience />
      <OurAvantage />
    </>
  );
}
