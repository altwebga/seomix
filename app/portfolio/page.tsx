import PortfolioCard from "@/components/PortfolioCard";
import { title } from "@/components/primitives";

export default function PortfolioPage() {
  return (
    <div>
      <h1 className={title()}>Мои работы</h1>
      <PortfolioCard/>
    </div>
  );
}
