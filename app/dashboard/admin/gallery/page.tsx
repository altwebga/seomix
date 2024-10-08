import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/ImageCard";

export default function GalleryPage() {
  return (
    <div>
      <Button asChild variant="outline">
        <Link href="/dashboard/admin/add-image">Добавить изображение</Link>
      </Button>
      <ImageCard />
    </div>
  );
}
