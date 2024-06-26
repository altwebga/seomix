import AboutMe from "@/components/AboutMe";
import CallToAction from "@/components/CallToAction";
import { title } from "@/components/primitives";
import DiplomaPage01 from "@/public/images/diploma_page_01.webp";
import DiplomaPage02 from "@/public/images/diploma_page_02.webp";
import ImageModal from "@/components/ImageModal";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Обо мне',
  description: 'Описание страницы обо мне',
  openGraph: {
    title: 'Обо мне - My Site',
    description: 'Описание страницы обо мне',
    images: [
      {
        url: DiplomaPage01.src,
        width: 800,
        height: 600,
        alt: 'Diploma Page 01'
      },
    ],
  },
};


export default function AboutPage() {
  return (
    <div className="my-6">
      <h1 className={title()}>Обо мне</h1>
      <AboutMe />
      <div className="flex flex-col md:flex-row gap-2 py-6 justify-center">
        <div className="md:w-1/2">
          <ImageModal src={DiplomaPage01 ? DiplomaPage01.src : DiplomaPage01} original={1024} thumbnail={512}/>
        </div>
        <div className="md:w-1/2">
          <ImageModal src={DiplomaPage02 ? DiplomaPage02.src : DiplomaPage02} original={1024} thumbnail={512}/>
        </div>
      </div>
      <CallToAction />
    </div>
  );
}
