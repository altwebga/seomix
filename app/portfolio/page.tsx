import { PortfolioCard } from "@/components/portfolio-card";
import { getCases } from "@/config/fetch";
export default async function PortfolioPage() {
  const casesData = await getCases();

  return (
    <div>
      <h1>Мои работы</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {casesData.map((item) => (
          <PortfolioCard
            key={item.id}
            businessCategory={item.acf.businessCategory}
            image={item.featured_media_url}
            logo={item.logo_url}
            slug={item.slug}
            title={item.title.rendered}
          />
        ))}
      </div>
    </div>
  );
}
