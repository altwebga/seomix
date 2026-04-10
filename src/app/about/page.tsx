import { PageHeading } from "@/components/shared/page-heading";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading title="О нас" description="О нас" hue={180} size={60} />
    </div>
  );
}
