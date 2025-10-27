import Image from "next/image";

import { getHero } from "@/entities/hero/api/get-hero";
import type { Hero } from "@/entities/hero/model/types";
import { ContactRequestDialog } from "@/features/contact-request/ui/contact-request-dialog";
import { getPublicEnv } from "@/shared/config/public-env";
import { SocialIcons } from "@/components/layout/social-icons";

const { NEXT_PUBLIC_IMAGE_URL } = getPublicEnv();

export async function LandingHero() {
  const data = await getHero();
  const hero: Hero | undefined = data?.hero;

  if (!hero) {
    return null;
  }

  return (
    <section className="h-screen flex items-center bg-[url(/images/bg_grid.min.svg)] bg-no-repeat bg-bottom bg-contain">
      <div className="container mx-auto p-4">
        <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <Image
              src={`${NEXT_PUBLIC_IMAGE_URL}/${hero.hero_image.id}`}
              alt={hero.hero_image.title}
              width={400}
              height={400}
              className="object-contain hidden md:block"
              priority
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
                <ContactRequestDialog
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
