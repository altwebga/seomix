export interface Image {
  id: string;
  filename_disk?: string | null;
  title?: string | null;
}

export interface Base {
  id: string;
  slug: string | null;
  date_created: string;
  date_updated: string | null;
  status: string;
  title: string;
  content: string | null;
  cover_image: string | null;
}

export interface SEO {
  title: string;
  meta_description: string;
  og_image?: string;
}

export interface Hero extends Base {
  city: string;
}

export interface Article extends Base {
  seo?: SEO | null;
}

export interface Project extends Base {
  release_date: string | null;
  client: string | null;
  site_url: string | null;
  rutube_id: string | null;
  seo?: SEO | null;
}

export interface Service extends Base {
  short_content: string | null;
  price: string | null;
  seo?: SEO | null;
}

export interface Customer {
  id: string;
  title: string;
  content: string | null;
  cover_image: Image | string | null;
}

export interface Team {
  id: string;
  title: string;
  position: string;
  content: string | null;
  slug: string | null;
  photo: Image | string | null;
}
