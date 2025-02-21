import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function AdminPage() {
  return (
    <div className="container mx-auto px-4">
      <h1>Админ панель</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3>Записи</h3>
          <Button asChild>
            <Link href="/admin/posts/add">Создать запись</Link>
          </Button>
        </div>
        <div>
          <h3>Пользователи</h3>
        </div>
        <div>
          <h3>Изображения</h3>
        </div>
      </div>
    </div>
  );
}
