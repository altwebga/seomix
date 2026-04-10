import { PageHeading } from "@/components/shared/page-heading";

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading
        title="Услуги"
        description="Полный комплекс услуг для быстрого старта вашего бизнеса в интернете."
        hue={100}
        size={60}
      />
    </div>
  );
}
