"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { addToCartGradientClasses } from "@/lib/add-to-cart-styles";
import { imageSrc } from "@/lib/asset-version";
import { priceStringToCents } from "@/lib/price";
import { routeParamFromInternalId } from "@/lib/products";
import { cn } from "@/lib/utils";
import type { CatalogProduct } from "@/lib/home-catalog";
import { formatMoneyFromCadCents } from "@/store/useCurrencyStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
};

function productHref(product: CatalogProduct) {
  return `/products/${routeParamFromInternalId(product.id)}`;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const region = useCurrencyStore((s) => s.region);
  const href = productHref(product);
  const isCs = product.comingSoon === true;

  const cadCents = priceStringToCents(product.price);
  const displayPrice =
    product.price === "—" || isCs
      ? "—"
      : formatMoneyFromCadCents(cadCents, region);

  const imgSrc = product.image.startsWith("/")
    ? imageSrc(product.image)
    : product.image;

  return (
    <motion.article
      variants={cardVariants}
      className={cn("h-full", className)}
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/80",
          "shadow-xl shadow-black/10 dark:shadow-2xl dark:shadow-black/60",
          "transition-[transform,box-shadow,border-color] duration-300 will-change-transform",
          !isCs &&
            "hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_0_0_1px_rgba(0,163,255,0.12),0_20px_48px_-16px_rgba(0,163,255,0.22),0_12px_32px_-12px_rgba(255,0,51,0.12)]",
          !isCs &&
            "dark:border-border/40 dark:bg-[rgb(24_24_24)]/90 dark:hover:shadow-[0_0_0_1px_rgba(0,163,255,0.18),0_24px_56px_-18px_rgba(0,163,255,0.28),0_16px_40px_-14px_rgba(255,0,51,0.15)]",
          isCs && "opacity-[0.92]"
        )}
      >
        {isCs ? (
          <div className="block cursor-not-allowed">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted/40">
              <Image
                src={imgSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-80 dark:from-[rgb(15_15_15)]/60"
                aria-hidden
              />
            </div>
            <h3 className="line-clamp-2 min-h-[2.75rem] px-4 pt-4 text-lg font-semibold leading-snug tracking-tight text-muted-foreground sm:px-5 sm:text-xl">
              Coming Soon
            </h3>
          </div>
        ) : (
          <Link href={href} className="block">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted/40">
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={imgSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60 dark:from-[rgb(15_15_15)]/50"
                aria-hidden
              />
            </div>
            <h3 className="line-clamp-2 min-h-[2.75rem] px-4 pt-4 text-lg font-semibold leading-snug tracking-tight text-foreground sm:px-5 sm:text-xl">
              {product.name}
            </h3>
            {product.description ? (
              <p className="line-clamp-3 px-4 pb-1 text-sm leading-relaxed text-muted-foreground sm:px-5">
                {product.description}
              </p>
            ) : null}
          </Link>
        )}
        <div className="flex flex-1 flex-col gap-3 p-4 pt-3 sm:p-5 sm:pt-3">
          <div className="mt-auto flex flex-col gap-3">
            <p className="text-xl font-semibold tabular-nums tracking-tight text-primary sm:text-2xl">
              {displayPrice}
            </p>
            <motion.button
              type="button"
              disabled={isCs}
              whileHover={isCs ? undefined : { scale: 1.02 }}
              whileTap={isCs ? undefined : { scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                if (isCs) return;
                addItem(
                  {
                    id: product.id,
                    name: product.name,
                    image: product.image.startsWith("/")
                      ? imageSrc(product.image)
                      : product.image,
                    priceFormatted: product.price,
                    unitPriceCents: priceStringToCents(product.price),
                  },
                  1
                );
                useToastStore.getState().show("Added to cart!");
              }}
              className={cn(
                "w-full rounded-2xl py-3 text-lg font-semibold transition",
                isCs
                  ? "cursor-not-allowed border border-border/60 bg-muted/50 text-muted-foreground shadow-md dark:bg-muted/20"
                  : addToCartGradientClasses(
                      "w-full rounded-2xl py-3 text-lg font-semibold"
                    )
              )}
            >
              {isCs ? "Coming Soon" : "Add to Cart"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
