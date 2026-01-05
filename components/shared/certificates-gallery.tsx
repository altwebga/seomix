"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DirectusImage } from "@/components/shared/directus-image";

type Certificate = {
  directus_files_id: string;
};

type CertificatesGalleryProps = {
  certificates?: Certificate[];
};

export function CertificatesGallery({
  certificates,
}: CertificatesGalleryProps) {
  if (!certificates?.length) return null;

  return (
    <div className="mt-6">
      <p className="text-sm mb-2 text-muted-foreground">Сертификаты</p>

      <div className="grid grid-cols-2 gap-3">
        {certificates.map((cert) => (
          <Dialog key={cert.directus_files_id}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <DirectusImage
                  url={cert.directus_files_id}
                  width={160}
                  height={160}
                  className="w-auto h-40"
                />
              </button>
            </DialogTrigger>

            <DialogContent className="md:min-w-[1024px] p-2">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DirectusImage
                url={cert.directus_files_id}
                width={1200}
                height={1200}
                className="w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
