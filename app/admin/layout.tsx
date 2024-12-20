import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { AppSidebar } from "@/components/shared/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const BreadcrumbAdmin = dynamic(
  () =>
    import("@/components/shared/breadcrumb-admin").then(
      (mod) => mod.BreadcrumbAdmin
    ),
  { ssr: false }
);

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
    return null; // Чтобы остановить рендеринг
  }

  if (session?.user.role !== "ADMIN") {
    redirect("/dashboard");
    return null; // Чтобы остановить рендеринг
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbAdmin />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
