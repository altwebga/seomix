export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/content/services/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [{ slug: "razrabotka-veb-sajtov" }, { slug: "dizajn-i-brending" }];
}

export const dynamicParams = false;
