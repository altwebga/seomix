import { getContent } from "@/actions/fetch-data";
import { GET_CLIENTS } from "@/config/queries";
import { IClientsData } from "@/config/types";
import { ClientCard } from "../card/client-card";

interface GraphQLResponse {
  clients?: IClientsData[];
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export async function ClientsList() {
  const res = await getContent<GraphQLResponse>(GET_CLIENTS);
  const clients = res?.clients ?? [];
  if (clients.length === 0) {
    return <p>Упс. нет клиентов</p>;
  }

  return (
    <section>
      <div className="container mx-auto p-4">
        <h2 className="py-8">Среди наших клиентов</h2>
        <div className="grid grid-cols-4 gap-4">
          {clients.slice(0, 8).map((client) => (
            <ClientCard
              key={client.id}
              title={client.title}
              direction={client.direction}
              logo={`${imageUrl}/${client.logo.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
