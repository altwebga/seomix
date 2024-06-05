import AboutMe from "@/components/AboutMe";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>Обо мне</h1>
      <AboutMe/>
    </div>
  );
}
