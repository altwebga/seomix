import { AgentAvatar } from "@/components/thegridcn";
import { getContent } from "@/actions/get-content";
import { DirectusImage } from "@/components/shared/directus-image";
import {
  TronCard,
  TronCardContent,
  TronCardDescription,
  TronCardFooter,
  TronCardHeader,
  TronCardTitle,
} from "@/components/thegridcn";
import { PageHeading } from "@/components/shared/page-heading";

export default async function BlogPage() {
  const posts = await getContent({
    content_type: "article",
    fields: [
      "id",
      "sort",
      "status",
      "date_created",
      "title",
      "short_description",
      "cover_image",
    ],
  });

  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading
        title="Блог"
        description="Заметки по web-разработке в основном что-бы не забыть"
        hue={180}
        size={60}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <TronCard key={post.id}>
            <TronCardHeader>
              <DirectusImage
                url={post.cover_image}
                alt={post.title}
                width={500}
                height={500}
                className="w-full h-48 object-cover"
              />
              <TronCardTitle>{post.title}</TronCardTitle>
            </TronCardHeader>
            <TronCardContent>
              <p className="line-clamp-3">{post.short_description}</p>
            </TronCardContent>
            <TronCardFooter>
              <TronCardDescription>
                {new Date(post.date_created).toLocaleDateString()}
              </TronCardDescription>
            </TronCardFooter>
          </TronCard>
        ))}
      </div>
    </div>
  );
}
