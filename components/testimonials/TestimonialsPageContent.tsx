"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Header } from "@/components/Header";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { TESTIMONIALS } from "@/lib/testimonials";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export function TestimonialsPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isHome={false} />
      <main className="relative flex-1 overflow-hidden border-t border-border/30 bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
        >
          <div className="absolute left-0 top-1/4 h-[50vh] w-[55vw] max-w-2xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.08)_0%,transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8 lg:pb-32">
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-8 flex items-center gap-2 text-base font-medium text-muted-foreground sm:mb-10"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
            <span className="font-semibold text-foreground">Testimonials</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="mb-12 text-4xl font-bold tracking-tight text-foreground sm:mb-14 sm:text-5xl md:text-6xl"
          >
            Testimonials
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
          >
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
