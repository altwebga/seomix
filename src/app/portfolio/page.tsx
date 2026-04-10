import { PageHeading } from "@/components/shared/page-heading";

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading
        title="Портфолио"
        description="Некоторые наши проекты которые нам разрешено показывать условиями договора"
        hue={180}
        size={60}
      />
    </div>
  );
}
