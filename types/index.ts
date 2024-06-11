import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  logo: {
    src: string;
  };
  image?: {
    src: string;
  };
  site: string;
  description: string;
  youtube: string;
  rutube: string;
  content: {
    paragraph: string;
  }[];
  release: string;
}


export interface ServiceItem {
  id: number,
  slug: string,
  title: string,
  description: string
  image?: {
    src: string;
  };
  price: string
}