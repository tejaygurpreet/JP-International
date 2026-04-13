"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ProductCard } from "@/components/sections/ProductCard";
import { PERFORMANCE_PRODUCTS } from "@/lib/home-catalog";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export function PerformanceParts() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [32, -24]);

  return (
    <section
      id="performance-parts"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border/40 bg-muted/25 py-14 dark:bg-muted/10 sm:py-16 md:py-24 lg:py-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[#001f3f]/10 blur-3xl dark:bg-primary/10"
        style={{ y: decorY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/12"
        style={{ y: decorY }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Performance Parts
          </motion.h2>
          <Link
            href="/coming-soon"
            className={cn(
              "inline-flex min-h-[44px] w-max items-center justify-center rounded-full border border-border/70 bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition",
              "hover:border-primary/45 hover:text-primary hover:shadow-[0_0_28px_-6px_rgba(0,163,255,0.35)]",
              "dark:border-border/50 dark:bg-[rgb(22_22_22)] dark:hover:shadow-[0_0_32px_-6px_rgba(0,163,255,0.25)]"
            )}
          >
            View All
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6"
        >
          {PERFORMANCE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
