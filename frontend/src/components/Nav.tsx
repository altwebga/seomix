import { NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";

export default function Nav() {
  const menuItems = [
    { title: "Услуги", url: "/services" },
    { title: "Мои работы", url: "/portfolio" },
    { title: "Обо мне", url: "/about" },
    { title: "Контакты", url: "/contact" },
  ];

  return (
    <NavbarMenu className="md:w-[20%]">
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={
              index === 2
                ? "primary"
                : index === menuItems.length - 1
                ? "danger"
                : "foreground"
            }
            className="w-full"
            href={item.url}
            size="lg"
          >
            {item.title}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
}
