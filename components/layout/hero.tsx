import { getContent } from "@/actions/fetch-data";
import { GET_HERO } from "@/config/queries";
import { IHero } from "@/config/types";
import Image from "next/image";
import { ContactForm } from "../form/contact-form";
import { SocialIcons } from "./social-icons";

interface HeroResponse {
  hero: IHero;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export async function Hero() {
  const data = await getContent<HeroResponse>(GET_HERO, {
    revalidate: 3600 * 24,
  });
  if (!data?.hero) {
    return <p>No hero</p>;
  }

  const { hero } = data;

  return (
    <section className="h-screen flex items-center bg-[url(/images/hero_bg.png)] bg-no-repeat bg-cover bg-fixed">
      <div className="container mx-auto p-4 bg-[url(/images/hero-bg.min.svg)] bg-left">
        <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <Image
              src={`${imageUrl}/${hero.hero_image.id}`}
              alt={hero.hero_image.title}
              width={400}
              height={400}
              className="object-contain hidden md:block"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="flex flex-col text-xl md:text-3xl uppercase">
              {hero.hero_title}
              <span className="text-5xl md:text-8xl">{hero.hero_city}</span>
            </h1>
            <p className="pt-4 text-4xl">{hero.hero_content}</p>
            <div className="flex flex-col md:flex-row gap-8 w-full items-center pt-6">
              <div className="md:w-1/2 w-full">
                <ContactForm
                  trigger="Начать проект"
                  className="h-14 bg-red-500 w-full"
                />
              </div>

              <div className="md:w-1/2 flex justify-center">
                <SocialIcons size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
