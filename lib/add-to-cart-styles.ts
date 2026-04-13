import { cn } from "@/lib/utils";

/** Header-aligned navy (#001f3f) with a light accent glow (Add to cart, checkout CTA) */
export function addToCartGradientClasses(...extra: string[]) {
  return cn(
    "bg-gradient-to-b from-[#002a52] from-[0%] via-[#001f3f] via-[50%] to-[#001a35] to-[100%] text-white",
    "shadow-[0_0_20px_-4px_rgba(0,163,255,0.22),0_4px_16px_-6px_rgba(0,31,63,0.5)]",
    "hover:from-[#003366] hover:via-[#00264d] hover:to-[#001f3f]",
    "hover:shadow-[0_0_26px_-4px_rgba(0,163,255,0.32),0_6px_20px_-6px_rgba(0,31,63,0.45)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3ff]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "transition-[box-shadow,filter] duration-300",
    ...extra
  );
}

/** Same navy as Add to Cart, no outer glow (e.g. search empty state CTA) */
export function addToCartGradientClassesNoGlow(...extra: string[]) {
  return cn(
    "bg-gradient-to-b from-[#002a52] from-[0%] via-[#001f3f] via-[50%] to-[#001a35] to-[100%] text-white",
    "shadow-none hover:shadow-none",
    "hover:from-[#003366] hover:via-[#00264d] hover:to-[#001f3f]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3ff]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "transition-[background-color,filter] duration-300",
    ...extra
  );
}
