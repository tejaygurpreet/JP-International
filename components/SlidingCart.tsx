"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { addToCartGradientClasses } from "@/lib/add-to-cart-styles";
import { cn } from "@/lib/utils";
import { formatMoneyFromCadCents } from "@/store/useCurrencyStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { selectCartSubtotalCents, useCartStore } from "@/store/useCartStore";

export function SlidingCart() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore(selectCartSubtotalCents);
  const region = useCurrencyStore((s) => s.region);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-layer"
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close cart overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/70 backdrop-blur-md dark:bg-background/80"
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 380 }}
            className={cn(
              "absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border/60 bg-card shadow-2xl",
              "dark:border-border/50 dark:bg-[rgb(18_18_18)]"
            )}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 dark:border-border/50">
              <h2 className="text-2xl font-bold tracking-tight">
                Your Cart
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Close cart"
                onClick={closeDrawer}
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {items.length === 0 ? (
                <p className="py-12 text-center text-base font-medium text-muted-foreground">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false} mode="popLayout">
                    {items.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex gap-3 rounded-xl border border-border/50 bg-background/60 p-3 dark:border-border/40 dark:bg-[rgb(26_26_26)]/80"
                      >
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border/40">
                          <Image
                            src={line.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-base font-semibold leading-snug">
                            {line.name}
                          </p>
                          <p className="mt-1 text-base font-semibold tabular-nums text-primary">
                            {formatMoneyFromCadCents(
                              line.unitPriceCents * line.quantity,
                              region
                            )}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="flex size-8 items-center justify-center rounded-lg border border-border/60 text-foreground transition hover:border-primary/50 hover:text-primary"
                              onClick={() =>
                                updateQuantity(line.id, line.quantity - 1)
                              }
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-[2ch] text-center text-base font-semibold tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="flex size-8 items-center justify-center rounded-lg border border-border/60 text-foreground transition hover:border-primary/50 hover:text-primary"
                              onClick={() =>
                                updateQuantity(line.id, line.quantity + 1)
                              }
                            >
                              <Plus className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              className="ml-auto text-sm font-semibold text-muted-foreground underline-offset-2 hover:text-[#ff0033] hover:underline"
                              onClick={() => removeItem(line.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <div className="border-t border-border/60 bg-card/90 p-5 dark:border-border/50 dark:bg-[rgb(22_22_22)]">
              <div className="mb-4 flex items-center justify-between text-base">
                <span className="font-medium text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold tabular-nums text-foreground">
                  {formatMoneyFromCadCents(subtotal, region)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full rounded-xl border-border/70 text-lg"
                    onClick={closeDrawer}
                  >
                    Continue Shopping
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className={cn(
                      "inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-xl text-lg font-semibold",
                      addToCartGradientClasses()
                    )}
                  >
                    Checkout
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
