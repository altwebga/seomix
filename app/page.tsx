import { Clients } from "@/components/shared/clients";
import { Hero } from "@/components/shared/hero";
import { Services } from "@/components/shared/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Clients />
    </>
  );
}
