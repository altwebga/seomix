import { Card, CardHeader, CardFooter } from "@/components/ui/card";

import { getCasesLite } from "@/actions/get-cases";
import Link from "next/link";
import Image from "next/image";

export default async function PortfolioPage() {
  const { cases } = await getCasesLite();
  if (!cases) {
    return <p>not found</p>;
  }

  // сортировка: от новых к старым
  const sortedCases = cases.sort(
    (a, b) =>
      new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()
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
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}/${
                    caseItem.image.id
                  }`}
                  alt={caseItem.title}
                  width={300}
                  height={300}
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
