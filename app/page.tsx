import { CallAction } from "@/components/layout/call-action";
import { ClientsList } from "@/components/layout/clients-list";
import { Hero } from "@/components/layout/hero";
import { ServicesHome } from "@/components/layout/services-home";
import { StageList } from "@/components/layout/stage-list";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesHome />
      <StageList />
      <ClientsList />
      <CallAction className="container mx-auto px-4" />
    </div>
  );
}
