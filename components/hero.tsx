import Link from "next/link";
import { Button } from "./ui/button";
import { ModalForm } from "./modal-form";

type HeroProp = {
  city: string;
  offer: string;
};

export function Hero({ city, offer }: HeroProp) {
  return (
    <section className="h-screen dark:bg-none bg-[url(/images/bg-image.jpg)] bg-background/50">
      <div className="container mx-auto flex flex-col justify-center h-screen px-4">
        <h1 className="flex flex-col gap-2">
          Разработка и продвижение сайтов{" "}
          <span className="text-6xl md:text-8xl font-bold text-primary">
            {city}
          </span>
        </h1>

        <p className="max-w-3xl pt-4">{offer}</p>
        <div className="flex flex-row gap-2">
          <ModalForm />
          <Button asChild size={"lg"} className="max-w-48" variant={"outline"}>
            <Link href={"/portfolio"}>Портфолио</Link>
          </Button>
        </div>
      </div>
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-screen object-cover z-[-1] hidden dark:block"
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>
    </section>
  );
}
