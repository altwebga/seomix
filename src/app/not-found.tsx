import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 font-mono text-[10px] tracking-widest text-foreground/50">
        [ SIGNAL LOST ]
      </div>
      <h1 className="font-display text-6xl font-bold tracking-wider text-primary md:text-8xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
        404
      </h1>
      <p className="mt-4 font-display text-lg tracking-wider text-foreground/80">
        Упс!!! Сраница не существует.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button variant="default" size="lg" className="rounded-md">
            Вернуться на главную
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="lg" className="rounded-md">
            Посмотреть контакты
          </Button>
        </Link>
      </div>
    </div>
  );
}
