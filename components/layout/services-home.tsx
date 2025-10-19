import Image from "next/image";

export function ServicesHome() {
  return (
    <section className="container mx-auto p-4">
      <h2>Что мы предлагаем?</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2">Список услуг</div>
        <div className="md:w-1/2">
          <Image
            src={"/images/services.png"}
            alt="Услуги"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
