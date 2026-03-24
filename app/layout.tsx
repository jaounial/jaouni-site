import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Jaouni",
  description: "Industrial Engineering student at UofT — AI, automation, and data.",
  openGraph: {
    title: "Ali Jaouni",
    description: "Industrial Engineering student at UofT — AI, automation, and data.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
