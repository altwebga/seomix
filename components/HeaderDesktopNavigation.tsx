import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { siteNavigation } from "@/lib/siteConfig";

export function HeaderDesktopNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-2">
          {siteNavigation.map((item) => (
            <Link href={item.href} legacyBehavior passHref key={item.href}>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "text-lg")}
              >
                {item.title}
              </NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
