import { ContactForm } from "@/components/form/contact-form";
export default function ContactPage() {
  return (
    <section className="container mx-auto p-4">
      <h1>Наши контакты</h1>
      <div className="pt-4">
        <ContactForm />
      </div>
    </section>
  );
}
