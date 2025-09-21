"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ContactForm } from "./contact-form";

export function ModalForm() {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsMobile();

  if (!isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"default"} size={"lg"}>
            Начать проект
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Заявка на проект</DialogTitle>
            <DialogDescription className="mb-0">
              Оставьте ваши контактные данные. Я свяжусь с вами в течении 15
              минут.
            </DialogDescription>
          </DialogHeader>
          <ContactForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"default"} size={"lg"}>
          Начать проект
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Заявка на проект</DrawerTitle>
          <DrawerDescription>
            Оставьте ваши контактные данные. Я свяжусь с вами в течении 15
            минут.
          </DrawerDescription>
        </DrawerHeader>
        <ContactForm onSuccess={() => setOpen(false)} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Отмена
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
