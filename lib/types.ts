export type navLinksType = {
  id: number;
  title: string;
  href: string;
};

export type Post = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  acf?: {
    price?: string;
    logo?: string;
    businessCategory?: string;
    website?: string;
    rutube?: string;
    release?: string;
  };
  image_url?: string;
};

export type BlogCategoryType = {
  title: string;
  href: string;
  description: string;
};
