// Храним GraphQL как строковые константы

export const GET_ARTICLES = `
  query GetArticles {
    articles(
      filter: { status: { _eq: "published" } }
      sort: ["-date_created"]
    ) {
      id
      slug
      title
      seo
      date_created
      cover_image {
        id
        title
      }
    }
  }
`;

export const GET_ARTICLE = `
  query GetArticle($slug: String!) {
    articles(filter: { slug: { _eq: $slug }, status: { _eq: "published" } }) {
      id
      slug
      title
      content
      cover_image {
        title
        id
      }
      seo
    }
  }
`;

export const GET_PROJECTS = `
query GetProjects {
    projects(
      filter: { status: { _eq: "published" } }
      sort: ["-release_date"]
    ) {
      id
      slug
      title
      release_date
      seo
      client {
        title
      }
      cover_image {
        id
        title
      }
    }
  }
`;

export const GET_PROJECT = `
query GetProject($slug: String!) {
      projects(filter: { slug: { _eq: $slug }, status: { _eq: "published" } }) {
      id
      slug
      title
      content
      seo
      release_date
      client {
        title
        direction
        logo {
        id
        title
        }
      }
      site
      video_url
      cover_image {
        id
        title
      }
      }
    }
`;

export const GET_SERVICES = `
query GetServices {
    services(
      filter: { status: { _eq: "published" } }
    ) {
      id
      slug
      title
      short_content
      price
      seo
      cover_image {
        id
        title
      }
    }
  }
`;

export const GET_SERVICE = `
query GetService($slug: String!) {
      services(filter: { slug: { _eq: $slug }, status: { _eq: "published" } }) {
        id
        slug
        title
        content
        price
        cover_image {
          title
          id
        }
        seo
      }
    }
`;

export const GET_HERO = `
query GetHero  {
      hero {
        hero_title
        hero_city
        hero_content
        hero_image {
            id
            title
        }
      }
    }
`;

export const GET_STAGE = `
query GetStage {
  stage {
    phase  
  }
}
`;

export const GET_CLIENTS = `
query GetClients {
    clients {
      id
      title
      direction
      logo {
        id
        title
      }
    }
  }
`;
