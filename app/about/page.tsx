import { Container } from "@/components/layout/container";

export default function AboutPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">О нас</h1>
        <p className="text-lg text-muted-foreground">
          Здесь будет информация о нашей компании и команде.
        </p>
      </div>
    </Container>
  );
}
