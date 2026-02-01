import { cn } from "@/lib/utils";

export function SidebarContainer({
  children,
  className,
  sidebar,
}: {
  children: React.ReactNode;
  className?: string;
  sidebar: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        `container mx-auto mt-20 flex flex-col md:flex-row gap-4`,
        className,
      )}
    >
      <div className="w-full md:w-3/4">{children}</div>
      <aside className="w-full md:w-1/4">{sidebar}</aside>
    </div>
  );
}
