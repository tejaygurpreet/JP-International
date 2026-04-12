"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Header } from "@/components/Header";
import { buttonVariants } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export function BlogPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isHome={false} />
      <main className="relative flex-1 overflow-hidden border-t border-border/30 bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
        >
          <div className="absolute -right-1/4 top-0 h-[40vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.06)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.1)_0%,transparent_55%)]" />
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
            <span className="font-semibold text-foreground">Blog</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="mb-12 text-4xl font-bold tracking-tight text-foreground sm:mb-14 sm:text-5xl md:text-6xl"
          >
            Blog
          </motion.h1>

          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            {BLOG_POSTS.map((post) => (
              <motion.article
                id={`post-${post.id}`}
                key={post.id}
                variants={cardVariants}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl shadow-black/10 transition-[transform,box-shadow] duration-300 dark:border-border/40 dark:bg-[rgb(22_22_22)]/95 dark:shadow-2xl dark:shadow-black/55",
                  "hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,163,255,0.2),0_12px_32px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_28px_56px_-18px_rgba(0,163,255,0.15),0_16px_40px_-14px_rgba(0,0,0,0.45)]"
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/40">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-70 dark:from-[rgb(15_15_15)]/90"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <time
                    dateTime={post.date}
                    className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {post.date}
                  </time>
                  <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-5 sm:text-lg">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`#post-${post.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "default" }),
                      "mt-6 w-full justify-center border-primary/35 font-semibold sm:w-auto hover:border-primary hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    Read more
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
