import { getPublishedServicesSlugs } from "@/actions/feth-data"
import { Container } from "@/components/layout/container"

export async function generateStaticParams() {
    const services = await getPublishedServicesSlugs()
   
    return services.map((service) => ({
      slug: service.slug,
    }))
  }
   
  // Multiple versions of this page will be statically generated
  // using the `params` returned by `generateStaticParams`
  export default async function ServicePage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    return(
        <Container>
            <h1>{slug}</h1>
        </Container>
    )
  }