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

export interface IProject extends Base {
  release_date: string;
  client: {
    title: string;
    direction: string;
    logo: {
      id: string;
      title: string;
    };
  };
  site: string;
  video_url: string;
  seo: SEO;
  cover_image: Image;
}

export interface ITeam {
  id: string;
  title: string;
  position: string;
  content: string;
  slug: string;
  photo: Image;
  certificates: {
    id: string;
    directus_files_id: {
      id: string;
      title: string;
    };
  }[];
}
