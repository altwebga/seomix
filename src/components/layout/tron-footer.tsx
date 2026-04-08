import { Footer } from "../thegridcn";
import { Zap } from "lucide-react";
import { menuLinks } from "@/config/menu-links";
import { socialLinks } from "@/config/social-links";

const LANDING_FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
      { label: "Themes", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },

  {
    title: "Community",
    links: [
      { label: "GitHub", href: "#", external: true },
      { label: "Discord", href: "#", external: true },
      { label: "Twitter", href: "#", external: true },
      { label: "Blog", href: "#" },
    ],
  },
];

export function TronFooter() {
  return (
    <Footer
      logo={
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded border border-primary/30 bg-primary/10">
            <Zap className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground/80">
            seomix
          </span>
        </div>
      }
      columns={LANDING_FOOTER_COLUMNS}
      socials={socialLinks}
      copyright={`\u00A9 ${new Date().getFullYear()} seomix. Все права защищены.`}
    />
  );
}
