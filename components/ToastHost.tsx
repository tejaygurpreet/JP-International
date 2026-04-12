"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import { useToastStore } from "@/store/useToastStore";

export function ToastHost() {
  const message = useToastStore((s) => s.message);

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="pointer-events-none fixed bottom-8 left-1/2 z-[300] flex -translate-x-1/2 justify-center px-4"
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-[#001f3f]/25 bg-card px-5 py-3.5 text-base font-semibold text-foreground shadow-[0_16px_48px_-12px_rgba(0,31,63,0.35),0_0_0_1px_rgba(0,163,255,0.12)] dark:border-[#001f3f]/40 dark:bg-[rgb(22_22_22)] dark:shadow-[0_20px_56px_-16px_rgba(0,0,0,0.65)]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Check className="size-5" strokeWidth={2.5} />
            </span>
            {message}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
