import { ContactForm } from "@/components/form/contact-form"
import { PageHeading } from "@/components/shared/page-heading"

export default function ContactPage() {
  return (
    <div className="container mx-auto my-8 px-4">
      <PageHeading
        title="Контакты"
        description="Свяжитесь с нами — обсудим ваш проект и подберём оптимальное решение."
      />
      <div className="my-4 flex flex-row gap-6">
        <div className="w-full"></div>
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
