import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { setting } from "@/lib/setting";

export function SocialLinks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {setting.socialLinks.map((link, index) => (
        <Button key={index} variant="outline" className="w-full">
          <Link href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
          </Link>
          <ExternalLinkIcon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
}
