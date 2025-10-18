import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientCardProps {
  title: string;
  direction: string;
  logo: string;
}

export function ClientCard({ title, direction, logo }: ClientCardProps) {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left">
      <Avatar className="h-14 w-14 rounded-lg">
        <AvatarImage src={logo} alt={title} />
        <AvatarFallback className="rounded-lg">LG</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left leading-tight">
        <span className="truncate font-medium">{title}</span>
        <span className="text-muted-foreground truncate text-xs">
          {direction}
        </span>
      </div>
    </div>
  );
}
