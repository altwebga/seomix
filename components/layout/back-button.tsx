import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
  title: string;
}

export function BackButton({ href, title }: BackButtonProps) {
  return (
    <Button variant={"outline"} size={"lg"}>
      <ArrowLeft />
      <Link href={href}>{title}</Link>
    </Button>
  );
}
