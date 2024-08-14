import { IconType } from "react-icons";

export type navLinksType = {
  id: number;
  title: string;
  href: string;
};

export type techBadgesType = {
  id: number;
  title: string;
  image: string;
};

export type servicesDataType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type socialLinksType = {
  title: string;
  url: string;
  icon: IconType;
};
