import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalImageProp = {
  alt: string;
  thumbnail: string;
  large: string;
};

export function ModalImage({ thumbnail, large, alt }: ModalImageProp) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Image
          src={thumbnail}
          alt={alt}
          width={600}
          height={600}
          className="md:min-w-[600px] rounded-md shadow-lg"
        />
      </DialogTrigger>
      <DialogContent className="md:min-w-[1024px]">
        <DialogTitle>{alt}</DialogTitle>
        <Image
          src={large}
          alt=""
          width={1024}
          height={1024}
          className="w-full h-full object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
