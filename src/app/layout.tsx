import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Figtree } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { PostHogProvider } from "@/components/PostHogProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AISearchTrigger } from "@/components/search";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  other: {
    "color-scheme": "light dark",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
  ],
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans">
        <PostHogProvider>
          <RootProvider
            search={{
              options: {
                api: "/documentation/api/search",
              },
            }}
          >
            {children}
          </RootProvider>
          {/* <AISearchTrigger /> */}
          <GoogleAnalytics gaId="G-4WNKFB6Q0V" />
        </PostHogProvider>
      </body>
    </html>
  );
}
