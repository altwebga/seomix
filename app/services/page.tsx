"use client";
import { useState, useCallback } from "react";
import { title, subtitle } from "@/components/primitives";
import { Services } from "@/config/services";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { useMemo } from "react";

const ServicesPage = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 4);
      setIsLoading(false);
    }, 500);
  }, []);

  const visibleServices = useMemo(
    () => Services.slice(0, visibleCount),
    [visibleCount]
  );

  return (
    <div className="my-6">
      <h1 className={title()}>Мои услуги</h1>
      <p className={subtitle()}>Инструменты цифрового продвижения.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleServices.map(({ id, image, title, price, description }) => (
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1024px]"
            shadow="sm"
            key={id}
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    isBlurred
                    alt={title}
                    className="object-cover"
                    height={200}
                    shadow="md"
                    src={image ? image.src : image}
                    width="100%"
                  />
                </div>
                <div className="flex flex-col col-span-6 md:col-span-8">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl font-semibold text-foreground/90">
                        {title}
                      </h3>
                      <p className="text-small text-foreground/80">{price}</p>
                      <h1 className="font-medium mt-2">{description}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      {visibleCount < Services.length && (
        <div className="flex justify-center mt-6">
          <Button
            color="primary"
            onClick={handleShowMore}
            isLoading={isLoading}
            className="my-6"
          >
            Показать ещё
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
