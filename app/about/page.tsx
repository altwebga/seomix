import { AboutMe } from "@/components/about-me";
import { ModalImage } from "@/components/modal-image";
import diploma_page_01 from "@/public/images/diploma_page_01.webp";
import diploma_page_02 from "@/public/images/diploma_page_02.webp";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>О нас</h1>
      <AboutMe />
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
