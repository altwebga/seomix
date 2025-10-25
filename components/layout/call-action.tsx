import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "../form/contact-form";
import { cn } from "@/lib/utils";

interface CallActionProps {
  className?: string;
}

export function CallAction({ className }: CallActionProps) {
  return (
    <div className={cn(className)}>
      <Card
        className={
          "bg-[url(/images/pattern.min.svg)] bg-no-repeat bg-top min-h-[25vh]"
        }
      >
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
          <ContactForm trigger="Начать проект" />
        </CardFooter>
      </Card>
    </div>
  );
}
