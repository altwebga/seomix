import { notFound } from "next/navigation";
import { Portfolio } from "@/config/portfolio";
import { Image } from "@nextui-org/image";
import { PortfolioItem } from "@/types";
import { title } from "@/components/primitives";
import RuTubePlayer from "@/components/RuTubePlayer";
import { Divider } from "@nextui-org/divider";

interface PortfolioDetailProps {
  params: {
    id: string;
  };
}

const PortfolioDetail = ({ params }: PortfolioDetailProps) => {
  const item: PortfolioItem | undefined = Portfolio.find(
    (p) => p.id === parseInt(params.id)
  );

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto mt-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        <Image
          src={item.logo.src}
          alt={item.title}
          className="my-4 rounded-full"
          width={60}
          radius="none"
        />
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <div>
            <h1 className={title({ size: "md" })}>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
      <Divider/>
      <div className="mt-6">
        <div className="space-y-2">
          {item.content.map((paragraph, index) => (
            <p key={index}>{paragraph.paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="border border-gray-300 rounded-lg mt-6 p-4 w-full md:w-2/3">
            {item.rutube && <RuTubePlayer videoId={item.rutube} />}
          </div>
          <div className="w-full md:w-auto">
            <p className="mb-4">Дата релиза: {item.release}</p>
            <a
              href={item.site}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Посмотреть сайт
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
