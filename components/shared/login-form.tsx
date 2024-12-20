import { cn } from "@/lib/utils";
import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Добро пожаловать!</CardTitle>
          <CardDescription>Войти через Яндекс или GitHub</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              {Object.values(providerMap).map((provider) => (
                <form
                  key={provider.id}
                  action={async () => {
                    "use server";
                    try {
                      await signIn(provider.id, {
                        redirectTo: "/dashboard",
                      });
                    } catch (error) {
                      if (error instanceof AuthError) {
                        return redirect(`${"/auth/error"}?error=${error.type}`);
                      }
                      throw error;
                    }
                  }}
                >
                  <Button type="submit" variant={"default"} className="w-full">
                    <span>Войти через {provider.name}</span>
                  </Button>
                </form>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Нажав продолжить, вы соглашаетесь с нашими условиями.{" "}
        <a href="#">условиями сайта</a> и{" "}
        <a href="#">политикой конфиденциальности</a>.
      </div>
    </div>
  );
}
