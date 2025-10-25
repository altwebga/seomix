import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-[url(/images/bd_not_found.png)] bg-no-repeat bg-contain h-full">
      <div className="flex flex-col justify-center items-center container mx-auto p-4 h-[80vh] max-w-2xl">
        <h2 className="text-5xl text-center">Ничего не найдено</h2>
        <p className="text-center">
          Вернитесь на главную и попробуйте еще раз.
        </p>
        <Button asChild className="w-xs h-14 mt-8">
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </section>
  );
}
