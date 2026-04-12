"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

import type { Testimonial } from "@/lib/testimonials";
import { Stars } from "@/components/testimonials/TestimonialCard";
import { cn } from "@/lib/utils";

export function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!testimonial) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [testimonial, onClose]);

  useEffect(() => {
    if (!testimonial) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [testimonial]);

  return (
    <AnimatePresence mode="wait">
      {testimonial && (
        <motion.div
          key={testimonial.id}
          role="presentation"
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            aria-label="Close testimonial"
            className="absolute inset-0 bg-background/60 backdrop-blur-md dark:bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className={cn(
              "relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_32px_64px_-24px_rgba(0,0,0,0.35)] dark:border-border/45 dark:bg-[rgb(22_22_22)] dark:shadow-[0_40px_80px_-28px_rgba(0,0,0,0.65)]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/50 px-6 pb-4 pt-5 dark:border-border/40">
              <div className="min-w-0 flex-1">
                <h2
                  id="testimonial-modal-title"
                  className="text-xl font-bold tracking-tight text-foreground"
                >
                  {testimonial.author}
                </h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {testimonial.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {typeof testimonial.rating === "number" && (
                  <Stars value={testimonial.rating} />
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-border/60 bg-muted/50 p-2 text-foreground transition hover:bg-muted dark:border-border/50 dark:bg-muted/30"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[min(60vh,28rem)] overflow-y-auto px-6 py-5">
              {testimonial.recommendLine && (
                <p className="mb-3 text-base font-semibold text-primary">
                  {testimonial.recommendLine}
                </p>
              )}
              <p className="text-lg leading-relaxed text-foreground">
                {testimonial.text}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
