"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { imageSrc } from "@/lib/asset-version";
import { cn } from "@/lib/utils";
import { routeParamFromInternalId } from "@/lib/products";
import {
  filterSearchProducts,
  type SearchProduct,
} from "@/lib/search-catalog";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import type { CurrencyRegion } from "@/store/useCurrencyStore";
import {
  REGION_FLAGS,
  useCurrencyStore,
} from "@/store/useCurrencyStore";
import { selectCartCount, useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";

function SearchDropdown({
  open,
  query,
  results,
  onPick,
}: {
  open: boolean;
  query: string;
  results: SearchProduct[];
  onPick: () => void;
}) {
  const q = query.trim();
  return (
    <AnimatePresence>
      {open && q.length > 0 && (
        <motion.div
          role="listbox"
          aria-label="Search suggestions"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[60] overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:border-border/50 dark:bg-card/95 dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)]"
        >
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-semibold text-[#111111] dark:text-foreground">
                No matching parts found
              </p>
              <p className="mt-1.5 text-xs font-medium text-[#111111]/65 dark:text-muted-foreground">
                Coming soon
              </p>
            </div>
          ) : (
            <ul className="max-h-[min(70vh,420px)] divide-y divide-zinc-100 overflow-auto py-1 dark:divide-border/50">
              {results.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/products/${routeParamFromInternalId(p.id)}`}
                    onClick={onPick}
                    className="group flex gap-3 px-3 py-2.5 transition hover:bg-zinc-100 dark:hover:bg-muted/70"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-border/50 dark:bg-muted/40">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold text-[#111111] group-hover:text-[#001f3f] dark:text-foreground dark:group-hover:text-primary">
                        {p.name}
                      </p>
                      <p className="text-sm text-[#111111]/65 dark:text-muted-foreground">
                        {p.brand} · {p.sku}
                      </p>
                      <p className="mt-0.5 text-base font-semibold tabular-nums text-[#001f3f] dark:text-primary">
                        {p.price}
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Primary nav (homepage + mobile drawer) — order: Home | About Us | Blog | Support */
const HEADER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
] as const;

export interface HeaderProps {
  /** `true` = homepage: transparent until scroll ≥ 80px, then navy pill. `false` = inner pages: always navy pill. */
  isHome?: boolean;
}

const SCROLL_PILL_THRESHOLD = 80;

const LOGO_SRC = imageSrc("/images/logo.png");

export function Header({ isHome: isHomePage = false }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const cartCount = useCartStore(selectCartCount);
  const cartAnimationGeneration = useCartStore((s) => s.cartAnimationGeneration);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const currencyRegion = useCurrencyStore((s) => s.region);
  const setCurrencyRegion = useCurrencyStore((s) => s.setRegion);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const themeMode = useThemeStore((s) => s.theme);
  const isLight = themeMode === "light";

  useBodyScrollLock(mobileOpen);

  useEffect(() => {
    setResults(filterSearchProducts(query));
  }, [query]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!searchWrapRef.current?.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!currencyRef.current?.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const lenis = useLenis();
  const [homeScrolled, setHomeScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;
    function readY() {
      const y =
        lenis?.scroll ??
        (typeof window !== "undefined" ? window.scrollY : 0);
      setHomeScrolled(y >= SCROLL_PILL_THRESHOLD);
    }
    readY();
    window.addEventListener("scroll", readY, { passive: true });
    const offLenis = lenis?.on("scroll", readY);
    return () => {
      window.removeEventListener("scroll", readY);
      offLenis?.();
    };
  }, [isHomePage, lenis]);

  /** Top of homepage: full-width transparent bar over hero */
  const floating = isHomePage && !homeScrolled;
  /** Inner routes OR homepage after scrolling: inset navy pill (matches inner pages) */
  const navyPill = !isHomePage || homeScrolled;
  /** Light theme + hero top bar: black typography (#111111) on bright hero */
  const heroLightFloating = floating && isLight;

  const heroTrayIcon = cn(
    "inline-flex !h-8 !w-8 !min-h-8 !min-w-8 shrink-0 items-center justify-center rounded-full !p-0 backdrop-blur-md transition-colors [&_svg]:size-[18px] [&_svg]:shrink-0",
    isLight
      ? "border border-black/10 !bg-white/80 text-[#111111] shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:!bg-white/90"
      : "border border-white/20 !bg-black/70 text-white hover:!bg-black/85"
  );

  const solidLightTrayIcon = cn(
    "inline-flex !h-8 !w-8 !min-h-8 !min-w-8 shrink-0 items-center justify-center rounded-full !p-0 transition-colors [&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:!text-white",
    "border border-white/25 !bg-white/10 !text-white hover:!bg-white/20"
  );

  const onDarkChrome = floating || navyPill;

  const navLinkClass = cn(
    "group relative rounded-lg py-2 font-semibold transition-colors duration-300",
    navyPill
      ? "px-1.5 text-[15px] sm:px-2 sm:text-base"
      : "px-2 text-lg sm:px-2.5",
    heroLightFloating
      ? "text-[#111111] hover:text-black"
      : onDarkChrome
        ? "text-white/90 hover:text-white"
        : "text-muted-foreground hover:text-foreground"
  );

  return (
    <>
      {navyPill && (
        <div className="h-20 shrink-0 sm:h-[5.25rem]" aria-hidden />
      )}
      <header
        className={cn(
          "top-0 z-50 w-full ease-out",
          "transition-all duration-300",
          navyPill && "fixed left-0 right-0 border-transparent bg-transparent pt-3 shadow-none sm:pt-4",
          floating && "fixed left-0 right-0 border-transparent bg-transparent shadow-none"
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex h-16 max-w-7xl items-center gap-2 sm:gap-3",
            "transition-all duration-300 ease-out",
            navyPill
              ? "max-w-[min(100%-1.25rem,80rem)] rounded-3xl border border-white/10 bg-[#001f3f] px-3 text-white shadow-[0_16px_44px_-14px_rgba(0,15,35,0.65),0_6px_22px_-6px_rgba(0,31,63,0.45)] sm:px-4 lg:max-w-7xl lg:px-6"
              : "px-4 sm:px-6 lg:px-8"
          )}
        >
          <div className="flex min-w-0 shrink-0 items-center gap-2.5">
            <Link
              href="/"
              aria-label="JP Parts International"
              className={cn(
                "group inline-flex shrink-0 items-center gap-2.5 transition hover:opacity-90",
                floating && "drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] dark:shadow-[0_2px_14px_rgba(0,0,0,0.45)] dark:ring-white/15">
                <Image
                  src={LOGO_SRC}
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                  priority={isHomePage}
                />
              </span>
              <span
                className={cn(
                  "max-w-[10rem] font-extrabold leading-tight tracking-[0.1em] sm:max-w-none sm:text-sm md:text-base lg:text-lg",
                  heroLightFloating ? "text-[#111111]" : "text-white"
                )}
              >
                JP PARTS INTL
              </span>
            </Link>
          </div>

          <div
            ref={searchWrapRef}
            className="relative hidden min-w-0 flex-1 px-2 md:block md:max-w-xl md:flex-none lg:max-w-2xl lg:flex-1 lg:px-6"
          >
            <label className="relative block">
              <span className="sr-only">Search parts</span>
              <div className="relative overflow-hidden rounded-full">
                <Search
                  className={cn(
                    "pointer-events-none absolute left-4 top-1/2 z-20 size-[18px] -translate-y-1/2",
                    heroLightFloating
                      ? "text-[#111111]/55"
                      : onDarkChrome
                        ? "text-white/65"
                        : "text-muted-foreground"
                  )}
                  aria-hidden
                />
                <input
                  type="search"
                  autoComplete="off"
                  placeholder="Search parts, models, brands..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  className={cn(
                    "relative z-10 h-12 w-full rounded-full border py-2 pl-12 pr-5 text-base font-medium shadow-inner outline-none transition-all duration-300",
                    floating && heroLightFloating
                      ? "border-black/15 bg-white/60 text-[#111111] placeholder:text-[#111111]/50 focus:border-black/25 focus:bg-white/85 focus:ring-2 focus:ring-[#00a3ff]/35"
                      : floating
                        ? "border-white/25 bg-transparent text-white placeholder:text-white/55 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#00a3ff]/35"
                        : navyPill
                          ? "border-white/25 bg-white/10 text-white placeholder:text-white/55 focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-[#00a3ff]/45"
                          : "border-border/80 bg-card text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(0,163,255,0.2),0_0_24px_-4px_rgba(0,163,255,0.35)] dark:border-border/60 dark:bg-[rgb(26_26_26)] dark:focus:shadow-[0_0_0_3px_rgba(0,163,255,0.15),0_0_28px_-4px_rgba(0,163,255,0.25)]"
                  )}
                />
                {/* iOS-style moving shine — behind field; pointer-events-none passes clicks through */}
                <span
                  className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-full"
                  aria-hidden
                >
                  <motion.span
                    className={cn(
                      "absolute inset-y-0 left-0 w-[min(48%,10rem)] skew-x-[-14deg] bg-gradient-to-r from-transparent to-transparent",
                      heroLightFloating
                        ? "via-white/[0.62]"
                        : "via-white/[0.32] dark:via-white/[0.18]"
                    )}
                    initial={false}
                    animate={{ x: ["-35%", "280%"] }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: [0.22, 1, 0.36, 1],
                      repeatDelay: 1.1,
                    }}
                    style={{ mixBlendMode: "soft-light" }}
                  />
                </span>
              </div>
            </label>
            <SearchDropdown
              open={searchOpen}
              query={query}
              results={results}
              onPick={closeSearch}
            />
          </div>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-end gap-0 lg:flex"
            aria-label="Primary"
          >
            {HEADER_NAV_LINKS.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && (
                  <span
                    className={cn(
                      "select-none px-1 font-light tabular-nums",
                      heroLightFloating
                        ? "text-base text-[#111111]/30"
                        : navyPill
                          ? "text-sm text-white/35"
                          : onDarkChrome
                            ? "text-base text-white/30"
                            : "text-muted-foreground/45"
                    )}
                    aria-hidden
                  >
                    |
                  </span>
                )}
                <Link href={link.href} className={navLinkClass}>
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className="absolute inset-x-1 -bottom-px h-px scale-x-0 bg-gradient-to-r from-primary via-[#ff0033] to-primary opacity-0 transition group-hover:scale-x-100 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </Fragment>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                heroLightFloating &&
                  "text-[#111111] hover:bg-black/5 hover:text-black",
                !heroLightFloating &&
                  onDarkChrome &&
                  "text-white/90 hover:bg-white/10 hover:text-white"
              )}
              aria-label="Open search"
              onClick={() => {
                setMobileOpen(true);
                requestAnimationFrame(() =>
                  document.getElementById("mobile-search-field")?.focus()
                );
              }}
            >
              <Search className="size-5" />
            </Button>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  floating
                    ? heroTrayIcon
                    : navyPill
                      ? solidLightTrayIcon
                      : "text-muted-foreground hover:text-foreground hover:shadow-[0_0_20px_-4px_rgba(0,163,255,0.45)]"
                )}
                aria-label="Account"
              >
                <User />
              </Button>
              <div className="relative hidden sm:block" ref={currencyRef}>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold sm:px-3 sm:text-sm",
                    onDarkChrome
                      ? heroLightFloating
                        ? "border border-black/15 bg-white/70 text-[#111111] hover:bg-white/90"
                        : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                      : "border border-border/70 text-foreground hover:bg-muted"
                  )}
                  aria-expanded={currencyOpen}
                  aria-haspopup="listbox"
                  aria-label="Change country and currency"
                  onClick={() => setCurrencyOpen((o) => !o)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="text-base leading-none"
                      aria-hidden
                    >
                      {REGION_FLAGS[currencyRegion]}
                    </span>
                    <span>
                      {currencyRegion === "CA"
                        ? "CAD"
                        : currencyRegion === "US"
                          ? "USD"
                          : "EUR"}
                    </span>
                  </span>
                  <ChevronDown className="size-3.5 opacity-80" aria-hidden />
                </Button>
                {currencyOpen && (
                  <ul
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+6px)] z-[70] min-w-[11rem] overflow-hidden rounded-xl border border-zinc-200/90 bg-white py-1 text-sm shadow-xl dark:border-border/50 dark:bg-[rgb(22_22_22)]"
                  >
                    {(
                      [
                        { id: "CA" as CurrencyRegion, label: "Canada (CAD)" },
                        { id: "US" as CurrencyRegion, label: "USA (USD)" },
                        { id: "EU" as CurrencyRegion, label: "Europe (EUR)" },
                      ] as const
                    ).map((opt) => (
                      <li key={opt.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={currencyRegion === opt.id}
                          className={cn(
                            "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-[#111111] transition hover:bg-zinc-100",
                            "dark:text-white dark:hover:bg-white/10",
                            currencyRegion === opt.id &&
                              "bg-zinc-100 font-semibold text-[#111111] dark:bg-[#001f3f]/25 dark:text-white"
                          )}
                          onClick={() => {
                            setCurrencyRegion(opt.id);
                            setCurrencyOpen(false);
                          }}
                        >
                          <span
                            className="text-lg leading-none"
                            aria-hidden
                          >
                            {REGION_FLAGS[opt.id]}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <motion.div
                key={cartAnimationGeneration}
                className="relative inline-flex"
                initial={{ scale: 1, rotate: 0 }}
                animate={
                  cartAnimationGeneration > 0
                    ? {
                        scale: [1, 1.14, 1],
                        rotate: [0, -10, 10, -5, 0],
                        filter: [
                          "drop-shadow(0 0 0 transparent)",
                          "drop-shadow(0 0 16px rgba(0,163,255,0.85))",
                          "drop-shadow(0 0 0 transparent)",
                        ],
                      }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative",
                    floating
                      ? heroTrayIcon
                      : navyPill
                        ? solidLightTrayIcon
                        : "text-muted-foreground hover:text-foreground hover:shadow-[0_0_20px_-4px_rgba(255,0,51,0.35)]"
                  )}
                  aria-label={`Shopping cart${cartCount ? `, ${cartCount} items` : ""}`}
                  onClick={openDrawer}
                >
                  <ShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 py-0.5 text-[10px] font-bold leading-none text-white shadow-sm ring-1 ring-background">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Button>
              </motion.div>
              <div
                className={cn(
                  "hidden h-8 items-center justify-center md:flex",
                  floating &&
                    "[&>div]:flex [&>div]:h-8 [&>div]:w-8 [&>div]:items-center [&>div]:justify-center [&_button]:!h-8 [&_button]:!w-8 [&_button]:!min-h-8 [&_button]:!min-w-8 [&_button]:!rounded-full [&_button]:!p-0 [&_button]:backdrop-blur-md",
                  floating &&
                    isLight &&
                    "[&_button]:!border-black/10 [&_button]:!bg-white/80 [&_button]:!text-[#111111] [&_button]:!shadow-[0_2px_12px_rgba(0,0,0,0.08)] [&_button]:hover:!bg-white/90 [&_svg]:!text-[#111111]",
                  floating &&
                    !isLight &&
                    "[&_button]:!border-white/20 [&_button]:!bg-black/70 [&_button]:!text-white [&_button]:hover:!bg-black/85 [&_svg]:!text-white",
                  !floating &&
                    navyPill &&
                    "[&>div]:flex [&>div]:h-8 [&>div]:w-8 [&>div]:items-center [&>div]:justify-center [&_button]:!h-8 [&_button]:!w-8 [&_button]:!rounded-full [&_button]:!border-white/25 [&_button]:!bg-white/10 [&_button]:!text-white [&_button]:hover:!bg-white/20 [&_svg]:!text-white"
                )}
              >
                <ThemeToggle />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden",
                heroLightFloating &&
                  "text-[#111111] hover:bg-black/5 hover:text-black",
                !heroLightFloating &&
                  onDarkChrome &&
                  "text-white/90 hover:bg-white/10 hover:text-white"
              )}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              type="button"
              aria-label="Close menu backdrop"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card shadow-2xl dark:bg-[rgb(22_22_22)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
            >
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-4">
                <Link
                  href="/"
                  aria-label="JP Parts International"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "inline-flex min-w-0 shrink-0 items-center gap-2.5",
                    floating && "drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] dark:shadow-[0_2px_14px_rgba(0,0,0,0.45)] dark:ring-white/15">
                    <Image
                      src={LOGO_SRC}
                      alt=""
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </span>
                  <span className="max-w-[9rem] text-[0.65rem] font-extrabold leading-tight tracking-[0.1em] text-foreground sm:text-xs">
                    JP PARTS INTL
                  </span>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="size-6" />
                </Button>
              </div>
              <div className="border-b border-border/50 p-4">
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="mobile-search-field"
                    type="search"
                    autoComplete="off"
                    placeholder="Search parts, models, brands..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    className="h-12 w-full rounded-xl border border-border/80 bg-background py-2 pl-10 pr-3 text-base font-medium outline-none ring-ring/30 focus:border-primary/50 focus:ring-2 dark:bg-[rgb(26_26_26)]"
                  />
                </label>
                {query.trim().length > 0 && (
                  <div className="mt-3">
                    {results.length === 0 ? (
                      <div className="rounded-xl border border-border/50 bg-muted/20 px-3 py-6 text-center dark:bg-muted/10">
                        <p className="text-sm font-semibold text-foreground">
                          No matching parts found
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Coming soon
                        </p>
                      </div>
                    ) : (
                      <ul className="max-h-[40vh] space-y-2 overflow-auto">
                        {results.map((p) => (
                          <li key={p.id}>
                            <Link
                              href={`/products/${routeParamFromInternalId(p.id)}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex gap-3 rounded-xl border border-border/50 bg-muted/30 p-2 transition hover:border-primary/40 hover:shadow-[0_0_20px_-6px_rgba(0,163,255,0.35)]"
                            >
                              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                                <Image
                                  src={p.image}
                                  alt=""
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-base font-semibold">
                                  {p.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {p.price}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {HEADER_NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-xl font-semibold text-foreground transition hover:bg-muted/80 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-border/60 p-4">
                <div className="flex items-center justify-center gap-4">
                  <ThemeToggle />
                  <span className="text-base font-medium text-muted-foreground">
                    Theme
                  </span>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
