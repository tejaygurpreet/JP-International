"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { ProductCard } from "@/components/sections/ProductCard";
import { NEW_CATALOG_PRODUCTS } from "@/lib/home-catalog";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 4;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export function NewProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(NEW_CATALOG_PRODUCTS.length / PAGE_SIZE) - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  const sliceStart = page * PAGE_SIZE;
  const visible = NEW_CATALOG_PRODUCTS.slice(
    sliceStart,
    sliceStart + PAGE_SIZE
  );

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const goNext = useCallback(
    () => setPage((p) => Math.min(maxPage, p + 1)),
    [maxPage]
  );

  return (
    <section
      id="new-products"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border/40 bg-background py-16 md:py-24 lg:py-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15"
        style={{ y: decorY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#ff0033]/10 blur-3xl dark:bg-[#ff0033]/12"
        style={{ y: decorY }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            New Product Catalogue
          </motion.h2>
          <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
            <Link
              href="/coming-soon"
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-border/70 bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition",
                "hover:border-primary/45 hover:text-primary hover:shadow-[0_0_28px_-6px_rgba(0,163,255,0.35)]",
                "dark:border-border/50 dark:bg-[rgb(22_22_22)] dark:hover:shadow-[0_0_32px_-6px_rgba(0,163,255,0.25)]"
              )}
            >
              View All
            </Link>
            <motion.button
              type="button"
              aria-label="Previous products"
              disabled={page <= 0}
              whileHover={{ scale: page <= 0 ? 1 : 1.05 }}
              whileTap={{ scale: page <= 0 ? 1 : 0.96 }}
              onClick={goPrev}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/90 text-foreground shadow-sm backdrop-blur-sm transition",
                "hover:border-primary/40 hover:shadow-[0_0_24px_-6px_rgba(0,163,255,0.35)]",
                "disabled:pointer-events-none disabled:opacity-35",
                "dark:border-border/50 dark:bg-[rgb(22_22_22)]"
              )}
            >
              <ChevronLeft className="size-5" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Next products"
              disabled={page >= maxPage}
              whileHover={{ scale: page >= maxPage ? 1 : 1.05 }}
              whileTap={{ scale: page >= maxPage ? 1 : 0.96 }}
              onClick={goNext}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/90 text-foreground shadow-sm backdrop-blur-sm transition",
                "hover:border-primary/40 hover:shadow-[0_0_24px_-6px_rgba(0,163,255,0.35)]",
                "disabled:pointer-events-none disabled:opacity-35",
                "dark:border-border/50 dark:bg-[rgb(22_22_22)]"
              )}
            >
              <ChevronRight className="size-5" />
            </motion.button>
          </div>
        </div>

        <motion.div
          key={page}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div
          className="mt-6 flex justify-center gap-1.5 lg:hidden"
          aria-hidden
        >
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === page
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/35"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
