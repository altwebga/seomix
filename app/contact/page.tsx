import { title } from "@/components/primitives";
import { socialLinks } from "@/config/socialLink";
import { Link } from "@nextui-org/link";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="my-5">
      <h1 className={title()}>Мои контакты</h1>
      <div className="flex flex-col md:flex-row py-6">
        <div className="w-full md:w-1/2">
          <h3 className="py-4 text-2xl">Я в социальных сетях</h3>
          <p className="py-4 max-w-lg">
            Я не публикую номер телефона т.к. не хочу попасть в базу спам
            звонков. Вы можете легко получить его перейдя в любой из моих
            социальных аккаунтов.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            {socialLinks.map((item, index) => (
              <li key={index}>
                <Link href={item.url} isExternal showAnchorIcon size="lg">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="py-4 text-2xl">Напишите мне</h3>
          <ContactForm/>
        </div>
      </div>
    </div>
  );
}
