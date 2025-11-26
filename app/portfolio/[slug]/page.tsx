import { getPublishedProjectsSlugs } from "@/actions/feth-data";
import { Container } from "@/components/layout/container";

export async function generateStaticParams() {
  const projects = await getPublishedProjectsSlugs();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function ProjecPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Container>
      <h1>{slug}</h1>
    </Container>
  );
}
