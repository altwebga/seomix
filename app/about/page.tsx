import AboutMe from "@/components/AboutMe";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="mt-6">
      <h1 className={title()}>Обо мне</h1>
      <AboutMe/>
    </div>
  );
}
