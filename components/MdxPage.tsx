// components/MdxPage.tsx
"use client";
import Image from "next/image";
import { FC, ReactNode } from "react";

interface MetaData {
  title: string;
  description: string;
  featureImage?: string;
}

interface MdxPageProps {
  children: ReactNode;
  metadata: MetaData;
}

const MdxPage: FC<MdxPageProps> = ({ children, metadata }) => {
  const { title, description, featureImage } = metadata;

  return (
    <article>
      <h1>{title}</h1>
      <p>{description}</p>
      {featureImage && (
        <Image src={featureImage} alt={title} width={800} height={400} />
      )}
      {children}
    </article>
  );
};

export default MdxPage;
