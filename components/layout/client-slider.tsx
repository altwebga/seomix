import { getContent } from "@/actions/get-content"
import { LogoCloud } from "@/components/thegridcn/logo-cloud"
import { IClient } from "@/lib/types"
import { Divider } from "../thegridcn/divider"

export async function ClientSlider() {
  const clients = await getContent<IClient>({
    collection: "clients",
    fields: ["title", "logo"],
    status: "published",
  })

  return (
    <section className="my-20">
      <div className="container mx-auto">
        <Divider label="Our Clients" variant="default" />
        <h2 className="section-title mx-auto my-8 text-center md:my-16">
          Среди наших клиентов
        </h2>
        <LogoCloud
          speed="slow"
          logos={clients.map((c) => {
            return {
              title: c.title,
              logo: c.logo,
            }
          })}
        />
      </div>
    </section>
  )
}
