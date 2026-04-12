import Link from "next/link";

import { Header } from "@/components/Header";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isHome={false} />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Product not found
        </h1>
        <p className="mt-3 max-w-md text-lg text-muted-foreground">
          We couldn&apos;t find that part. Try another SKU or browse the store.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-primary px-8 py-3.5 text-lg font-semibold text-primary-foreground shadow-[0_8px_28px_-8px_rgba(0,163,255,0.45)] transition hover:bg-primary/90"
        >
          Back to home
        </Link>
      </main>
    </div>
  );
}
