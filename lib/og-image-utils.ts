import { getContentParams } from "@/actions/fetch-data";
import { GET_ARTICLE, GET_SERVICE, GET_PROJECT } from "@/config/queries";
import { IArticle, IService, IProject } from "@/config/types";

export type ContentType = "article" | "service" | "project";

interface ContentData {
  title: string;
  description: string;
}

export async function getContentForOG(
  type: ContentType,
  slug: string
): Promise<ContentData | null> {
  try {
    switch (type) {
      case "article": {
        const result = await getContentParams<{ articles: IArticle[] }>(
          GET_ARTICLE,
          { slug },
          { revalidate: 3600 * 24 }
        );

        if (!result?.articles?.length) return null;

        const article = result.articles[0];
        return {
          title: article.seo.title,
          description: article.seo.meta_description,
        };
      }

      case "service": {
        const result = await getContentParams<{ services: IService[] }>(
          GET_SERVICE,
          { slug },
          { revalidate: 3600 * 24 }
        );

        if (!result?.services?.length) return null;

        const service = result.services[0];
        return {
          title: service.seo.title,
          description: service.seo.meta_description,
        };
      }

      case "project": {
        const result = await getContentParams<{ projects: IProject[] }>(
          GET_PROJECT,
          { slug },
          { revalidate: 3600 * 24 }
        );

        if (!result?.projects?.length) return null;

        const project = result.projects[0];
        return {
          title: project.seo.title,
          description: project.seo.meta_description,
        };
      }

      default:
        return null;
    }
  } catch (error) {
    console.error(`Error fetching ${type} data for OG image:`, error);
    return null;
  }
}
