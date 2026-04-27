import { Markdown } from "@/components/shared/markdown"
import { getContent } from "@/actions/get-content"
import { ILegalInformation } from "@/lib/types"

export default async function PrivacyPolicyPage() {
  const res = await getContent<ILegalInformation>({
    collection: "legal_information",
    fields: ["*"],
    status: "published",
    slug: "privacy-policy",
  })

  const privacy = res[0]
  return (
    <section className="my-8">
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-2xl font-bold md:text-4xl">{privacy.title}</h1>
        <Markdown markdown={privacy.description} />
      </div>
    </section>
  )
}
