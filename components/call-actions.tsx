import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModalForm } from "./modal-form";

export function CallAction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Обсудим ваш проект?</CardTitle>
      </CardHeader>
      <CardContent className="max-w-2xl">
        Не ждите идеального момента или подходящего времени — начинайте прямо
        сейчас! Свяжитесь со мной, и я помогу воплотить ваши идеи в реальность.
      </CardContent>
      <CardFooter>
        <ModalForm />
      </CardFooter>
    </Card>
  );
}
