import Image from "next/image";
import { socialLinks } from "@/config/social-links";

export function SocialIcon() {
  return (
    <div className="flex flex-row gap-8 justify-center">
      {socialLinks.map((link) => (
        <a key={link.url} target="_blank" rel="noopener noreferrer">
          <Image src={link.icon} alt={link.title} width={32} height={32} />
        </a>
      ))}
    </div>
  );
}
