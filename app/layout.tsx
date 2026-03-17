import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluid Medical — Software Development Proposal",
  description: "A bespoke practice management platform proposal for Fluid Medical — Phase 1–4 feature scope, pricing, and timeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
