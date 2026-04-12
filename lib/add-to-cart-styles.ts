import { cn } from "@/lib/utils";

/** Shared “Add to cart” look — brighter blue gradient + glow (homepage cards + PDP) */
export function addToCartGradientClasses(...extra: string[]) {
  return cn(
    "bg-gradient-to-b from-[#1a9cff] from-[0%] via-[#0b82f0] via-[45%] to-[#0668d4] to-[100%] text-white",
    "shadow-[0_6px_26px_-4px_rgba(0,150,255,0.52),0_2px_12px_-2px_rgba(0,50,140,0.28)]",
    "hover:from-[#4db0ff] hover:via-[#2a9dff] hover:to-[#0b82f0]",
    "hover:shadow-[0_10px_40px_-4px_rgba(0,170,255,0.58),0_4px_22px_-4px_rgba(0,90,200,0.38)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3ff]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "transition-[box-shadow,filter] duration-300",
    ...extra
  );
}

/** Same blue gradient as Add to Cart, without drop-shadow / glow (e.g. search empty state CTA) */
export function addToCartGradientClassesNoGlow(...extra: string[]) {
  return cn(
    "bg-gradient-to-b from-[#1a9cff] from-[0%] via-[#0b82f0] via-[45%] to-[#0668d4] to-[100%] text-white",
    "shadow-none hover:shadow-none",
    "hover:from-[#4db0ff] hover:via-[#2a9dff] hover:to-[#0b82f0]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3ff]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "transition-[background-color,filter] duration-300",
    ...extra
  );
}
