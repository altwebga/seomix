import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface LinkButtonProps {
  href: string;
  title: string;
}

export function LinkButton({ href, title }: LinkButtonProps) {
  return (
    <Button
      size="lg"
      className="min-w-56 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 group"
    >
      <Link href={href}>{title}</Link>
      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
}
