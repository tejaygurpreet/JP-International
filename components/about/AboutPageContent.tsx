"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";

import { Header } from "@/components/Header";
import { imageSrc } from "@/lib/asset-version";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

/** Shared frame for About imagery — matches homepage card polish */
const aboutImageFrame =
  "overflow-hidden rounded-2xl border border-border/50 bg-muted/[0.35] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] ring-1 ring-inset ring-black/[0.04] dark:bg-transparent dark:shadow-[0_24px_48px_-18px_rgba(0,0,0,0.42)] dark:ring-white/[0.06]";

const QUICK_LINKS = [
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/support", label: "Contact Us" },
] as const;

function QuickLinksCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), springConfig);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx.set(px);
      my.set(py);
    },
    [mx, my]
  );

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.12 }}
      className="lg:sticky lg:top-28"
      style={{ perspective: 1100 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className={cn(
          "rounded-2xl border p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
          "border-white/25 bg-white/[0.12] backdrop-blur-xl",
          "dark:border-white/10 dark:bg-[rgb(18_18_18)]/55 dark:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]",
          "transition-shadow duration-300 will-change-transform"
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.03,
          boxShadow:
            "0 32px 64px -14px rgba(0, 163, 255, 0.28), 0 20px 48px -22px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        <h2 className="mb-5 border-b border-white/15 pb-4 text-base font-bold uppercase tracking-[0.2em] text-foreground dark:border-white/10">
          Quick Links
        </h2>
        <ul className="space-y-0.5">
          {QUICK_LINKS.map((item) => (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-2.5 rounded-xl px-3 py-3 text-base font-semibold transition-colors duration-200",
                  "text-muted-foreground hover:bg-[#00a3ff]/10 hover:text-[#00a3ff]",
                  "dark:hover:bg-[#00a3ff]/15 dark:hover:text-[#00a3ff]"
                )}
              >
                <span
                  className="text-[#00a3ff]/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00a3ff]"
                  aria-hidden
                >
                  •
                </span>
                <span className="transition-colors duration-200 group-hover:text-[#00a3ff] group-hover:underline group-hover:underline-offset-4">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function AboutPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isHome={false} />
      <main className="relative flex-1 overflow-hidden border-t border-border/30 bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.55]"
        >
          <div className="absolute -left-1/4 top-0 h-[50vh] w-[70vw] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.07)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.1)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-[40vh] w-[60vw] max-w-2xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.08)_0%,transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8 lg:pb-32 lg:pt-12">
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-8 flex items-center gap-2 text-base font-medium text-muted-foreground sm:mb-10"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#00a3ff]"
            >
              Home
            </Link>
            <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
            <span className="font-medium text-foreground">About Us</span>
          </motion.nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.05 }}
                className="mb-10 text-4xl font-bold tracking-[0.12em] text-foreground sm:mb-12 sm:text-5xl md:text-6xl lg:mb-14"
              >
                ABOUT US
              </motion.h1>

              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="space-y-8 text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed"
              >
                <motion.p variants={fadeUp}>
                  JP Parts International LTD. was first established as JP
                  Protege Parts by a new Mazda Enthusiast in 2012. Back then JP
                  only sold parts occasionally as a means to modify, build and
                  race his Mazda Protege. JP was doing 3 jobs to put himself
                  through University while keeping his passion alive for these fun
                  little cars. Once he graduated from university, he decided to
                  pursue parts sales as his full time career and incorporate the
                  business in May 2017. Since the incorporation he has branched
                  out into other platforms and makes and models to diversify our
                  reach to the car communities in a global scale.
                </motion.p>
                <motion.p variants={fadeUp}>
                  JP takes the time to continue to learn about these cars,
                  platforms and the communities to provide you with the best
                  possible online parts retail experience on the market.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="font-medium text-foreground"
                >
                  JP Parts International LTD. from one enthusiast to another.
                </motion.p>
              </motion.div>

              <motion.section
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease }}
                className="mt-14 border-t border-border/50 pt-14 sm:mt-16 sm:pt-16 lg:mt-20 lg:pt-20"
              >
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:mb-10 sm:text-4xl">
                  Family owned and operated.
                </h2>
                <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10 lg:gap-12">
                  <motion.div
                    className={cn(
                      "relative aspect-[29/35] w-full md:max-w-[min(100%,440px)] md:shrink-0",
                      aboutImageFrame
                    )}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <Image
                      src={imageSrc("/images/about-owners.jpg")}
                      alt="JP Parts owners"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 440px"
                    />
                  </motion.div>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center border-l-2 border-[#00a3ff]/25 pl-6 md:pl-8">
                    <p className="text-lg italic leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
                      JP takes the time to continue to learn about these cars,
                      platforms and the communities to provide you with the best
                      possible online parts retail experience on the market.
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>

            <aside className="lg:col-span-4">
              <QuickLinksCard />
            </aside>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease }}
            className="mt-16 w-full sm:mt-20 lg:mt-24"
          >
            <div
              className={cn(
                "relative aspect-[2/1] min-h-[200px] w-full sm:min-h-[240px] md:aspect-[2.2/1] md:min-h-[280px]",
                aboutImageFrame
              )}
            >
              <Image
                src={imageSrc("/images/about-family.jpg")}
                alt="The extended JP Parts International team and family"
                fill
                className="object-cover object-[center_35%]"
                sizes="(max-width: 1280px) 100vw, 1152px"
                priority={false}
              />
            </div>
            <figcaption className="mx-auto mt-5 max-w-3xl px-1 text-center text-base font-medium leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              The JP Parts family — growing with every community we serve, from
              one enthusiast to another.
            </figcaption>
          </motion.figure>
        </div>
      </main>
    </div>
  );
}
