"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

import type { CatalogProduct } from "@/lib/home-catalog";
import { addToCartGradientClasses } from "@/lib/add-to-cart-styles";
import { imageSrc } from "@/lib/asset-version";
import { routeParamFromInternalId, type ProductDetail } from "@/lib/products";
import { priceStringToCents } from "@/lib/price";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

type Props = {
  product: ProductDetail;
  recommended: CatalogProduct[];
};

function productImageSrc(path: string): string {
  return path.startsWith("/") ? imageSrc(path) : path;
}

export function ProductDetailClient({ product, recommended }: Props) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const mainImageSrc = productImageSrc(product.image);

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        image: mainImageSrc,
        priceFormatted: product.price,
        unitPriceCents: priceStringToCents(product.price),
      },
      qty
    );
    openDrawer();
  };

  return (
    <div className="border-t border-border/40 bg-background pb-20 pt-6 md:pb-28 md:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-base font-medium">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-primary"
          >
            <ChevronLeft className="size-4" aria-hidden />
            Back
          </Link>
          <span className="text-muted-foreground/50" aria-hidden>
            /
          </span>
          <Link
            href="/"
            className="text-muted-foreground transition hover:text-primary"
          >
            Home
          </Link>
          <span className="text-muted-foreground/50" aria-hidden>
            /
          </span>
          <span className="text-muted-foreground">Store</span>
          <span className="text-muted-foreground/50" aria-hidden>
            /
          </span>
          <span className="line-clamp-1 font-semibold text-foreground">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border/50 shadow-[0_0_0_1px_rgba(0,163,255,0.06),0_24px_64px_-28px_rgba(0,0,0,0.35)] dark:border-border/40 dark:shadow-[0_0_0_1px_rgba(0,163,255,0.1),0_32px_80px_-32px_rgba(0,0,0,0.55)]"
          >
            <div className="relative aspect-square w-full bg-background sm:aspect-[5/4] lg:aspect-square">
              <Image
                src={mainImageSrc}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-4xl font-bold tabular-nums text-primary sm:text-5xl">
                {product.price}
              </p>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.specs.length > 0 ? (
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 dark:border-border/40 dark:bg-muted/15">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Specifications
                </h2>
                <dl className="space-y-2.5">
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex justify-between gap-4 border-b border-border/40 pb-2.5 last:border-0 last:pb-0 dark:border-border/30"
                    >
                      <dt className="text-base font-medium text-muted-foreground">
                        {s.label}
                      </dt>
                      <dd className="text-base font-semibold text-foreground">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold text-muted-foreground">
                  Qty
                </span>
                <div className="flex items-center rounded-xl border border-border/60 bg-background dark:border-border/50 dark:bg-[rgb(26_26_26)]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="flex size-11 items-center justify-center text-foreground transition hover:text-primary disabled:opacity-40"
                    disabled={qty <= 1}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-[2.5rem] text-center text-base font-semibold tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="flex size-11 items-center justify-center text-foreground transition hover:text-primary"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              <motion.button
                type="button"
                onClick={handleAdd}
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 0 36px -4px rgba(0, 180, 255, 0.55), 0 12px 32px -8px rgba(0, 100, 200, 0.45)",
                }}
                whileTap={{
                  scale: 0.97,
                  boxShadow:
                    "0 0 44px 6px rgba(0, 200, 255, 0.5), 0 0 28px 4px rgba(0, 160, 255, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 480, damping: 28 }}
                className={cn(
                  "h-14 w-full rounded-full px-8 text-lg font-semibold sm:flex-1",
                  addToCartGradientClasses(
                    "h-14 w-full rounded-full px-8 text-lg font-semibold sm:flex-1"
                  )
                )}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>

        <section className="mt-16 border-t border-border/40 pt-12 md:mt-20 md:pt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
            You may also like
          </h2>
          <div
            className={cn(
              "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden"
            )}
          >
            {recommended.map((p) => (
              <MotionLink
                key={p.id}
                href={`/products/${routeParamFromInternalId(p.id)}`}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className={cn(
                  "w-[72vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border/50 bg-card",
                  "shadow-sm transition-shadow duration-300",
                  "hover:border-primary/40 hover:shadow-[0_0_0_1px_rgba(0,163,255,0.18),0_20px_48px_-16px_rgba(0,163,255,0.28),0_8px_24px_-8px_rgba(255,0,51,0.12)]",
                  "dark:border-border/40 dark:bg-[rgb(24_24_24)]"
                )}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={productImageSrc(p.image)}
                    alt={p.name}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 text-base font-semibold leading-snug">
                    {p.name}
                  </p>
                  <p className="mt-2 text-lg font-bold text-primary">
                    {p.price}
                  </p>
                </div>
              </MotionLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
