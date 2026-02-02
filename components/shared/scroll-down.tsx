"use client";

import { motion } from "motion/react";
import { MouseIcon } from "lucide-react";

export function ScrollDown() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="hidden md:flex items-center gap-2 text-muted-foreground"
    >
      <p>Скольте вниз</p>
      <MouseIcon className="w-6 h-6" />
    </motion.div>
  );
}
