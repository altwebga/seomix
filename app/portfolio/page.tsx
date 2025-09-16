import { Card, CardHeader, CardFooter } from "@/components/ui/card";

import { getContentLite } from "@/actions/get-content";
import Link from "next/link";
import Image from "next/image";
import { getDirectusImage } from "@/lib/get-directus-image";

export default async function PortfolioPage() {
  const { content } = await getContentLite("portfolio");
  if (!content) {
    return <p>not found</p>;
  }

  // сортировка: от новых к старым
  const sortedCases = content.sort(
    (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return (
    <section className="container mx-auto p-4">
      <h1>Услуги</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {sortedCases.map((caseItem) => (
          <Link href={`portfolio/${caseItem.slug}`} key={caseItem.id}>
            <Card className="transition delay-10 duration-50 ease-linear hover:-translate-y-1 hover:scale-102">
              <CardHeader>
                <Image
                  src={getDirectusImage(caseItem.cover_image?.id, {
                    width: 600,
                    height: 600,
                    fit: "inside",
                  })}
                  alt={caseItem.title}
                  width={600}
                  height={600}
                  property="false"
                  className="w-full h-full rounded-md"
                />
              </CardHeader>
              <CardFooter>
                <h3>{caseItem.title}</h3>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
