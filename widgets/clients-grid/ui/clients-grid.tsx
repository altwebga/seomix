import { getClients } from "@/entities/client/api/get-clients";
import { ClientCard } from "@/entities/client/ui/client-card";
import { getPublicEnv } from "@/shared/config/public-env";

const { NEXT_PUBLIC_IMAGE_URL } = getPublicEnv();

export async function ClientsGrid() {
  const data = await getClients();
  const clients = data?.clients ?? [];

  if (clients.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="container mx-auto p-4">
        <h2 className="md:text-5xl flex flex-col gap-2 uppercase justify-center py-8">
          Среди наших клиентов
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.slice(0, 8).map((client) => (
            <ClientCard
              key={client.id}
              title={client.title}
              direction={client.direction}
              logo={`${NEXT_PUBLIC_IMAGE_URL}/${client.logo.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
