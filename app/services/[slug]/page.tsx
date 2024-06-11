'use client'
import { notFound } from "next/navigation";
import { Services } from "@/config/services";
import { ServiceItem } from "@/types";
import { Image } from "@nextui-org/image";
import { title } from "@/components/primitives";
import ContactForm from "@/components/ContactForm";
import { Modal, useDisclosure, ModalContent, ModalHeader,ModalBody} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface ServiceDetailProps {
  params: {
    slug: string;
  };
}

const ServiceDetail = ({ params }: ServiceDetailProps) => {
  const item: ServiceItem | undefined = Services.find(
    (p) => p.slug === params.slug
  );

  if (!item) {
    notFound();
  }
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="my-6">
      <h1 className={title({ size: "md"})}>{item.title}</h1>
      <div className="flex flex-col md:flex-row gap-4 py-6">
        <div>
          <p className="max-w-lg py-6">{item.description}</p>
          <Button onPress={onOpen}>Заказать услугу</Button>
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
        </div>
        <Image src={item.image ? item.image.src : item.image} width={400} />
      </div>
    </div>
  );
};

export default ServiceDetail;
