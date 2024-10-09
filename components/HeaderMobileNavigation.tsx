import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { siteNavigation } from "@/lib/siteConfig";
import { SiteNavigationType } from "@/lib/types";
import { Button } from "./ui/button";

type HeaderMobileNavigationProps = {
  userName?: string;
};

export function HeaderMobileNavigation({
  userName,
}: HeaderMobileNavigationProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Меню</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Меню</SheetTitle>
          <SheetDescription>
            {userName && `Привет, ${userName}`}
          </SheetDescription>
        </SheetHeader>
        <NavigationMenu orientation="vertical">
          <NavigationMenuList>
            <NavigationMenuItem className="flex flex-col gap-2">
              {siteNavigation.map((item: SiteNavigationType) => (
                <Link href={item.href} legacyBehavior passHref key={item.href}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <SheetClose>{item.title}</SheetClose>
                  </NavigationMenuLink>
                </Link>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}
