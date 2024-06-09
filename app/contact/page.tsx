import { title } from "@/components/primitives";
import { Input, Textarea } from "@nextui-org/input";
import {
  UserIcon,
  DevicePhoneMobileIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { socialLinks } from "@/config/socialLink";
import { Link } from "@nextui-org/link";

export default function ContactPage() {
  return (
    <div className="my-5">
      <h1 className={title()}>Мои контакты</h1>
      <div className="flex flex-col md:flex-row py-6">
        <div className="w-full md:w-1/2">
          <h3 className="py-4 text-2xl">Я в социальных сетях</h3>
          <p className="py-4 max-w-lg">
            Я не публикую номер телефона т.к. не хочу попасть в базу спам
            звонков. Вы можете легко получить его перейдя в любой из моих
            социальных аккаунтов.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            {socialLinks.map((item, index) => (
              <li key={index}>
                <Link href={item.url} isExternal showAnchorIcon size="lg">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="py-4 text-2xl">Напишите мне</h3>
          <div className="flex flex-col gap-6 border border-gray-400 p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                label="Ваше имя"
                placeholder="Иван"
                labelPlacement="outside"
                startContent={<UserIcon className="w-6 h-6" />}
              />

              <Input
                type="text"
                label="Номер телефона"
                placeholder="+7 123 456 7788"
                labelPlacement="outside"
                startContent={<DevicePhoneMobileIcon className="w-6 h-6" />}
              />
            </div>
            <Textarea
              label="Ваше сообщение"
              placeholder="Сообщение"
              labelPlacement="outside"
              startContent={<PencilIcon className="w-6 h-6" />}
            />
            <Checkbox defaultSelected>
              <a href="/privacy-policy/" target="_blank">
                Согласен(а) с политикой конфиденциальности
              </a>
            </Checkbox>
            <Button color="primary">Button</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
