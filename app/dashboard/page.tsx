import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

import { title } from "@/components/primitives";
export default function DashboardPage() {
  return (
    <div>
      <h1 className={title()}>Контент</h1>
      <Button
        as={Link}
        color="primary"
        href="/dashboard/add-post"
        variant="solid"
      >
        Добавить контент
      </Button>
    </div>
  );
}
