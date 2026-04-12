export type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  /** When true, card shows placeholder and disabled CTA */
  comingSoon?: boolean;
};

export type ShopCategory = {
  slug: string;
  label: string;
  image: string;
};

const COMING_IMG = "/images/products/coming-soon.svg";

/** Live catalogue items featured on the homepage */
export const FEATURED_SUBWOOFER: CatalogProduct = {
  id: "mz3-msp-subwoofer-wire",
  name: "2003 Mazdaspeed Protege Subwoofer Wire Connector with Inline Fuse",
  price: "$50.00",
  image: "/images/products/product1.jpg",
  description:
    "Sold in AS-IS Used Condition. Tested and working well. Compatible with Mazdaspeed Protege.",
  comingSoon: false,
};

export const FEATURED_CUP_HOLDER: CatalogProduct = {
  id: "mz-protege-cup-holder",
  name: "2003 Mazda Protege Deep Style Cup Holder",
  price: "$75.00",
  image: "/images/products/product2.jpg",
  description: "Sold in AS-IS Used Condition.",
  comingSoon: false,
};

function comingSoonCard(suffix: string): CatalogProduct {
  return {
    id: `coming-soon-${suffix}`,
    name: "Coming Soon",
    price: "—",
    image: COMING_IMG,
    comingSoon: true,
  };
}

/** 8 slots: 2 real products + 6 Coming Soon placeholders */
export const NEW_CATALOG_PRODUCTS: CatalogProduct[] = [
  FEATURED_SUBWOOFER,
  FEATURED_CUP_HOLDER,
  ...Array.from({ length: 6 }, (_, i) => comingSoonCard(`np-${i + 1}`)),
];

/** Performance grid — all slots are Coming Soon placeholders */
export const PERFORMANCE_PRODUCTS: CatalogProduct[] = Array.from(
  { length: 6 },
  (_, i) => comingSoonCard(`pf-${i}`)
);

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "mazda",
    label: "Mazda",
    image: "https://picsum.photos/id/1015/600/400",
  },
  {
    slug: "honda",
    label: "Honda",
    image: "https://picsum.photos/id/29/600/400",
  },
  {
    slug: "toyota",
    label: "Toyota",
    image: "https://picsum.photos/id/201/600/400",
  },
  {
    slug: "performance",
    label: "Performance",
    image: "https://picsum.photos/id/1005/600/400",
  },
  {
    slug: "new-products",
    label: "New Products",
    image: "https://picsum.photos/id/133/600/400",
  },
  {
    slug: "special",
    label: "Castilleja / Special",
    image: "https://picsum.photos/id/160/600/400",
  },
];
