import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Войти</CardTitle>
        <CardDescription>
          Введите свои данные, чтобы войти в аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form
            action={async (formData) => {
              "use server";
              const email = formData.get("email"); // Extract email from formData
              if (!email) {
                throw new Error("Email is required");
              }
              await signIn("nodemailer", { email }); // Use the extracted email
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email" // Important to include
                type="email"
                placeholder="m@example.com"
                required
              />
              <Button type="submit" className="w-full">
                Войти по ссылке
              </Button>
            </div>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("yandex", { redirectTo: "/dashboard" });
            }}
          >
            <Button type="submit" className="w-full">
              Войти через Яндекс
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
