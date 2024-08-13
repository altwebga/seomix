"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { FaRegUserCircle, FaMobile } from "react-icons/fa";

export function PopupForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Узнать стоимость
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Перезвоните мне
              </ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <FaRegUserCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Ваше имя"
                  placeholder="Тони Старк"
                  type="text"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <FaMobile className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Номер телефона"
                  placeholder="+7 (999) 999-99-99"
                  type="text"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Согласен(а) на обработку персональных данных
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Отмена
                </Button>
                <Button color="primary" onPress={onClose}>
                  Отправить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
