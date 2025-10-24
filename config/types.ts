interface SEO {
  title: string;
  meta_description: string;
}

interface Image {
  id: string;
  title: string;
}

export interface IHero {
  hero_title: string;
  hero_city: string;
  hero_content: string;
  hero_image: Image;
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

export interface IService extends Base {
  short_content: string | null;
  price: string;
  seo: SEO;
  cover_image: Image;
}

export interface IStageItem {
  step: number;
  title: string;
  content: string;
}

export interface IStageData {
  stage: {
    phase: IStageItem[];
  };
}

export interface IClientsData {
  id: string;
  title: string;
  direction: string;
  logo: Image;
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
