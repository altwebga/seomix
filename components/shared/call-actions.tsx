import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CallActionsProps {
  className?: string;
  textButton?: string;
}

export function CallActions({ className, textButton }: CallActionsProps) {
  return (
    <Card className={cn("container mx-auto", className)}>
      <CardHeader>
        <CardTitle>
          <h3>Готовы начать проект?</h3>
        </CardTitle>
        <CardDescription>
          <p>
            Свяжитесь с нами и получите бесплатную консультацию по развитию
            вашего бизнеса
          </p>
        </CardDescription>
        <CardContent>
          <Button>{textButton}</Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
