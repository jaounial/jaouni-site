import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Jaouni — Industrial Engineer & AI Builder",
  description:
    "Portfolio of Ali Jaouni — Industrial Engineering @ UofT. Building at the intersection of AI, automation, and systems thinking.",
  metadataBase: new URL("https://jaouni-site.vercel.app"),
  openGraph: {
    title: "Ali Jaouni — Industrial Engineer & AI Builder",
    description:
      "Portfolio of Ali Jaouni — Industrial Engineering @ UofT. Building at the intersection of AI, automation, and systems thinking.",
    url: "https://jaouni-site.vercel.app",
    siteName: "Ali Jaouni",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ali Jaouni — Industrial Engineer & AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Jaouni — Industrial Engineer & AI Builder",
    description:
      "Portfolio of Ali Jaouni — Industrial Engineering @ UofT. Building at the intersection of AI, automation, and systems thinking.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
