import { LandingHero } from "@/widgets/landing-hero/ui/landing-hero";
import { ServicesOverview } from "@/widgets/services-overview/ui/services-overview";
import { StageRoadmap } from "@/widgets/stage-roadmap/ui/stage-roadmap";
import { ClientsGrid } from "@/widgets/clients-grid/ui/clients-grid";
import { CallToActionCard } from "@/widgets/call-to-action/ui/call-to-action-card";

export default function Home() {
  return (
    <div>
      <LandingHero />
      <ServicesOverview />
      <StageRoadmap />
      <ClientsGrid />
      <CallToActionCard className="container mx-auto px-4" />
    </div>
  );
}
