import { ClientLogo } from "@/components/layout/client-logo";
import { CTA } from "@/components/layout/cta";
import { Features } from "@/components/layout/features";
import { Hero } from "@/components/layout/hero";
import { Services } from "@/components/layout/services";
import { Steps } from "@/components/layout/steps";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogo />
      <Features />
      <Services />
      <Steps />
      <CTA className="my-8" />
    </>
  );
}
