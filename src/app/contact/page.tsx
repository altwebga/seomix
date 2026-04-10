import { PageHeading } from "@/components/shared/page-heading";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading
        title="Контакты"
        description="Свяжитесь с нами — обсудим ваш проект и подберём оптимальное решение."
        hue={180}
        size={60}
      />
    </div>
  );
}
