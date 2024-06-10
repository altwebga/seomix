import PortfolioCard from "@/components/PortfolioCard";
import { title,subtitle } from "@/components/primitives";

export default function PortfolioPage() {

  const showWorkId = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]; // массив ID карточек, которые нужно отображать
  return (
    <div className="my-6">
      <h1 className={title()}>Мои работы</h1>
      <p className={subtitle()}>2014 – 2024</p>
      <div className="mt-6">
      <PortfolioCard showWorkId={showWorkId}/>
      </div>
    </div>
  );
}
