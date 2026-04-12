import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | JP Parts International",
  description:
    "JP Parts International — family owned and operated. Our story from JP Protege Parts to a global parts retailer for enthusiasts.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
