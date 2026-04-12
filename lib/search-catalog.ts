import { imageSrc } from "@/lib/asset-version";
import type { CatalogProduct } from "@/lib/home-catalog";
import {
  NEW_CATALOG_PRODUCTS,
  PERFORMANCE_PRODUCTS,
} from "@/lib/home-catalog";

export type SearchProduct = {
  id: string;
  name: string;
  sku: string;
  price: string;
  brand: string;
  image: string;
};

function searchableCatalog(): CatalogProduct[] {
  return [...NEW_CATALOG_PRODUCTS, ...PERFORMANCE_PRODUCTS].filter(
    (p) => !p.comingSoon
  );
}

function toSearchProduct(p: CatalogProduct): SearchProduct {
  const brand =
    /mazda/i.test(p.name) || /mazdaspeed|protege/i.test(p.name)
      ? "Mazda"
      : "JP Parts International";

  return {
    id: p.id,
    name: p.name,
    sku: p.id,
    price: p.price,
    brand,
    image: p.image.startsWith("/") ? imageSrc(p.image) : p.image,
  };
}

/** Live search: only in-stock catalogue items (excludes “Coming Soon” placeholders). Case-insensitive. */
export function filterSearchProducts(query: string): SearchProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchableCatalog()
    .filter((p) => {
      const blob = [
        p.name,
        p.id,
        p.price,
        p.description ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    })
    .map(toSearchProduct)
    .slice(0, 8);
}
