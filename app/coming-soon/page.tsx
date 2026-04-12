import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/Header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Coming Soon | JP Parts International",
  description:
    "We're working hard to bring you more premium JDM parts — check back soon.",
};

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-muted/30 px-4 py-24 dark:bg-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, #001f3f 0%, transparent 42%), radial-gradient(circle at 70% 80%, #001f3f 0%, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#001f3f] dark:text-[#00a3ff]">
            JP Parts International
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Coming Soon
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
            We&apos;re working hard to bring you more premium JDM parts.
          </p>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-[#001f3f] px-8 text-base font-semibold text-white shadow-[0_8px_28px_-8px_rgba(0,31,63,0.45)] hover:bg-[#003366]"
            )}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
