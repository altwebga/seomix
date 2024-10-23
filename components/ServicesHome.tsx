"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";

export function ServicesHome() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getPosts(4, 12).then((posts) => {
      setPosts(posts);
    });
  });
  if (!posts) {
    return <div>Загружаю...</div>;
  }
  return (
    <section className="mt-12 flex flex-col md:flex-row gap-8 justify-between">
      <div className="flex-1">
        <h2>Какие услуги я предлагаю</h2>
        <p>
          Работайте с единым подрядчиком для всех Ваших интернет-активностей.
          Когда ответственность за сайт, продвижение, рекламу и социальные сети
          сосредоточена в одних руках, управление и результаты становятся
          максимально простыми и прозрачными
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full flex-1">
        {posts.map((post: Post) => (
          <AccordionItem value={`item-${post.id}`} key={post.id}>
            <AccordionTrigger className="text-lg">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
                <p className="m-0 p-0">{post.title.rendered}</p>
                <span className="text-green-500 mr-4">{post.acf?.price}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <p>{post.acf?.price}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
