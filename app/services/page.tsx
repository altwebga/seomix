import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default async function ServicesPage() {
  // Путь к папке с MDX-файлами
  const directoryPath = path.join(process.cwd(), "content/services");

  // Получаем список всех MDX-файлов
  const files = (await fs.readdir(directoryPath)).filter((file) =>
    file.endsWith(".mdx")
  );

  // Динамически импортируем каждый MDX-файл и извлекаем frontmatter
  const services = await Promise.all(
    files.map(async (file) => {
      const { frontmatter } = await import(`@/content/services/${file}`);
      return {
        filename: file,
        frontmatter,
      };
    })
  );

  return (
    <div>
      <h1>Наши услуги</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <Link
            href={`/services/${service.filename.split(".")[0]}`}
            key={service.filename}
          >
            <Card>
              <Image
                src={service.frontmatter.image}
                alt={service.frontmatter.title}
                width={400}
                height={400}
                objectFit="contain"
              />
              <CardContent>
                <h3>{service.frontmatter.title}</h3>
                <p>{service.frontmatter.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
