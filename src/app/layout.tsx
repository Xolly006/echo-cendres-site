import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
export const metadata: Metadata = { title: "s", description: "s" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body><SiteHeader />{children}</body></html>);
}
