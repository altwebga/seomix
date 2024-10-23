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
    getPosts(3, 12).then((posts) => {
      setPosts(posts);
    });
  });
  if (!posts) {
    return <div>Загружаю...</div>;
  }
  return (
    <section className="mt-12">
      <h2>Какие услуги я предлагаю</h2>
      <Accordion type="single" collapsible className="w-full">
        {posts.map((post: Post) => (
          <AccordionItem value={`item-${post.id}`} key={post.id}>
            <AccordionTrigger>{post.title.rendered}</AccordionTrigger>
            <AccordionContent>
              <p>{post.content.rendered}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
