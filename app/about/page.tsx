import { PageHeading } from "@/components/shared/page-heading"
import { getContent } from "@/actions/get-content"
import { GlowContainer } from "@/components/thegridcn/glow-container"
import { DataCard } from "@/components/thegridcn/data-card"
import { ITeam } from "@/lib/types"
import { DirectusImage } from "@/components/shared/directus-image"
import { ImageModal } from "@/components/shared/image-modal"
import { Divider } from "@/components/thegridcn/divider"
import { getMetadataBySlug } from "@/lib/get-metadata"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return getMetadataBySlug("pages", "about")
}

export default async function AboutPage() {
  const teams = await getContent<ITeam>({
    collection: "team",
    fields: ["first_name", "position", "photo", "bio", "id", "education.*"],
    status: "published",
  })

  return (
    <div className="container mx-auto my-8 px-4">
      <PageHeading
        title="О нас"
        description="SEOMIX — веб-студия полного цикла, выросшая из хобби в профессиональную деятельность"
      />
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {teams.map((team) => (
          <GlowContainer key={team.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <DataCard
                subtitle="team"
                title={team.first_name}
                fields={[
                  { label: "Должность", value: team.position, highlight: true },
                  { label: "Навыки", value: team.bio },
                ]}
                media={
                  <DirectusImage
                    url={team.photo}
                    alt={team.first_name}
                    width={300}
                    height={300}
                    className="aspect-square max-h-40 max-w-40 object-contain"
                  />
                }
              />
            </div>
            <div className="mt-4">
              <Divider label="Сетрификаты" variant="default" />
              <div className="mt-4 flex flex-row gap-4">
                {team.education?.map((item) => (
                  <ImageModal
                    key={item.id}
                    image={item.directus_files_id}
                    alt="Документ об образовании"
                  />
                ))}
              </div>
            </div>
          </GlowContainer>
        ))}
      </div>
    </div>
  )
}
