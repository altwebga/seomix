import { getCustomersList } from "@/actions/feth-data";
import { ClientCard } from "../card/client-card";

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
export async function Clients() {
  const customers = await getCustomersList();
  return (
    <section className="my-8">
      <div className="container mx-auto p-4">
        <h2 className="text-center">Те, кому мы уже помогли стать заметнее</h2>
        <p className="text-center">
          Результат — главная ценность, поэтому 8 из 10 клиентов приходят по
          рекомендации.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {customers.slice(0, 4).map((client) => (
            <ClientCard
              key={client.id}
              title={client.title}
              direction={client.content}
              logo={`${imageUrl}/${client.cover_image}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
