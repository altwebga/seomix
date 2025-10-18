interface SEO {
  title: string;
  meta_description: string;
}

interface Image {
  id: string;
  title: string;
}

interface Base {
  id: string;
  status: "published" | "draft" | "archived";
  slug: string;
  title: string;
  content: string;
}

export interface IArticle extends Base {
  seo: SEO;
  cover_image: Image;
}
