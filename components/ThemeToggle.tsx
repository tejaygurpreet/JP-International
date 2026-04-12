"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <motion.div
      className="inline-flex items-center justify-center"
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="relative size-8 min-h-8 min-w-8 overflow-hidden rounded-full border-border/80 bg-background/80 shadow-sm backdrop-blur-sm dark:bg-card/60"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ rotate: isDark ? 0 : 90, opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Moon className="size-[18px] text-primary" aria-hidden />
        </motion.span>
        <motion.span
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ rotate: isDark ? -90 : 0, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sun className="size-[18px] text-accent-gold" aria-hidden />
        </motion.span>
      </Button>
    </motion.div>
  );
}
