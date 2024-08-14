import { Link } from "@nextui-org/link";

import { socialLinks } from "@/config/site";

type SocialLinkProps = {
  color:
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size: "small" | "medium" | "large";
};

export const SocialLink = ({ color, size }: SocialLinkProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <div className="flex flex-row gap-4">
      {socialLinks.map((item) => (
        <Link
          key={item.url}
          isExternal
          className="flex items-center gap-2"
          color={color}
          href={item.url}
        >
          <item.icon className={sizeClasses[size]} />
        </Link>
      ))}
    </div>
  );
};
