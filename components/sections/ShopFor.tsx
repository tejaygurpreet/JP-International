"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SHOP_CATEGORIES } from "@/lib/home-catalog";
import { imageSrc } from "@/lib/asset-version";
import { cn } from "@/lib/utils";

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

export function ShopFor() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.15"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  return (
    <section
      id="shop-for"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border/40 bg-background py-16 md:py-24 lg:py-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
        style={{ y: bgY }}
      >
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.08)_0%,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.12)_0%,transparent_50%)]" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:mb-12 sm:text-4xl md:text-5xl"
        >
          Shop For
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:gap-6"
        >
          {SHOP_CATEGORIES.map((cat, index) => (
            <motion.div key={cat.slug} variants={tileVariants}>
              <Link
                href="/coming-soon"
                className={cn(
                  "group relative block aspect-[5/4] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm",
                  "transition-[transform,box-shadow] duration-300 will-change-transform",
                  "hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/40",
                  "hover:shadow-[0_0_0_1px_rgba(0,163,255,0.2),0_24px_48px_-12px_rgba(0,163,255,0.25),0_12px_32px_-8px_rgba(255,0,51,0.12)]",
                  "dark:border-border/40 dark:bg-[rgb(22_22_22)]",
                  "dark:hover:shadow-[0_0_0_1px_rgba(0,163,255,0.25),0_28px_56px_-14px_rgba(0,163,255,0.32),0_16px_40px_-10px_rgba(255,0,51,0.18)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <Image
                  src={imageSrc(cat.image)}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={index < 3}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent dark:from-black/85 dark:via-black/30"
                  aria-hidden
                />
                <span
                  className={cn(
                    "absolute bottom-4 left-4 right-4 text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] transition-[text-shadow,color] duration-300 md:text-2xl",
                    "group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.35),0_0_32px_rgba(0,163,255,0.25)]"
                  )}
                >
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
