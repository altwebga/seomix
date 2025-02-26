export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [{ slug: "test" }];
}

export const dynamicParams = false;
