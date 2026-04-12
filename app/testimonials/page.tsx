import type { Metadata } from "next";

import { TestimonialsPageContent } from "@/components/testimonials/TestimonialsPageContent";

export const metadata: Metadata = {
  title: "Testimonials | JP Parts International",
  description:
    "What enthusiasts say about JP Parts International — OEM parts, service, and support.",
};

export default function TestimonialsPage() {
  return <TestimonialsPageContent />;
}
