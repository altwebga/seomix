import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactRequestDialog } from "@/features/contact-request/ui/contact-request-dialog";

interface CallToActionCardProps {
  className?: string;
}

export function CallToActionCard({ className }: CallToActionCardProps) {
  return (
    <div className={cn(className)}>
      <Card className="bg-[url(/images/pattern.min.svg)] bg-no-repeat bg-top min-h-[25vh]">
        <CardHeader>
          <CardTitle>
            <h3>Обсудим ваш проект?</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="max-w-2xl">
            Не ждите идеального момента или подходящего времени — начинайте
            прямо сейчас! Свяжитесь со мной, и я помогу воплотить ваши идеи в
            реальность.
          </p>
        </CardContent>
        <CardFooter>
          <ContactRequestDialog trigger="Начать проект" />
        </CardFooter>
      </Card>
    </div>
  );
}
