import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

const CallToAction = () => {
  return (
    <div className="py-12 px-8 bg-stone-950 rounded-2xl shadow-sm">
      <h2 className="text-white py-2 text-4xl">Обсудим ваш проект?</h2>
      <p className="text-white py-2 max-w-4xl">
        Не ждите идеального момента или подходящего времени — начинайте прямо
        сейчас!
      </p>
      <p className="text-white max-w-4xl">
        Свяжитесь со мной, и я помогу воплотить ваши идеи в реальность.
      </p>
      <Button
        href="/contact"
        as={Link}
        color="primary"
        showAnchorIcon
        variant="solid"
        className="mt-6"
      >
        Начать проект
      </Button>
    </div>
  );
};

export default CallToAction;
