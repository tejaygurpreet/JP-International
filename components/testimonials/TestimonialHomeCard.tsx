"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import type { Testimonial } from "@/lib/testimonials";
import { Stars } from "@/components/testimonials/TestimonialCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function TestimonialHomeCard({
  t,
  onReadMore,
}: {
  t: Testimonial;
  onReadMore: () => void;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "flex aspect-square flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/90 p-4 shadow-xl shadow-black/10 transition-[transform,box-shadow] duration-300 dark:border-border/40 dark:bg-[rgb(22_22_22)]/90 dark:shadow-2xl dark:shadow-black/50 sm:p-5",
        "hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,163,255,0.15),0_12px_32px_-12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_24px_56px_-18px_rgba(0,163,255,0.12),0_16px_40px_-14px_rgba(0,0,0,0.45)]"
      )}
    >
      <div className="mb-2 flex shrink-0 items-start justify-between gap-2">
        <Quote
          className="size-6 shrink-0 text-primary/35 dark:text-primary/45"
          aria-hidden
        />
        {typeof t.rating === "number" && (
          <Stars value={t.rating} size="sm" />
        )}
      </div>
      {t.recommendLine && (
        <p className="mb-1.5 line-clamp-2 text-xs font-semibold text-primary sm:text-sm">
          {t.recommendLine}
        </p>
      )}
      <p className="min-h-0 flex-1 line-clamp-3 text-sm leading-snug text-foreground sm:text-[15px] sm:leading-relaxed">
        {t.text}
      </p>
      <div className="mt-3 shrink-0 border-t border-border/50 pt-3 dark:border-border/35">
        <p className="truncate text-sm font-bold text-foreground">{t.author}</p>
        <p className="truncate text-xs font-medium text-muted-foreground">
          {t.date}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 h-9 w-full rounded-full border-primary/35 text-xs font-semibold hover:bg-primary/10 hover:text-primary"
          onClick={onReadMore}
        >
          Read more
        </Button>
      </div>
    </motion.article>
  );
}
