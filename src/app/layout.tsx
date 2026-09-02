import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseOps — SaaS Analytics Platform",
  description: "Track revenue, customers, subscriptions, and conversions for your SaaS business.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
