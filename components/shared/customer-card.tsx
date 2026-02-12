import { DirectusImage } from "./directus-image";

type CustomerCardProps = {
  title: string;
  description: string;
  logo: string;
};

export function CustomerCard({ title, description, logo }: CustomerCardProps) {
  return (
    <div className="flex items-center gap-3">
      <DirectusImage
        url={logo}
        alt={title}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div>
        <h3 className="text-base font-medium m-0">{title}</h3>
        <p className="text-sm text-muted-foreground m-0">{description}</p>
      </div>
    </div>
  );
}
