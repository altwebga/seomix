import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Markdown } from "../handlers/markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface TeamCardProps {
  title: string;
  content: string;
  position: string;
  photo: string;
  certificates?: string[]; // массив URL изображений
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export function TeamCard({
  title,
  content,
  photo,
  position,
  certificates,
}: TeamCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* Заголовок карточки */}
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-32 w-32 rounded-lg bg-violet-500">
            <AvatarImage
              src={`${imageUrl}/${photo}`}
              alt={title}
              className="object-cover "
            />
            <AvatarFallback className="rounded-lg">
              {title.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-muted-foreground">{position}</p>
          </div>
        </div>
      </CardHeader>

      {/* Контент */}
      <CardContent>
        <Markdown markdown={content} />
      </CardContent>

      {/* Сертификаты */}
      {certificates && certificates.length > 0 && (
        <CardFooter className="flex flex-col gap-4">
          <Carousel className="w-full">
            <CarouselContent>
              {certificates.map((src, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative w-full h-60 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <Image
                          src={`${imageUrl}/${src}`}
                          alt={`certificate-${index}`}
                          className="aspect-video w-full h-full"
                          priority={false}
                          width={300}
                          height={300}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="md:min-w-[1100px]">
                      <DialogHeader>
                        <DialogTitle>Сертификат</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <div className="relative w-full md:min-w-[1024px]">
                        <Image
                          src={`${imageUrl}/${src}`}
                          alt={`certificate-full-${index}`}
                          className="object-contain w-full h-full"
                          priority={false}
                          width={1024}
                          height={1024}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardFooter>
      )}
    </Card>
  );
}
