export interface Seo {
  title: string;
  meta_description: string;
}

export interface ServiceImage {
  id: string;
  title: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  content: string;
  short_content: string | null;
  price: string | null;
  seo: Seo;
  cover_image: ServiceImage;
}
