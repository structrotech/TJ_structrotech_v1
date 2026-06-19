import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interesting Tricks | StructroTech",
  description:
    "Practical tech tricks and how-tos for mobile, PC, productivity, and security — each with a full blog guide.",
};

export default function InterestingTricksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
