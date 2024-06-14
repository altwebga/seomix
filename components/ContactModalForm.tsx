// components/ContactModalForm.tsx
'use client';

import { Modal, useDisclosure, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import ContactForm from "@/components/ContactForm";

const ContactModalForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" className="mt-6">Заказать услугу</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl">Заказать услугу</ModalHeader>
              <ModalBody>
                <ContactForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactModalForm;
