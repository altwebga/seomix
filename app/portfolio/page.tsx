import PortfolioCard from "@/components/PortfolioCard";
import { title,subtitle } from "@/components/primitives";

export default function PortfolioPage() {
  return (
    <div className="mt-6">
      <h1 className={title()}>Мои работы</h1>
      <p className={subtitle()}>2014 – 2024</p>
      <div className="mt-6">
      <PortfolioCard/>
      </div>
    </div>
  );
}
