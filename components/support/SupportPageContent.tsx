"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight, Clock, Mail, Phone } from "lucide-react";
import { type FormEvent, useCallback, useRef, useState } from "react";

import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const CONTACT_EMAIL = "jppartsintl@gmail.com";
const CONTACT_PHONE = "(905) 555-0142";
const HOURS = "Mon–Fri 9AM – 5PM EST";

function ContactCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 280, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my]
  );

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const rowClass =
    "flex gap-4 rounded-xl border border-border/40 bg-background/50 p-4 transition-colors hover:border-primary/35 hover:bg-muted/30 dark:border-border/35 dark:bg-[rgb(22_22_22)]/50 dark:hover:bg-muted/20";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay: 0.1 }}
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
          scale: 1.02,
          boxShadow:
            "0 32px 64px -14px rgba(0, 163, 255, 0.22), 0 20px 48px -22px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <h2 className="mb-6 border-b border-white/15 pb-4 text-base font-bold uppercase tracking-[0.2em] text-foreground dark:border-white/10">
          Get in Touch
        </h2>
        <ul className="flex flex-col gap-3">
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className={cn(rowClass, "group")}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary dark:bg-primary/20">
                <Mail className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <p className="mt-0.5 break-all text-base font-semibold text-foreground transition group-hover:text-primary">
                  {CONTACT_EMAIL}
                </p>
              </div>
            </a>
          </li>
          <li>
            <a href={`tel:${CONTACT_PHONE.replace(/\D/g, "")}`} className={cn(rowClass, "group")}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#ff0033]/12 text-[#ff0033] dark:bg-[#ff0033]/18">
                <Phone className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Phone
                </p>
                <p className="mt-0.5 text-base font-semibold text-foreground transition group-hover:text-[#ff0033]">
                  {CONTACT_PHONE}
                </p>
              </div>
            </a>
          </li>
          <li>
            <div className={rowClass}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-gold/15 text-accent-gold dark:bg-accent-gold/20">
                <Clock className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Business Hours
                </p>
                <p className="mt-0.5 text-base font-semibold text-foreground">{HOURS}</p>
              </div>
            </div>
          </li>
        </ul>
        <p className="mt-6 text-center text-sm font-medium italic leading-relaxed text-muted-foreground">
          From one enthusiast to another — we read every message.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function SupportPageContent() {
  const [partDescription, setPartDescription] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = {
      partDescription,
      make,
      model,
      year,
      email,
      notes,
      submittedAt: new Date().toISOString(),
    };
    console.log("[Support] Part request:", payload);
    setShowSuccess(true);
    window.setTimeout(() => setShowSuccess(false), 4500);
  }

  const fieldClass =
    "w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-base font-medium text-foreground shadow-inner outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/25 dark:border-border/55 dark:bg-[rgb(22_22_22)]";

  return (
    <div className="flex min-h-screen flex-col">
      <Header isHome={false} />
      <main className="relative flex-1 overflow-hidden border-t border-border/30 bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.55]"
        >
          <div className="absolute -left-1/4 top-0 h-[50vh] w-[70vw] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.07)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.1)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-[40vh] w-[60vw] max-w-2xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,31,63,0.08)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,31,63,0.12)_0%,transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8 lg:pb-32 lg:pt-12">
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-8 flex items-center gap-2 text-base font-medium text-muted-foreground sm:mb-10"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
            <span className="font-semibold text-foreground">Support</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="mb-12 text-4xl font-bold tracking-tight text-foreground sm:mb-14 sm:text-5xl md:text-6xl"
          >
            Support
          </motion.h1>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <motion.section
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease }}
              className="lg:col-span-7"
            >
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Order Parts
              </h2>
              <p className="mt-3 text-lg font-medium text-muted-foreground sm:text-xl">
                Need a hard-to-find part? Request it here
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6 rounded-2xl border border-border/50 bg-card/40 p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-border/40 dark:bg-[rgb(18_18_18)]/40 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] sm:p-8"
              >
                <div>
                  <label htmlFor="part-desc" className="mb-2 block text-base font-semibold text-foreground">
                    Part Name / Description
                  </label>
                  <textarea
                    id="part-desc"
                    name="partDescription"
                    rows={4}
                    value={partDescription}
                    onChange={(e) => setPartDescription(e.target.value)}
                    placeholder="Describe the part, OEM number if you know it, condition…"
                    className={cn(fieldClass, "min-h-[120px] resize-y")}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="make" className="mb-2 block text-base font-semibold text-foreground">
                      Make
                    </label>
                    <input
                      id="make"
                      name="make"
                      type="text"
                      autoComplete="organization"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      placeholder="e.g. Mazda"
                      className={cn(fieldClass, "h-12")}
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="mb-2 block text-base font-semibold text-foreground">
                      Model
                    </label>
                    <input
                      id="model"
                      name="model"
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="e.g. Protege5"
                      className={cn(fieldClass, "h-12")}
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="year" className="mb-2 block text-base font-semibold text-foreground">
                      Year
                    </label>
                    <input
                      id="year"
                      name="year"
                      type="text"
                      inputMode="numeric"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 2002"
                      className={cn(fieldClass, "h-12")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-base font-semibold text-foreground">
                      Your Email <span className="text-[#ff0033]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={cn(fieldClass, "h-12")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="mb-2 block text-base font-semibold text-foreground">
                    Additional Notes{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Shipping region, timeline, links to photos…"
                    className={cn(fieldClass, "min-h-[88px] resize-y")}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.01,
                    boxShadow:
                      "0 0 32px rgba(0, 31, 63, 0.45), 0 12px 40px -12px rgba(0, 51, 102, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className={cn(
                    "w-full rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition",
                    "bg-gradient-to-r from-[#001f3f] via-[#002a52] to-[#003366]",
                    "hover:from-[#00264d] hover:via-[#003366] hover:to-[#004080]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001f3f]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  Submit Request
                </motion.button>
              </form>
            </motion.section>

            <aside className="lg:col-span-5">
              <ContactCard />
            </aside>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-none fixed bottom-8 left-1/2 z-[300] w-[min(100%-2rem,28rem)] -translate-x-1/2 px-4"
          >
            <div
              className={cn(
                "pointer-events-auto rounded-2xl border border-primary/35 bg-card/95 px-5 py-4 text-center shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl",
                "dark:border-primary/40 dark:bg-[rgb(22_22_22)]/95 dark:shadow-[0_28px_56px_-14px_rgba(0,0,0,0.55)]"
              )}
            >
              <p className="text-lg font-semibold text-foreground">Request received</p>
              <p className="mt-1 text-base font-medium text-muted-foreground">
                We&apos;ll follow up by email as soon as we can.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
