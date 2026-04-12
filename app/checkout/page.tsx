import type { Metadata } from "next";

import { CheckoutPageContent } from "@/components/checkout/CheckoutPageContent";

export const metadata: Metadata = {
  title: "Checkout | JP Parts International",
  description:
    "Complete your order — secure checkout with delivery and payment options.",
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
