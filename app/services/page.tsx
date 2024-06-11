"use client";
import { useState, useCallback, useMemo } from "react";
import { title, subtitle } from "@/components/primitives";
import { Services } from "@/config/services";
import { Button } from "@nextui-org/button";
import ServiceCard from "@/components/ServiceCard";
import { ServiceItem } from "@/types";

const ServicesPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 4);
      setIsLoading(false);
    }, 500);
  }, []);

  const visibleServices: ServiceItem[] = useMemo(
    () => Services.slice(0, visibleCount),
    [visibleCount]
  );

  return (
    <div className="my-6">
      <h1 className={title()}>Мои услуги</h1>
      <p className={subtitle()}>Инструменты цифрового продвижения.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleServices.map((service) => (
          <ServiceCard
            key={service.id}
            {...service}
          />
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
