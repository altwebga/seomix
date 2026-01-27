import { SectionContainer } from "@/components/containers/section-container";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

async function fetchServices() {
  const content = await directus.request(
    readItems("content", {
      filter: {
        content_type: { _eq: "service" },
        status: { _eq: "published" },
      },
      fields: ["id", "title", "description"],
    }),
  );
  return content;
}

export default async function ServicesPage() {
  const content = await fetchServices();
  return (
    <SectionContainer>
      <h1 className="text-3xl font-bold">Services Page</h1>
      <ul className="mt-6 space-y-4">
        {content.map((service) => (
          <li key={service.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
