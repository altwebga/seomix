"use client";

import { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";

import { ClientCard } from "../card/client-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Image } from "@/config/types";

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

type Client = {
  id: number | string;
  title: string;
  content: string;
  cover_image: Image;
};

interface ClientsCarouselProps {
  customers: Client[];
}

export function ClientsCarousel({ customers }: ClientsCarouselProps) {
  const autoplay = useRef(
    AutoScroll({
      speed: 1,
      startDelay: 100,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[autoplay.current]}
    >
      <CarouselContent>
        {customers.map((client) => (
          <CarouselItem
            key={client.id}
            className="pl-1 md:basis-1/3 lg:basis-1/6"
          >
            <div className="p-2">
              <ClientCard
                title={client.title}
                direction={client.content}
                logo={`${imageUrl}/${client.cover_image}`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
