import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NewProducts } from "@/components/sections/NewProducts";
import { PerformanceParts } from "@/components/sections/PerformanceParts";
import { ShopFor } from "@/components/sections/ShopFor";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isHome />
      <main className="flex-1">
        <Hero />
        <NewProducts />
        <PerformanceParts />
        <Testimonials />
        <ShopFor />
      </main>
    </div>
  );
}
