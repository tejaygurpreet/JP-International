import type { Metadata } from "next";

import { BlogPageContent } from "@/components/blog/BlogPageContent";

export const metadata: Metadata = {
  title: "Blog | JP Parts International",
  description:
    "Builds, tech, and milestones from JP Parts International — from one enthusiast to another.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
