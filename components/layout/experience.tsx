import { SectionContainer } from "../containers/section-container";
import { Heading } from "../ui/heading";
import { Marquee } from "../ui/marquee";
import { CustomerCard } from "../shared/customer-card";
import { getCustomers } from "@/actions/get-content";
import { ICustomer } from "@/config/types";

const text = {
  title: "Мы уже работали с проектами из вашей сферы",
  subtitle:
    "Мы работали с проектами в туризме и гостиничном бизнесе, медицине и частных клиниках, торговле, строительстве и девелопменте, а также с образовательными платформами, корпоративными системами и цифровыми сервисами для бизнеса.",
};

export async function Experience() {
  const customers = await getCustomers();

  return (
    <SectionContainer className="my-20">
      <Heading
        title={text.title}
        subtitle={text.subtitle}
        level="h2"
        className="md:ml-20 max-w-4xl"
      />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-8 mt-8">
        <Marquee pauseOnHover className="[--duration:60s]">
          {customers
            .sort(() => 0.5 - Math.random())
            .map((client: ICustomer) => (
              <CustomerCard
                key={client.id}
                title={client.title}
                description={client.description}
                logo={client.logo}
              />
            ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:60s]">
          {customers
            .sort(() => 0.5 - Math.random())
            .map((client: ICustomer) => (
              <CustomerCard
                key={client.id}
                title={client.title}
                description={client.description}
                logo={client.logo}
              />
            ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
      </div>
    </SectionContainer>
  );
}
