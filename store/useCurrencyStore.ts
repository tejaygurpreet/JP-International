import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Cart & catalog amounts are stored as CAD cents; these convert for display only */
export type CurrencyRegion = "CA" | "US" | "EU";

const RATE_FROM_CAD: Record<CurrencyRegion, number> = {
  CA: 1,
  US: 0.73,
  EU: 0.68,
};

const SYMBOL: Record<CurrencyRegion, string> = {
  CA: "CAD",
  US: "USD",
  EU: "EUR",
};

/** Flag emoji for currency / region UI */
export const REGION_FLAGS: Record<CurrencyRegion, string> = {
  CA: "🇨🇦",
  US: "🇺🇸",
  EU: "🇪🇺",
};

export function convertCadCentsToDisplayCents(
  cadCents: number,
  region: CurrencyRegion
): number {
  return Math.round(cadCents * RATE_FROM_CAD[region]);
}

export function formatMoneyFromCadCents(
  cadCents: number,
  region: CurrencyRegion
): string {
  const displayCents = convertCadCentsToDisplayCents(cadCents, region);
  const code = SYMBOL[region];
  const locale =
    region === "EU" ? "de-DE" : region === "US" ? "en-US" : "en-CA";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(displayCents / 100);
}

type CurrencyState = {
  region: CurrencyRegion;
  setRegion: (r: CurrencyRegion) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      region: "CA",
      setRegion: (r) => set({ region: r }),
    }),
    { name: "jp-parts-currency-v1", partialize: (s) => ({ region: s.region }) }
  )
);
