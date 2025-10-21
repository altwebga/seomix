"use client";

import { socialLinks } from "@/config/social-links";

interface SocialIconProps {
  icon: string;
  title: string;
  url: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const SocialIcon = ({ icon, title, url, size = "md" }: SocialIconProps) => {
  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  }[size];

  // Модифицируем SVG, добавляя атрибуты для адаптивного размера
  const adaptiveIcon = icon.replace(
    "<svg",
    '<svg width="100%" height="100%" viewBox="0 0 48 48"'
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block hover:opacity-80 transition-opacity"
      aria-label={title}
    >
      <div
        className={sizeClass}
        dangerouslySetInnerHTML={{ __html: adaptiveIcon }}
      />
    </a>
  );
};

interface SocialIconsProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export const SocialIcons = ({ size = "md" }: SocialIconsProps) => {
  return (
    <div className="flex gap-6">
      {socialLinks.map((item) => (
        <SocialIcon
          key={item.title}
          icon={item.icon}
          title={item.title}
          url={item.url}
          size={size}
        />
      ))}
    </div>
  );
};
