import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type navLinksType = {
  id: number;
  title: string;
  href: string;
};
