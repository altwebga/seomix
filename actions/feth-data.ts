"use server";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

// Articles
export async function getPublishedArticlesSlugs() {
  return directus.request(
    readItems("articles", {
      fields: ["slug"],
      filter: { status: { _eq: "published" } },
    })
  );
}

export async function getArticleBySlug(slug: string) {
  try {
    const posts = await directus.request(
      readItems("articles", {
        fields: ["title", "content", "cover_image", "seo"],
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
      })
    );
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPublishedArticlesList() {
  return directus.request(
    readItems("articles", {
      fields: ["slug", "title", "date_created", "id", "cover_image", "seo"],
      sort: ["-date_created"],
      filter: { status: { _eq: "published" } },
    })
  );
}

// Projects
export async function getPublishedProjectsSlugs() {
  return directus.request(
    readItems("projects", {
      fields: ["slug"],
      filter: { status: { _eq: "published" } },
    })
  );
}

export async function getProjectBySlug(slug: string) {
  try {
    const projects = await directus.request(
      readItems("projects", {
        fields: [
          "title",
          "content",
          "cover_image",
          "seo",
          "rutube_id",
          "client",
          "site_url",
        ],
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
      })
    );
    return projects[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPublishedProjectsList() {
  return directus.request(
    readItems("projects", {
      fields: [
        "slug",
        "title",
        "date_created",
        "id",
        "cover_image",
        "seo",
        "release_date",
      ],
      sort: ["-release_date"],
      filter: { status: { _eq: "published" } },
    })
  );
}

// Customers

export async function getCustomersList() {
  return directus.request(
    readItems("customers", {
      fields: ["id", "title", "content", "cover_image"],
      filter: { status: { _eq: "published" } },
    })
  );
}

export async function getCustomerById(clientId: number) {
  const items = await directus.request(
    readItems("customers", {
      fields: ["id", "title", "content", "cover_image"],
      filter: { id: { _eq: clientId } },
      limit: 1,
    })
  );
  return items[0] ?? null;
}

// Services
export async function getPublishedServicesSlugs() {
  return directus.request(
    readItems("services", {
      fields: ["slug"],
      filter: { status: { _eq: "published" } },
    })
  );
}

export async function getPublishedServicesList() {
  return directus.request(
    readItems("services", {
      fields: [
        "slug",
        "title",
        "date_created",
        "id",
        "cover_image",
        "seo",
        "short_content",
        "price",
      ],
      sort: ["id"],
      filter: { status: { _eq: "published" } },
    })
  );
}

export async function getServiceBySlug(slug: string) {
  try {
    const services = await directus.request(
      readItems("services", {
        fields: [
          "title",
          "content",
          "cover_image",
          "seo",
          "short_content",
          "price",
        ],
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
      })
    );
    return services[0] ?? null;
  } catch {
    return null;
  }
}
