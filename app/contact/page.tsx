import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/form/contact-form";

export default function ContactPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">Контакты</h1>
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Свяжитесь с нами, и мы ответим на все ваши вопросы.
          </p>
          <div className="mt-8">
            <ContactForm trigger="Оставить заявку" />
          </div>
        </div>
      </div>
    </Container>
  );
}

