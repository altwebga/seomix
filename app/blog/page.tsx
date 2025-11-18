import { Container } from "@/components/layout/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи и новости о SEO и веб-разработке",
};

export default function BlogPage() {
  return (
    <Container>
      <h1>Блог</h1>
      <div>
        <p>
          Здесь будут размещены статьи и новости о SEO, веб-разработке и
          цифровом маркетинге.
        </p>
      </div>
    </Container>
  );
}
