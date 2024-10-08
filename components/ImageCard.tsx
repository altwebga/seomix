"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { getImages } from "@/actions/getImages";
import Image from "next/image";
import { deleteImage } from "@/actions/deleteImage";
import { ImageType } from "@/lib/types";

export function ImageCard() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getImages();
        if (data) {
          setImages(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке изображений:", error);
      }
    }
    fetchImages();
  }, [refresh]); // Добавляем refresh в зависимости useEffect

  // Функция для удаления изображения и последующей перезагрузки списка
  const handleDelete = async (id: string, s3Key: string) => {
    try {
      await deleteImage(id, s3Key);
      // Успешное удаление: перезагружаем список изображений
      setRefresh((prev) => !prev); // Триггерим изменение состояния, чтобы перезагрузить данные
    } catch (error) {
      console.error("Ошибка при удалении изображения:", error);
    }
  };

  if (images.length === 0) {
    return (
      <div>
        <p className="text-center">Изображения не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((image) => (
        <Card key={image.id} className="w-full h-full relative">
          <Button
            onClick={() => handleDelete(image.id, image.s3Key)}
            className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded"
          >
            ✖
          </Button>

          <CardContent className="p-0 relative">
            <div className="w-full h-64 relative">
              <Image
                width={300}
                height={300}
                src={image.url}
                alt="image"
                className="object-cover w-full h-full"
                priority={false}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
