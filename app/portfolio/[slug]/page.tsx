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
          className="aspect-square"
          height={100}
          src={caseData.logo_url}
          width={100}
        />
        <div>
          <h1>{caseData.title.rendered}</h1>
          <span className="text-sm md:text-xl">
            {caseData.acf.businessCategory}
          </span>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: caseData.content.rendered }}
        className="max-w-5xl mt-8"
      />
      <div className="w-full mt-4 border border-gray-500 p-2 rounded-md">
        <iframe
          allowFullScreen
          allow="clipboard-write; autoplay"
          className="w-full aspect-video"
          src={`https://rutube.ru/play/embed/${caseData.acf.rutube}/`}
          title={caseData.title.rendered}
        />
      </div>
      <CallAction />
    </div>
  );
}
