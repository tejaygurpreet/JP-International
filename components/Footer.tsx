"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

/** Brand marks (Lucide does not ship Facebook/Instagram/YouTube in this version). */
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.834v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

import { cn } from "@/lib/utils";

const linkClass =
  "text-sm font-medium text-white/85 transition-colors hover:text-white hover:underline hover:underline-offset-4";

const socialIconClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/90 transition hover:scale-110 hover:border-primary/60 hover:bg-primary/15 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(0,163,255,0.45)]";

const groups = [
  {
    title: "Shop",
    links: [
      { href: "/#new-products", label: "New Products" },
      { href: "/#shop-for", label: "Shop For" },
    ],
  },
  {
    title: "Company Info",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "Help",
    links: [{ href: "/support", label: "Support" }],
  },
] as const;

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mt-auto border-t border-white/10 bg-[#001f3f] text-white",
        "shadow-[0_-12px_40px_-20px_rgba(0,0,0,0.25)]"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-1.5">
                {group.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Get in Touch
            </h2>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:jppartsintl@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
              >
                <Mail className="size-5 shrink-0 text-primary" aria-hidden />
                jppartsintl@gmail.com
              </a>
              <a
                href="tel:+19051234567"
                className="text-sm font-medium text-white/85 transition hover:text-white"
              >
                (905) 123-4567
              </a>
              <p className="text-sm font-medium leading-relaxed text-white/85">
                Hamilton, Ontario, Canada
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="Instagram"
                >
                  <IconInstagram className="size-5" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="Facebook"
                >
                  <IconFacebook className="size-5" />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="YouTube"
                >
                  <IconYoutube className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs font-medium text-white/60 sm:text-sm">
          © 2026 JP Parts International Ltd.
        </div>
      </div>
    </motion.footer>
  );
}
