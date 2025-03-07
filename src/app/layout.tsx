import { PlainChat } from "@/components/PlainChat";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RootProvider } from "fumadocs-ui/provider";
import type { Viewport } from "next";
import { Figtree } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const figtree = Figtree({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={figtree.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{
            options: {
              api: "/documentation/api/search",
            },
          }}
        >
          {children}
        </RootProvider>
        <GoogleAnalytics gaId="G-N1MMHFDVZZ" />
        <PlainChat />
      </body>
    </html>
  );
}
