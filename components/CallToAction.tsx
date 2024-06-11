import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

const CallToAction = () => {
  return (
    <div className="py-12 px-8 bg-stone-950 rounded-2xl shadow-sm">
      <h2 className="text-white py-2 text-4xl">Обсудим ваш проект?</h2>
      <p className="text-white py-2">Не знаете что нужно для быстрого старта в интернете?</p>
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
