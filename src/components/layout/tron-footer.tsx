import { Footer } from "../thegridcn/footer";
import { Zap } from "lucide-react";
import { menuLinks } from "@/config/menu-links";
import { socialLinks } from "@/config/social-links";
import { Logo } from "../shared/logo";

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
      logo={<Logo className="text-primary" />}
      columns={LANDING_FOOTER_COLUMNS}
      socials={socialLinks}
      copyright={`\u00A9 ${new Date().getFullYear()} seomix. Все права защищены.`}
    />
  );
}
