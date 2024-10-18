import {PortfolioContent} from "@/components/PortfolioContent";

export default function PortfolioSinglePage({ params }: { params: { slug: string } }) {
    return (
    <div>
    <PortfolioContent slug={params.slug} />
    </div>
    )
  }