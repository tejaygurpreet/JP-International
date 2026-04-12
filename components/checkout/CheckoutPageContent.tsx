"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatMoneyFromCadCents,
  useCurrencyStore,
} from "@/store/useCurrencyStore";
import {
  selectCartSubtotalCents,
  useCartStore,
} from "@/store/useCartStore";

const ease = [0.22, 1, 0.36, 1] as const;

const NAVY = "#001f3f";

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
] as const;

/** Amounts in CAD cents (catalog base currency) */
const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Shipping",
    priceCadCents: 0,
    note: "Delivery in 5–10 business days · Tracking included",
  },
  {
    id: "purolator-ground",
    label: "Purolator Ground",
    priceCadCents: 1299,
    note: "",
  },
  { id: "ups-standard", label: "UPS Standard", priceCadCents: 1599, note: "" },
  {
    id: "purolator-express",
    label: "Purolator Express",
    priceCadCents: 2499,
    note: "",
  },
  { id: "fedex-ground", label: "FedEx Ground", priceCadCents: 1849, note: "" },
] as const;

function inputClass(optional = false) {
  return cn(
    "w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-base font-medium text-foreground shadow-inner outline-none transition",
    "placeholder:text-muted-foreground/70",
    "focus:border-[#001f3f]/50 focus:ring-2 focus:ring-[#001f3f]/20",
    "dark:border-border/60 dark:bg-[rgb(22_22_22)] dark:focus:border-[#001f3f]/45 dark:focus:ring-[#001f3f]/15",
    optional && "opacity-95"
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-border/50 pb-3 text-lg font-bold tracking-tight text-foreground dark:border-border/40">
      {children}
    </h2>
  );
}

function CardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] dark:border-border/45 dark:bg-[rgb(24_24_24)] dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CheckoutPageContent() {
  const openCart = useCartStore((s) => s.openDrawer);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotalCad = useCartStore(selectCartSubtotalCents);
  const region = useCurrencyStore((s) => s.region);
  const [shippingId, setShippingId] = useState<string>("standard");
  const [tip, setTip] = useState<string>("none");
  const [customTipCad, setCustomTipCad] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [discount, setDiscount] = useState("");

  const shippingCad = useMemo(() => {
    const opt = SHIPPING_OPTIONS.find((o) => o.id === shippingId);
    return opt?.priceCadCents ?? 0;
  }, [shippingId]);

  const taxCad = useMemo(
    () => Math.round(subtotalCad * 0.13),
    [subtotalCad]
  );

  const tipCad = useMemo(() => {
    if (tip === "none") return 0;
    if (tip === "custom") {
      const n = Number.parseFloat(customTipCad.replace(/[^0-9.]/g, ""));
      if (Number.isNaN(n)) return 0;
      return Math.round(n * 100);
    }
    const pct =
      tip === "10" ? 0.1 : tip === "15" ? 0.15 : tip === "20" ? 0.2 : 0;
    return Math.round(subtotalCad * pct);
  }, [tip, subtotalCad, customTipCad]);

  const totalCad = useMemo(
    () => subtotalCad + shippingCad + taxCad + tipCad,
    [subtotalCad, shippingCad, taxCad, tipCad]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 overflow-x-hidden bg-muted/30 pb-16 pt-2 dark:bg-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, ${NAVY} 0%, transparent 45%), radial-gradient(circle at 80% 80%, ${NAVY} 0%, transparent 40%)`,
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12"
          >
            {/* Form column — left on desktop */}
            <div className="order-2 min-w-0 flex-1 space-y-8 lg:order-1">
              <CardShell className="p-0 overflow-hidden">
                <div
                  className="flex items-start justify-between gap-4 border-b border-border/50 px-6 py-5 dark:border-border/40"
                  style={{
                    background: `linear-gradient(135deg, ${NAVY}08 0%, transparent 55%)`,
                  }}
                >
                  <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    JP Parts International LTD.
                  </h1>
                  <motion.button
                    type="button"
                    aria-label="Open shopping cart"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={openCart}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/50 text-[#001f3f] transition-colors hover:bg-muted dark:border-border/50 dark:bg-muted/30 dark:text-white dark:hover:bg-muted/50"
                  >
                    <ShoppingCart className="size-5" aria-hidden />
                  </motion.button>
                </div>

                <div className="space-y-8 p-6 sm:p-8">
                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Express checkout
                    </p>
                    <div className="flex flex-col gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="h-14 w-full rounded-2xl bg-[#5A31F4] text-base font-bold text-white shadow-[0_8px_24px_-8px_rgba(90,49,244,0.45)] transition hover:bg-[#6b42ff]"
                      >
                        Shop Pay
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="h-14 w-full rounded-2xl bg-[#FFC439] text-base font-bold text-[#003087] shadow-md transition hover:bg-[#ffd65c]"
                      >
                        PayPal
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] text-base font-bold text-white shadow-md transition hover:bg-[#1a1a1a]"
                      >
                        G Pay
                      </motion.button>
                    </div>
                  </div>

                  <div className="relative py-2">
                    <div
                      className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/70 dark:bg-border/50"
                      aria-hidden
                    />
                    <span className="relative mx-auto block w-max bg-card px-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground dark:bg-[rgb(24_24_24)]">
                      OR
                    </span>
                  </div>

                  <div>
                    <SectionTitle>Contact</SectionTitle>
                    <label className="mb-4 block">
                      <span className="mb-2 block text-sm font-semibold text-foreground">
                        Email
                      </span>
                      <input
                        type="email"
                        autoComplete="email"
                        className={inputClass()}
                      />
                    </label>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        className="mt-1 size-4 rounded border-border text-[#001f3f] focus:ring-[#001f3f]/30"
                      />
                      <span className="text-sm font-medium leading-snug text-foreground">
                        Email me with news and offers
                      </span>
                    </label>
                  </div>

                  <div>
                    <SectionTitle>Delivery</SectionTitle>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-foreground">
                          Country / Region
                        </span>
                        <select
                          className={cn(inputClass(), "cursor-pointer appearance-none bg-[length:1rem] pr-10")}
                          defaultValue="CA"
                        >
                          <option value="CA">Canada</option>
                          <option value="US">United States</option>
                        </select>
                      </label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            First name
                          </span>
                          <input
                            type="text"
                            autoComplete="given-name"
                            className={inputClass()}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            Last name
                          </span>
                          <input
                            type="text"
                            autoComplete="family-name"
                            className={inputClass()}
                          />
                        </label>
                      </div>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-muted-foreground">
                          Company{" "}
                          <span className="font-normal">(optional)</span>
                        </span>
                        <input type="text" className={inputClass(true)} />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-foreground">
                          Address
                        </span>
                        <input
                          type="text"
                          autoComplete="street-address"
                          className={inputClass()}
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-muted-foreground">
                          Apartment, suite, etc.{" "}
                          <span className="font-normal">(optional)</span>
                        </span>
                        <input type="text" className={inputClass(true)} />
                      </label>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <label className="block sm:col-span-1">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            City
                          </span>
                          <input type="text" className={inputClass()} />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            Province
                          </span>
                          <select
                            className={cn(
                              inputClass(),
                              "cursor-pointer appearance-none"
                            )}
                            defaultValue="Ontario"
                          >
                            {PROVINCES.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            Postal code
                          </span>
                          <input
                            type="text"
                            autoComplete="postal-code"
                            className={inputClass()}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionTitle>Shipping method</SectionTitle>
                    <ul className="space-y-3">
                      {SHIPPING_OPTIONS.map((opt) => (
                        <li key={opt.id}>
                          <label
                            className={cn(
                              "flex cursor-pointer gap-4 rounded-xl border p-4 transition",
                              shippingId === opt.id
                                ? "border-[#001f3f]/50 bg-[#001f3f]/[0.06] shadow-[0_0_0_1px_rgba(0,31,63,0.12)] dark:border-[#001f3f]/40 dark:bg-[#001f3f]/10"
                                : "border-border/60 hover:border-border dark:border-border/50"
                            )}
                          >
                            <input
                              type="radio"
                              name="shipping"
                              value={opt.id}
                              checked={shippingId === opt.id}
                              onChange={() => setShippingId(opt.id)}
                              className="mt-1 size-4 border-border text-[#001f3f] focus:ring-[#001f3f]/30"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="font-semibold text-foreground">
                                  {opt.label}
                                </span>
                                <span
                                  className={cn(
                                    "text-base font-bold tabular-nums",
                                    opt.priceCadCents === 0
                                      ? "text-emerald-600 dark:text-emerald-400"
                                      : "text-foreground"
                                  )}
                                >
                                  {opt.priceCadCents === 0
                                    ? "FREE"
                                    : formatMoneyFromCadCents(
                                        opt.priceCadCents,
                                        region
                                      )}
                                </span>
                              </div>
                              {opt.note ? (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {opt.note}
                                </p>
                              ) : null}
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <SectionTitle>Payment</SectionTitle>
                    <div
                      className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 dark:border-border/50 dark:bg-muted/15"
                    >
                      <span className="text-sm font-semibold text-foreground">
                        Credit card
                      </span>
                      <span className="ml-auto flex items-center gap-2">
                        <span className="rounded border border-border/50 bg-white px-2 py-0.5 text-[10px] font-black tracking-tight text-[#1a1f71] dark:bg-white">
                          VISA
                        </span>
                        <span className="rounded border border-border/50 bg-white px-2 py-0.5 text-[10px] font-bold tracking-tight text-[#eb001b] dark:bg-white">
                          MC
                        </span>
                        <span className="rounded border border-border/50 bg-white px-2 py-0.5 text-[10px] font-bold text-[#006fcf] dark:bg-white">
                          AMEX
                        </span>
                      </span>
                    </div>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-foreground">
                          Card number
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="0000 0000 0000 0000"
                          className={inputClass()}
                        />
                      </label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            Expiry (MM/YY)
                          </span>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            autoComplete="cc-exp"
                            className={inputClass()}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            Security code
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            className={inputClass()}
                          />
                        </label>
                      </div>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-foreground">
                          Name on card
                        </span>
                        <input
                          type="text"
                          autoComplete="cc-name"
                          className={inputClass()}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <SectionTitle>Add a tip</SectionTitle>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Thank you, we appreciate it.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          { id: "10", label: "10%" },
                          { id: "15", label: "15%" },
                          { id: "20", label: "20%" },
                          { id: "none", label: "None" },
                        ] as const
                      ).map((t) => (
                        <motion.button
                          key={t.id}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setTip(t.id)}
                          className={cn(
                            "min-h-11 rounded-full border px-5 text-sm font-bold transition",
                            tip === t.id
                              ? "border-[#001f3f] bg-[#001f3f] text-white shadow-[0_4px_16px_-4px_rgba(0,31,63,0.45)]"
                              : "border-border/70 bg-background text-foreground hover:border-[#001f3f]/40 dark:border-border/50 dark:bg-[rgb(22_22_22)]"
                          )}
                        >
                          {t.label}
                        </motion.button>
                      ))}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTip("custom")}
                        className={cn(
                          "min-h-11 rounded-full border px-5 text-sm font-bold transition",
                          tip === "custom"
                            ? "border-[#001f3f] bg-[#001f3f] text-white shadow-[0_4px_16px_-4px_rgba(0,31,63,0.45)]"
                            : "border-border/70 bg-background text-foreground hover:border-[#001f3f]/40 dark:border-border/50 dark:bg-[rgb(22_22_22)]"
                        )}
                      >
                        Custom tip
                      </motion.button>
                    </div>
                    {tip === "custom" ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4"
                      >
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-foreground">
                            Custom amount (CAD)
                          </span>
                          <input
                            type="text"
                            placeholder="$0.00 CAD"
                            value={customTipCad}
                            onChange={(e) => setCustomTipCad(e.target.value)}
                            className={inputClass()}
                          />
                        </label>
                      </motion.div>
                    ) : null}
                  </div>

                  <div className="space-y-4 border-t border-border/50 pt-6 dark:border-border/40">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={saveInfo}
                        onChange={(e) => setSaveInfo(e.target.checked)}
                        className="mt-1 size-4 rounded border-border text-[#001f3f] focus:ring-[#001f3f]/30"
                      />
                      <span className="text-sm font-medium leading-snug text-foreground">
                        Save my information for a faster checkout
                      </span>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-muted-foreground">
                        Mobile phone{" "}
                        <span className="font-normal">(optional)</span>
                      </span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        className={inputClass(true)}
                      />
                    </label>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="pt-2"
                  >
                    <Button
                      type="button"
                      className="h-14 w-full rounded-2xl bg-[#00a3ff] text-lg font-bold text-white shadow-[0_8px_28px_-8px_rgba(0,163,255,0.55)] hover:bg-[#00b8ff] dark:hover:bg-[#33b8ff]"
                    >
                      Pay now
                    </Button>
                  </motion.div>

                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-border/50 pt-6 text-center text-sm font-medium text-muted-foreground dark:border-border/40">
                    <Link
                      href="/support"
                      className="transition hover:text-[#001f3f] dark:hover:text-white"
                    >
                      Warranty and Returns
                    </Link>
                    <span className="text-border" aria-hidden>
                      |
                    </span>
                    <Link
                      href="/support"
                      className="transition hover:text-[#001f3f] dark:hover:text-white"
                    >
                      Shipping
                    </Link>
                    <span className="text-border" aria-hidden>
                      |
                    </span>
                    <Link
                      href="/support"
                      className="transition hover:text-[#001f3f] dark:hover:text-white"
                    >
                      Terms of service
                    </Link>
                  </div>
                </div>
              </CardShell>
            </div>

            {/* Order summary — top on mobile, sticky right on desktop */}
            <aside className="order-1 w-full lg:sticky lg:top-28 lg:order-2 lg:w-[min(100%,380px)] lg:shrink-0 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease, delay: 0.05 }}
              >
                <CardShell>
                  <h2 className="mb-6 text-lg font-bold tracking-tight text-foreground">
                    Order summary
                  </h2>
                  {items.length === 0 ? (
                    <div className="mb-6 rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-8 text-center dark:border-border/45 dark:bg-muted/10">
                      <p className="text-sm font-medium text-muted-foreground">
                        Your cart is empty. Add parts from the shop to check
                        out.
                      </p>
                      <Link
                        href="/"
                        className="mt-4 inline-block text-sm font-semibold text-[#001f3f] underline-offset-4 hover:underline dark:text-[#00a3ff]"
                      >
                        Continue shopping
                      </Link>
                    </div>
                  ) : (
                    <ul className="mb-6 space-y-4">
                      {items.map((item) => {
                        const lineCad = item.unitPriceCents * item.quantity;
                        return (
                          <li
                            key={item.id}
                            className="flex gap-3 border-b border-border/40 pb-4 last:border-0 last:pb-0 dark:border-border/35"
                          >
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted/30">
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold leading-snug text-foreground">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                                {formatMoneyFromCadCents(
                                  item.unitPriceCents,
                                  region
                                )}{" "}
                                each
                              </p>
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <div className="inline-flex items-center rounded-lg border border-border/60 bg-background dark:border-border/50">
                                  <button
                                    type="button"
                                    aria-label="Decrease quantity"
                                    className="flex size-9 items-center justify-center text-foreground transition hover:bg-muted"
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <Minus className="size-4" />
                                  </button>
                                  <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    aria-label="Increase quantity"
                                    className="flex size-9 items-center justify-center text-foreground transition hover:bg-muted"
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <Plus className="size-4" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  aria-label={`Remove ${item.name}`}
                                  className="inline-flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive dark:border-border/50"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <X className="size-4" />
                                </button>
                                <span className="ml-auto text-base font-bold tabular-nums text-foreground">
                                  {formatMoneyFromCadCents(lineCad, region)}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="Discount code"
                      className={cn(inputClass(), "sm:flex-1")}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 shrink-0 rounded-xl border-[#001f3f]/30 px-6 font-semibold hover:bg-[#001f3f]/10 dark:border-[#001f3f]/40"
                    >
                      Apply
                    </Button>
                  </div>

                  <dl className="space-y-3 border-t border-border/50 pt-4 text-sm dark:border-border/40">
                    <div className="flex justify-between font-medium text-muted-foreground">
                      <dt>Subtotal</dt>
                      <dd className="tabular-nums text-foreground">
                        {formatMoneyFromCadCents(subtotalCad, region)}
                      </dd>
                    </div>
                    <div className="flex justify-between font-medium text-muted-foreground">
                      <dt>Shipping</dt>
                      <dd
                        className={cn(
                          "font-semibold tabular-nums",
                          shippingCad === 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-foreground"
                        )}
                      >
                        {shippingCad === 0
                          ? "FREE"
                          : formatMoneyFromCadCents(shippingCad, region)}
                      </dd>
                    </div>
                    <div className="flex justify-between font-medium text-muted-foreground">
                      <dt>Estimated taxes</dt>
                      <dd className="tabular-nums text-foreground">
                        {formatMoneyFromCadCents(taxCad, region)}
                      </dd>
                    </div>
                    {tipCad > 0 ? (
                      <div className="flex justify-between font-medium text-muted-foreground">
                        <dt>Tip</dt>
                        <dd className="tabular-nums text-foreground">
                          {formatMoneyFromCadCents(tipCad, region)}
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex items-baseline justify-between border-t border-border/50 pt-4 dark:border-border/40">
                      <dt className="text-base font-bold text-foreground">
                        Total
                      </dt>
                      <dd className="text-xl font-bold tabular-nums tracking-tight text-[#001f3f] dark:text-white">
                        {formatMoneyFromCadCents(totalCad, region)}
                      </dd>
                    </div>
                  </dl>
                </CardShell>
              </motion.div>
            </aside>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
