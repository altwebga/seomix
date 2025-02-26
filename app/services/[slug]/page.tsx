export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post, frontmatter } = await import(
    `@/content/services/${slug}.mdx`
  );

  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <Post />
    </div>
  );
}

export function generateStaticParams() {
  return [{ slug: "website" }];
}

export const dynamicParams = false;
