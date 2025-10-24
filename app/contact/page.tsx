import { ContactForm } from "@/components/form/contact-form";
export default function ContactPage() {
  return (
    <section className="container mx-auto p-4">
      <h1>Контакты</h1>
      <p>
        Заявка на аудит, консультацию или проект. Подключение экспертов для
        решения задач бизнеса в цифровой среде.
      </p>
      <div className="pt-4">
        <ContactForm trigger="Начнем проект?" />
      </div>
    </section>
  );
}
