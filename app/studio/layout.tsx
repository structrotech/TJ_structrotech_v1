import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StructroTech Studio",
  description: "Content management for StructroTech",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
