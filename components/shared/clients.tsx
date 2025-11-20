import { getCustomersList } from "@/actions/feth-data";
import { ClientsCarousel } from "./clients-carousel";

export async function Clients() {
  const customers = await getCustomersList();
  return (
    <section className="my-8">
      <ClientsCarousel customers={customers.slice(0, 8)} />
    </section>
  );
}
