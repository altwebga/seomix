import { PageHeading } from "@/components/shared/page-heading";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading
        title="О нас"
        description="SEOMIX — веб-студия полного цикла, выросшая из хобби в профессиональную деятельность"
        hue={180}
        size={60}
      />
    </div>
  );
}
