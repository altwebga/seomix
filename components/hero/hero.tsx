import { GravityStarsBackground } from "../animate-ui/components/backgrounds/gravity-stars";

import { AnimationContainer } from "../layout/animation-container";

import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Experience } from "./experience";

const text = {
  title: "Разработка и продвижение сайтов ",
  city: "в Краснодаре",
  subtitle: "Адекватный креатив и техноличные решения для вашего бизнеса",
};

export function Hero() {
  return (
    <section className="h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-4 z-10 space-y-4 md:max-w-3/4">
        <AnimationContainer>
          <h1 className="flex flex-col gap-2">
            {text.title}{" "}
            <span className="md:text-8xl text-primary">{text.city}</span>
          </h1>
        </AnimationContainer>
        <AnimationContainer delay={0.2}>
          <TextGenerateEffect
            words={text.subtitle}
            className="text-xl text-foreground mt-8"
          />
        </AnimationContainer>
        <AnimationContainer delay={0.4}>
          <Experience />
        </AnimationContainer>
      </div>
      <GravityStarsBackground
        starsCount={150}
        starsSize={2}
        className="absolute h-[80vh]"
      />
    </section>
  );
}
