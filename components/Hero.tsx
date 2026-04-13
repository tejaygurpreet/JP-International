"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";

import { imageSrc } from "@/lib/asset-version";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";

const YEARS = Array.from({ length: 36 }, (_, i) => String(2025 - i));
const MAKES = [
  "Toyota",
  "Honda",
  "Nissan",
  "Mazda",
  "Subaru",
  "Lexus",
  "BMW",
  "Mercedes-Benz",
];
const MODELS = [
  "Supra",
  "GT-R",
  "Civic Type R",
  "WRX STI",
  "MX-5 Miata",
  "RX-7",
  "NSX",
  "Lancer Evolution",
];
const TRIMS = [
  "2.0T Sport",
  "3.0 Premium",
  "Nismo",
  "Type S",
  "Base",
  "Track Edition",
];

const sub = "Premium JDM & Mazda Performance Parts Since 2012";

export function Hero() {
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isLight = useThemeStore((s) => s.theme === "light");
  const [year, setYear] = useState("2024");
  const [make, setMake] = useState("Toyota");
  const [model, setModel] = useState("Supra");
  const [trim, setTrim] = useState("3.0 Premium");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 56]
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.03]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    [1, 0.5]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.45],
    [0, reduceMotion ? 0 : 14]
  );

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative z-0 mb-16 w-full overflow-visible pb-2 sm:mb-20 md:mb-24"
    >
      {/* Image block — fixed height, clips image only */}
      <div className="relative h-[min(66svh,520px)] max-h-[560px] w-full overflow-hidden sm:h-[min(70svh,560px)] sm:max-h-[580px] md:h-[min(75vh,620px)] md:max-h-[620px]">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: bgY, scale: bgScale }}
        >
          <div className="absolute inset-0">
            <Image
              key={isLight ? "hero-light" : "hero-dark"}
              src={imageSrc(
                isLight ? "/images/hero-bg-w.jpg" : "/images/hero-bg.jpg"
              )}
              alt="Premium performance parts — brakes, suspension, turbo and automotive detail"
              fill
              priority
              quality={92}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
        {/* Overlay: light mode 50% white wash; dark mode 60% black */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[6]",
            isLight ? "bg-white/50" : "bg-black/60"
          )}
          aria-hidden
        />
        {/* Subtle vignette — dark mode only */}
        {!isLight && (
          <>
            <div
              className="pointer-events-none absolute inset-0 z-[6] bg-[radial-gradient(ellipse_95%_95%_at_50%_45%,transparent_25%,rgba(0,0,0,0.45)_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[6] shadow-[inset_0_0_100px_50px_rgba(0,0,0,0.35),inset_0_0_40px_rgba(0,0,0,0.25)]"
              aria-hidden
            />
          </>
        )}

        <motion.div
          className="relative z-10 flex h-full flex-col px-4 sm:px-6 lg:px-10"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Headline + subtitle: centered in upper/middle region, clears fixed header */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.09, delayChildren: 0.04 },
              },
            }}
            className="flex flex-1 flex-col items-center justify-center px-3 pb-4 pt-[4.25rem] text-center min-[400px]:px-4 sm:pt-20 md:pt-24"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={cn(
                "max-w-[min(100%,44rem)] text-balance text-[1.35rem] font-extrabold leading-[1.12] tracking-[0.02em] min-[400px]:text-[1.5rem] sm:text-[clamp(1.65rem,4vw,4.1rem)] sm:leading-[1.12]",
                !isLight &&
                  "text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)] dark:drop-shadow-[0_3px_24px_rgba(0,0,0,0.75)]"
              )}
            >
              <span
                className={cn(
                  isLight && "text-[#111111]",
                  !isLight &&
                    "text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)] dark:drop-shadow-[0_3px_24px_rgba(0,0,0,0.75)]"
                )}
              >
                From One Enthusiast to{" "}
              </span>
              <span
                className={cn(
                  isLight
                    ? "text-[#1565C0]"
                    : "text-[#4da3ff] drop-shadow-[0_2px_20px_rgba(0,0,0,0.65)] dark:drop-shadow-[0_3px_24px_rgba(0,0,0,0.75)]"
                )}
              >
                Another
              </span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={cn(
                "mx-auto mt-4 max-w-[min(100%,36rem)] text-pretty px-1 text-base font-medium leading-relaxed sm:mt-6 sm:max-w-3xl sm:text-xl sm:leading-relaxed md:mt-7 md:text-2xl lg:text-3xl lg:leading-relaxed",
                isLight
                  ? "text-[#111111]"
                  : "text-white/95"
              )}
              style={
                isLight
                  ? undefined
                  : { textShadow: "0 1px 12px rgba(0,0,0,0.8)" }
              }
            >
              {sub}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Vehicle selector: straddles hero bottom ↔ page content (half below image) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 -mt-6 flex w-full justify-center px-3 sm:-mt-9 sm:px-4 md:-mt-10"
      >
        {/* Navy capsule: responsive — rounded pill on sm+, soft capsule on narrow phones */}
        <div
          className={cn(
            "w-full max-w-6xl rounded-[26px] p-[2px] sm:rounded-[9999px]",
            "bg-gradient-to-r from-[#001f3f] via-[#001f3f] to-[#003366]",
            isLight ? "shadow-md" : "shadow-[0_0_0_1px_rgba(0,31,63,0.45),0_0_24px_rgba(0,51,102,0.38),0_0_48px_rgba(0,31,63,0.28),0_0_82px_rgba(0,51,102,0.16),0_12px_40px_-6px_rgba(0,0,0,0.5)]"
          )}
        >
          <div
            className={cn(
              "flex min-w-0 flex-col gap-4 rounded-[24px] p-4 backdrop-blur-2xl sm:rounded-[9999px] sm:p-5 sm:py-6 md:flex-row md:flex-nowrap md:items-end md:justify-between md:gap-5 md:overflow-x-auto md:overflow-y-visible md:px-8 md:py-6 md:[-ms-overflow-style:none] md:[scrollbar-width:none] lg:gap-6 lg:px-10 md:[&::-webkit-scrollbar]:hidden",
              isLight
                ? "bg-[#001f3f] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_1px_rgba(255,255,255,0.15)]"
                : "bg-[rgba(6,10,16,0.9)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-3px_14px_rgba(0,0,0,0.5),inset_0_0_28px_rgba(0,31,63,0.14),inset_0_0_1px_rgba(0,51,102,0.22)]"
            )}
          >
            <div className="grid w-full grid-cols-2 gap-3 min-[480px]:gap-4 md:contents">
              <SelectField
                id={`${id}-year`}
                label="Year"
                value={year}
                onChange={setYear}
                options={YEARS}
                isLight={isLight}
              />
              <SelectField
                id={`${id}-make`}
                label="Make"
                value={make}
                onChange={setMake}
                options={MAKES}
                isLight={isLight}
              />
              <SelectField
                id={`${id}-model`}
                label="Model"
                value={model}
                onChange={setModel}
                options={MODELS}
                isLight={isLight}
              />
              <SelectField
                id={`${id}-trim`}
                label="Trim / Engine"
                value={trim}
                onChange={setTrim}
                options={TRIMS}
                isLight={isLight}
              />
            </div>
            <motion.button
              type="button"
              whileHover={
                isLight
                  ? {
                      scale: 1.02,
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.18)",
                    }
                  : {
                      scale: 1.02,
                      boxShadow:
                        "0 0 26px rgba(0, 51, 102, 0.5), 0 0 44px rgba(0, 31, 63, 0.35), inset 0 1px 0 rgba(255,255,255,0.22)",
                    }
              }
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 26 }}
              className={cn(
                "h-12 min-h-[48px] w-full shrink-0 rounded-2xl px-6 text-base font-semibold outline-none transition sm:rounded-[9999px] md:h-11 md:min-h-0 md:w-auto md:px-8 md:text-lg",
                "focus-visible:ring-2 focus-visible:ring-[#00a3ff]/45 focus-visible:ring-offset-2",
                isLight
                  ? "border border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-white/15 focus-visible:ring-offset-[#001f3f]"
                  : "border-0 border-l-2 border-l-[#4a6fa5]/45 bg-gradient-to-r from-[#002a4a] to-[#003d66] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_20px_rgba(0,51,102,0.4),0_4px_18px_rgba(0,20,40,0.45)] focus-visible:ring-[#001f3f]/50 focus-visible:ring-offset-[rgba(5,9,15,0.95)]",
                "md:border-l-2"
              )}
            >
              Find My Parts
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  isLight,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  isLight: boolean;
}) {
  return (
    <div className="relative w-full min-w-0 md:w-[min(42vw,9.5rem)] md:max-w-[10.5rem] md:shrink-0 lg:flex-1 lg:max-w-none">
      <label
        htmlFor={id}
        className={cn(
          "mb-1.5 block text-left text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs",
          isLight ? "text-white/70" : "text-white/55"
        )}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-12 min-h-[48px] w-full min-w-0 cursor-pointer appearance-none rounded-xl py-2 pl-3 pr-10 text-base font-semibold antialiased outline-none backdrop-blur-sm transition md:h-11 md:min-h-0 md:py-2 md:pl-2.5 md:pr-8 md:text-sm lg:text-base",
            isLight
              ? "border border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/40 hover:bg-white/15 focus:border-white/50 focus:ring-2 focus:ring-[#00a3ff]/35"
              : "border border-white/20 bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#4a6fa5]/45 hover:bg-white/[0.1] focus:border-[#5a7fb5]/75 focus:ring-2 focus:ring-[#003366]/35"
          )}
        >
          {options.map((o) => (
            <option
              key={o}
              value={o}
              className={cn(
                isLight ? "bg-[#001f3f] text-white" : "bg-[#121820] text-white"
              )}
            >
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 sm:right-2 sm:size-4",
            isLight ? "text-white/80" : "text-white/75"
          )}
          aria-hidden
        />
      </div>
    </div>
  );
}
