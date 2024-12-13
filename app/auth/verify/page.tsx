import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <h1>Подтверждение</h1>
      <p className="max-w-2xl">
        На вашу почту отправлено письмо с ссылкой на вход. Пожалуйста, проверьте
        вашу почту. Если вы не получили письмо, проверьте папку Спам или
        попробуйте другой способ авторизации.
      </p>
      <Button asChild variant="default" className="mt-4">
        <Link href={"/"}>На главную</Link>
      </Button>
    </div>
  );
}
