import type { CatalogProduct } from "@/lib/home-catalog";
import {
  NEW_CATALOG_PRODUCTS,
  PERFORMANCE_PRODUCTS,
} from "@/lib/home-catalog";

export type ProductSpec = { label: string; value: string };

export type ProductDetail = CatalogProduct & {
  description: string;
  specs: ProductSpec[];
};

/** Extended copy + specs for PDP (dummy content) — keyed by internal catalogue id */
type ProductDetailPatch = {
  description: string;
  specs: ProductSpec[];
};

const DETAILS: Record<string, ProductDetailPatch> = {
  "mz3-msp-subwoofer-wire": {
    description:
      "Sold in AS-IS Used Condition. Tested and working well. Compatible with Mazdaspeed Protege.",
    specs: [
      { label: "Condition", value: "Used — AS-IS" },
      { label: "Fitment", value: "2003 Mazdaspeed Protege" },
      { label: "Includes", value: "Subwoofer wire connector with inline fuse" },
    ],
  },
  "mz-protege-cup-holder": {
    description: "Sold in AS-IS Used Condition.",
    specs: [
      { label: "Condition", value: "Used — AS-IS" },
      { label: "Fitment", value: "2003 Mazda Protege" },
      { label: "Style", value: "Deep Style cup holder" },
    ],
  },
  "np-1": {
    description:
      "Six-piston monobloc calipers with two-piece floating rotors engineered for track days and aggressive street driving. Includes stainless lines and performance compound pads.",
    specs: [
      { label: "Position", value: "Front axle" },
      { label: "Rotor size", value: "380×34 mm" },
      { label: "Caliper", value: "Monobloc aluminum" },
      { label: "Included", value: "Pads, lines, hardware" },
    ],
  },
  "np-2": {
    description:
      "Titanium-infused muffler section with optimized piping for reduced back-pressure and a refined tone under load. T304 stainless construction with precision TIG welds.",
    specs: [
      { label: "Material", value: "T304 stainless" },
      { label: "Tip style", value: "Quad 4\" burnt" },
      { label: "Noise", value: "Street-legal resonated" },
    ],
  },
  "np-3": {
    description:
      "Dual-flow valve dampers with independent compression and rebound adjustment. Road comfort with circuit-ready body control.",
    specs: [
      { label: "Spring rate", value: "Linear matched" },
      { label: "Top mount", value: "Aluminum pillowball" },
      { label: "Adjustment", value: "20-click rebound" },
    ],
  },
  "np-4": {
    description:
      "Bar-and-plate core with cast end tanks for minimal pressure drop. Direct-fit brackets and silicone couplers included.",
    specs: [
      { label: "Core volume", value: "+42% vs OEM" },
      { label: "Finish", value: "Black powder coat" },
    ],
  },
  "np-5": {
    description:
      "Monotube inverted struts with 16-way damping and ride-height adjustment independent of spring preload.",
    specs: [
      { label: "Damper", value: "Monotube inverted" },
      { label: "Height adj.", value: "Threaded bodies" },
    ],
  },
  "np-6": {
    description:
      "Standalone engine management with pre-loaded basemaps and expandable I/O for boost, flex-fuel, and nitrous strategies.",
    specs: [
      { label: "Inputs", value: "16 analog / CAN" },
      { label: "Logging", value: "Internal + SD" },
    ],
  },
  "np-7": {
    description:
      "Dual ceramic ball bearing CHRA with Inconel turbine housing options for high-EGT applications. Includes oil feed and drain kit.",
    specs: [
      { label: "Compressor", value: "62 mm inducer" },
      { label: "Turbine", value: "T3 divided 0.82 A/R" },
    ],
  },
  "np-8": {
    description:
      "Directional slotted rotors with anti-corrosion coating and matched pad bed-in surface for quiet street use.",
    specs: [
      { label: "Construction", value: "High-carbon alloy" },
      { label: "Slot pattern", value: "Directional" },
    ],
  },
  "pf-1": {
    description:
      "Handheld flash tuner with live gauges, map switching, and datalogging. Off-the-shelf maps plus custom tune support.",
    specs: [
      { label: "Display", value: "Full color LCD" },
      { label: "Maps", value: "OTS + custom" },
    ],
  },
  "pf-2": {
    description:
      "Progressive-rate lowering springs paired with OEM dampers for a balanced drop without harshness.",
    specs: [
      { label: "Drop (avg)", value: "1.2\" F / 1.0\" R" },
      { label: "Spring rate", value: "Progressive" },
    ],
  },
  "pf-3": {
    description:
      "Hollow tubular bars with polyurethane bushings to reduce body roll while maintaining daily comfort.",
    specs: [
      { label: "Front bar", value: "26 mm adjustable" },
      { label: "Rear bar", value: "24 mm adjustable" },
    ],
  },
  "pf-4": {
    description:
      "Mandrel-bent intake tube with high-flow filter and heat shield to reduce IATs at wide-open throttle.",
    specs: [
      { label: "Filter", value: "Oiled cotton" },
      { label: "CARB", value: "Exempt (race)" },
    ],
  },
  "pf-5": {
    description:
      "Iridium center electrode for stable combustion and extended service intervals in boosted engines.",
    specs: [
      { label: "Heat range", value: "OEM +1 step cold" },
      { label: "Qty", value: "Set of 4" },
    ],
  },
  "pf-6": {
    description:
      "Ester-based 300V double ester racing oil with exceptional shear stability for track sessions.",
    specs: [
      { label: "Grade", value: "5W-40" },
      { label: "Case", value: "12 × 1L bottles" },
    ],
  },
};

const ALL_FLAT: CatalogProduct[] = [
  ...NEW_CATALOG_PRODUCTS,
  ...PERFORMANCE_PRODUCTS,
];

/** Stable order: New Products (8) then Performance (6) → `/products/1` … `/products/14` */
export const ORDERED_PRODUCT_INTERNAL_IDS = ALL_FLAT.map((p) => p.id);

/**
 * URL segment → internal id (`np-1`, `pf-3`, …).
 * Accepts `1`…`14` or legacy internal ids.
 */
export function internalIdFromRouteParam(param: string): string | undefined {
  const n = Number.parseInt(param, 10);
  if (
    !Number.isNaN(n) &&
    n >= 1 &&
    n <= ORDERED_PRODUCT_INTERNAL_IDS.length
  ) {
    return ORDERED_PRODUCT_INTERNAL_IDS[n - 1];
  }
  if (ALL_FLAT.some((p) => p.id === param)) return param;
  return undefined;
}

/** Internal id → numeric path segment for shareable URLs */
export function routeParamFromInternalId(internalId: string): string {
  const i = ORDERED_PRODUCT_INTERNAL_IDS.indexOf(internalId);
  if (i === -1) return internalId;
  return String(i + 1);
}

export function getProductById(routeParam: string): ProductDetail | undefined {
  const resolved = internalIdFromRouteParam(routeParam);
  if (!resolved) return undefined;
  const base = ALL_FLAT.find((p) => p.id === resolved);
  if (!base) return undefined;
  const extra = DETAILS[resolved];
  if (!extra) return { ...base, description: "", specs: [] };
  return { ...base, ...extra };
}

export function getRecommendedProducts(
  excludeRouteParam: string,
  limit = 4
): CatalogProduct[] {
  const ex =
    internalIdFromRouteParam(excludeRouteParam) ?? excludeRouteParam;
  return ALL_FLAT.filter(
    (p) => p.id !== ex && !p.comingSoon
  ).slice(0, limit);
}

export function getAllProductIds(): string[] {
  return [...ORDERED_PRODUCT_INTERNAL_IDS];
}
