// Храним GraphQL как строковые константы

export const GET_ARTICLES = /* GraphQL */ `
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

export const GET_ARTICLE = /* GraphQL */ `
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
