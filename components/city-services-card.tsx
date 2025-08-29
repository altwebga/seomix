import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CityServicesCardProps = {
  servicesTitle: string;
  servicesDescription: string;
};

export function CityServicesCard({
  servicesTitle,
  servicesDescription,
}: CityServicesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{servicesTitle}</CardTitle>
      </CardHeader>
      <CardContent>{servicesDescription}</CardContent>
    </Card>
  );
}
