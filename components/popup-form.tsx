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
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  phone: string;
  message?: string;
};

export function PopupForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isToastOpen, onOpenChange: onToastOpenChange } =
    useDisclosure(); // Для управления всплывающим уведомлением
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isAgreementChecked) {
      return; // Если чекбокс не отмечен, не отправляем форму
    }

    setLoading(true);
    // Имитация отправки формы
    const result = await new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 1000)
    );

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      onOpenChange(false); // Закрытие основного модального окна
      onToastOpenChange(true); // Открытие уведомления
    } else {
      setSuccess(false);
      onToastOpenChange(true); // Открытие уведомления с ошибкой
    }
  };

  return (
    <>
      <Button color="primary" size="lg" onPress={onOpen}>
        Узнать стоимость
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        isDismissable={!loading} // Запрещаем закрытие во время загрузки
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Перезвоните мне
              </ModalHeader>
              <ModalBody>
                {success === true ? (
                  <p className="text-green-600">Форма успешно отправлена!</p>
                ) : (
                  <>
                    <Input
                      endContent={
                        <FaRegUserCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Ваше имя"
                      placeholder="Тони Старк"
                      type="text"
                      variant="bordered"
                      {...register("name", {
                        required: "Пожалуйста, введите имя",
                      })}
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                    />
                    <Input
                      endContent={
                        <FaMobile className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Номер телефона"
                      placeholder="+7 (999) 999-99-99"
                      type="text"
                      variant="bordered"
                      {...register("phone", {
                        required: "Пожалуйста, введите номер телефона",
                        pattern: {
                          value: /^\+?[1-9]\d{1,14}$/,
                          message: "Некорректный номер телефона",
                        },
                      })}
                      isInvalid={!!errors.phone}
                      errorMessage={errors.phone?.message}
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        isSelected={isAgreementChecked}
                        onValueChange={setIsAgreementChecked}
                      >
                        Согласен(а) на обработку персональных данных
                      </Checkbox>
                    </div>
                  </>
                )}
              </ModalBody>
              {success === null && (
                <ModalFooter className="flex justify-between">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Отмена
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={loading || !isAgreementChecked}
                    isLoading={loading}
                  >
                    Отправить
                  </Button>
                </ModalFooter>
              )}
            </form>
          )}
        </ModalContent>
      </Modal>
      {/* Всплывающее уведомление */}
      <Modal
        isOpen={isToastOpen}
        placement="bottom-center"
        onOpenChange={() => onToastOpenChange(false)}
        backdrop="transparent"
        hideCloseButton
        isDismissable={true} // Позволяем закрыть уведомление нажатием
      >
        <ModalContent>
          <ModalBody>
            <p>
              {success === true
                ? "Форма успешно отправлена!"
                : "Ошибка при отправке формы. Попробуйте позже."}
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
