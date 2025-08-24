import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CityServicesCardProps = {
  cardTitle: string;
  cardDescription: string;
};

export function CityServicesCard({
  cardTitle,
  cardDescription,
}: CityServicesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{cardDescription}</CardContent>
    </Card>
  );
}
