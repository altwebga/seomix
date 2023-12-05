"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Nav from "./Nav";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <p>Меню</p>
      </NavbarContent>
      <Nav />
      <NavbarBrand>
          <p className="font-bold text-inherit">SEOMIX</p>
      </NavbarBrand>
    </Navbar>
  );
}
