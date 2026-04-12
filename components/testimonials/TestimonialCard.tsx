"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export function Stars({
  value,
  size = "md",
}: {
  value: number;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={cn("flex gap-0.5 text-accent-gold", size === "sm" && "gap-px")}
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            size === "sm" ? "text-xs leading-none" : "text-lg leading-none",
            i < value ? "text-[#fbbf24]" : "text-white/15 dark:text-white/10"
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function TestimonialCard({
  t,
  className,
}: {
  t: Testimonial;
  className?: string;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border/50 bg-card/90 p-6 shadow-xl shadow-black/10 transition-[transform,box-shadow] duration-300 dark:border-border/40 dark:bg-[rgb(22_22_22)]/90 dark:shadow-2xl dark:shadow-black/50",
        "hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,163,255,0.15),0_12px_32px_-12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_24px_56px_-18px_rgba(0,163,255,0.12),0_16px_40px_-14px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <Quote
          className="size-9 shrink-0 text-primary/35 dark:text-primary/45"
          aria-hidden
        />
        {typeof t.rating === "number" && <Stars value={t.rating} />}
      </div>
      {t.recommendLine && (
        <p className="mb-2 text-base font-semibold text-primary">{t.recommendLine}</p>
      )}
      <p className="flex-1 text-lg leading-relaxed text-foreground">{t.text}</p>
      <div className="mt-6 border-t border-border/50 pt-4 dark:border-border/35">
        <p className="text-base font-bold text-foreground">{t.author}</p>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">{t.date}</p>
      </div>
    </motion.article>
  );
}
