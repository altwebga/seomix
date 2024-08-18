import { Image } from "@nextui-org/image";

import { getCase } from "@/config/fetch";
import { CallAction } from "@/components/call-action";
export default async function SinglePortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseData = await getCase(params.slug);

  return (
    <div>
      <div className="flex gap-4 items-center w-full">
        <Image
          className="w-24 h-24"
          height={100}
          src={caseData.logo_url}
          width={100}
        />
        <div>
          <h1>{caseData.title.rendered}</h1>
          <span className="text-xl">{caseData.acf.businessCategory}</span>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: caseData.content.rendered }}
        className="max-w-5xl mt-8"
      />

      <CallAction />
    </div>
  );
}
