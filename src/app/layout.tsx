import { PlainChat } from "@/components/PlainChat";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RootProvider } from "fumadocs-ui/provider";
import type { Viewport } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "./global.css";
import { PostHogProvider } from "@/components/PostHogProvider";

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
      <head>
        {/* Manual GA Script for G-4WNKFB6Q0V */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4WNKFB6Q0V"
          strategy="afterInteractive"
        />
        <Script
          id="manual-ga"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4WNKFB6Q0V');
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
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
          {/* GA script managed via Next.js helper for G-N1MMHFDVZZ */}
          <GoogleAnalytics gaId="G-N1MMHFDVZZ" />
          <PlainChat />
        </PostHogProvider>
      </body>
    </html>
  );
}