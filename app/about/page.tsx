import { ModalImage } from "@/components/modal-image";
import diploma_page_01 from "@/public/images/diploma_page_01.webp";
import diploma_page_02 from "@/public/images/diploma_page_02.webp";
import teamImage1 from "@/public/images/me.jpg";
import teamImage2 from "@/public/images/Team-2.jpg";
import { Team } from "@/components/team";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>О нас</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Team image={teamImage1.src} title="Константин" content="Разработка" />
        <Team
          image={teamImage2.src}
          title="Неля"
          content="Контекстная реклама"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-self-center">
        <ModalImage
          thumbnail={diploma_page_01.src}
          large={diploma_page_01.src}
          alt="Диплом разработчика"
        />
        <ModalImage
          thumbnail={diploma_page_02.src}
          large={diploma_page_02.src}
          alt="Диплом разработчика"
        />
      </div>
    </div>
  );
}
