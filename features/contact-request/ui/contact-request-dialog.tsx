"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactRequestForm = dynamic(
  () => import("./contact-request-form").then((mod) => mod.ContactRequestForm),
  {
    ssr: false,
    loading: () => (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Загрузка формы...
      </div>
    ),
  }
);

interface ContactRequestDialogProps {
  trigger: string;
  className?: string;
}

export function ContactRequestDialog({
  trigger,
  className,
}: ContactRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [formInstance, setFormInstance] = useState(0);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      setFormInstance((prev) => prev + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className={cn(className)}>
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ContactRequestForm
          key={formInstance}
          onSuccess={() => {
            setOpen(false);
            setFormInstance((prev) => prev + 1);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
