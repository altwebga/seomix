'use client';
import { Modal, useDisclosure, ModalContent, ModalBody } from "@nextui-org/modal";
import { Image } from "@nextui-org/image";

interface ImageModalProps {
  src: string,
  thumbnail: number,
  original: number
}

const ImageModal: React.FC<ImageModalProps> = ({ src, thumbnail, original }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Image
        src={src}
        width={thumbnail}
        onClick={onOpen}
        style={{ cursor: 'pointer' }}
      />
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        size="5xl"
        backdrop="opaque"
        isDismissable={true}
      >
        <ModalContent>
          <ModalBody>
            <Image src={src} width={original} className="p-6"/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
