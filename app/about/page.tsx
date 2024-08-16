import { Image } from "@nextui-org/image";

import { About } from "@/components/about";
import { CallAction } from "@/components/call-action";
import DiplomaImage1 from "@/public/images/diploma_page_01.webp";
import DiplomaImage2 from "@/public/images/diploma_page_02.webp";

export default function AboutPage() {
  return (
    <div>
      <h1>Обо мне</h1>
      <About />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Image alt="diploma" height={424} src={DiplomaImage1.src} width={600} />
        <Image alt="diploma" height={424} src={DiplomaImage2.src} width={600} />
      </div>
      <CallAction />
    </div>
  );
}
