"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3";

type HeadingProps = {
  title: string;
  subtitle?: string;
  level?: HeadingLevel;
  className?: string;
};

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const titleBlurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const subtitleSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export function Heading({
  title,
  subtitle,
  level = "h1",
  className,
}: HeadingProps) {
  const TitleTag =
    level === "h1" ? motion.h1 : level === "h2" ? motion.h2 : motion.h3;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <TitleTag
        variants={titleBlurIn}
        className={cn("text-4xl md:text-6xl font-bold leading-none", className)}
      >
        {title}
      </TitleTag>
      {subtitle && (
        <motion.p
          variants={subtitleSlideUp}
          className={cn(
            "text-lg text-muted-foreground max-w-3xl mt-4",
            className,
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
