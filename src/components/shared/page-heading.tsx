import { AgentAvatar } from "../thegridcn";

export function PageHeading({
  title,
  description,
  hue = 180,
  size = 60,
}: {
  title: string;
  description: string;
  hue?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <AgentAvatar seed="" hue={hue} size={size} />
      <div>
        <h1 className="text-primary text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
