import { Fade } from "../animate-ui/primitives/effects/fade";
import { GradientText } from "../animate-ui/primitives/texts/gradient";

export function Hero() {
  return (
    <section>
      <div className="container mx-auto">
        <Fade>
          <h1 className="flex flex-col gap-2">
            Разработка и продвижение сайтов
            <GradientText
              text="в Краснодаре"
              className="text-4xl font-extrabold"
            />
          </h1>
        </Fade>
      </div>
    </section>
  );
}
