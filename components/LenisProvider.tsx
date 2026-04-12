"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function RouteScrollSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 0.88,
        touchMultiplier: 1.65,
        touchInertiaExponent: 1.65,
      }}
    >
      <RouteScrollSync />
      {children}
    </ReactLenis>
  );
}
