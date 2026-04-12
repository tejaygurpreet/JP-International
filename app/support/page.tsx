import type { Metadata } from "next";

import { SupportPageContent } from "@/components/support/SupportPageContent";

export const metadata: Metadata = {
  title: "Support | JP Parts International",
  description:
    "Request hard-to-find parts or get in touch with JP Parts International — from one enthusiast to another.",
};

export default function SupportPage() {
  return <SupportPageContent />;
}
