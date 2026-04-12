import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/Header";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import {
  getProductById,
  getRecommendedProducts,
} from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product | JP Parts International" };
  const desc = (product.description || product.name).slice(0, 160);
  return {
    title: `${product.name} | JP Parts International`,
    description: desc,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    notFound();
  }
  const recommended = getRecommendedProducts(product.id, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header isHome={false} />
      <main className="flex-1">
        <ProductDetailClient product={product} recommended={recommended} />
      </main>
    </div>
  );
}
