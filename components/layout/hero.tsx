import { getContent } from "@/actions/fetch-data";
import { GET_HERO } from "@/config/queries";
import { IHero } from "@/config/types";
import Image from "next/image";

interface HeroResponse {
  hero: IHero;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export async function Hero() {
  const data = await getContent<HeroResponse>(GET_HERO);
  if (!data?.hero) {
    return <p>No hero</p>;
  }

  const { hero } = data;

  return (
    <section className="h-[80vh] flex items-center justify-center bg-[url(/images/hero-bg.min.svg)] bg-no-repeat">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={`${imageUrl}/${hero.hero_image.id}`}
              alt={hero.hero_image.title}
              width={400}
              height={400}
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="flex flex-col text-2xl md:text-4xl">
              {hero.hero_title}
              <span className="text-red-500 text-4xl md:text-8xl">
                {hero.hero_city}
              </span>
            </h1>
            <p className="pt-4">{hero.hero_content}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
