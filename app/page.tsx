import { CallAction } from "@/components/call-action";
import { DevStages } from "@/components/dev-stages";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Technology } from "@/components/technology";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Technology />
      <DevStages />
      <CallAction />
    </div>
  );
}
