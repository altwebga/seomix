import { LogoCloud } from "../thegridcn";
import { getCustomers } from "@/actions/get-content";

export async function ClientLogo() {
  const data = await getCustomers();

  const logos = data.map((item) => ({
    title: item.title,
    logo: item.logo,
  }));
  return (
    <section className="px-4 py-12">
      <div className="container mx-auto">
        <LogoCloud logos={logos} label="Нам доверяют" speed="slow" />
      </div>
    </section>
  );
}
