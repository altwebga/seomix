import { Link } from "@nextui-org/link";
export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="/"
        title="seomix"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">seomix</p>
      </Link>
    </footer>
  );
}
