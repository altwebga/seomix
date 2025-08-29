import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CityFeaturedCardProps = {
  featuredTitle: string;
  featuredDescription: string;
};

export function CityFeaturedCard({
  featuredTitle,
  featuredDescription,
}: CityFeaturedCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{featuredTitle}</CardTitle>
      </CardHeader>
      <CardContent>{featuredDescription}</CardContent>
    </Card>
  );
}
