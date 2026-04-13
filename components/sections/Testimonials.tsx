"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { TestimonialHomeCard } from "@/components/testimonials/TestimonialHomeCard";
import { TestimonialModal } from "@/components/testimonials/TestimonialModal";
import { buttonVariants } from "@/components/ui/button";
import type { Testimonial } from "@/lib/testimonials";
import { TESTIMONIALS } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const HOME_COUNT = 4;

export function Testimonials() {
  const items = TESTIMONIALS.slice(0, HOME_COUNT);
  const [active, setActive] = useState<Testimonial | null>(null);

  return (
    <section
      id="testimonials"
      className="relative border-t border-border/40 bg-muted/20 py-14 dark:bg-muted/10 sm:py-16 md:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl lg:text-5xl"
        >
          What Our Customers Say
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 xl:grid-cols-4"
        >
          {items.map((t) => (
            <TestimonialHomeCard
              key={t.id}
              t={t}
              onReadMore={() => setActive(t)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <Link
            href="/testimonials"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 min-h-12 rounded-full border-primary/40 px-8 hover:border-primary hover:bg-primary/10 hover:text-primary"
            )}
          >
            More
          </Link>
        </motion.div>
      </div>

      <TestimonialModal
        testimonial={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
