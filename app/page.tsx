import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col gap-12 mt-10">
      <div className="md:w-2/3">
        <h1 className={title({ size: "lg" })}>Цифровые продукты&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>для &nbsp;</h1>
        <br />
        <h1 className={title()}>производственных и торговых компаний</h1>
        <h2 className={subtitle({ class: "mt-8" })}>
          Мы — веб-продакшен полного цикла для производственных и торговых
          компаний. Наши услуги включают аналитику, проектирование интерфейсов,
          разработку дизайна, программирование, интеграции, поддержку и развитие
          цифровых продуктов.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          href={siteConfig.links.docs}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
