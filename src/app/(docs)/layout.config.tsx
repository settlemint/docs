import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | SettleMint Documentation",
    default: "SettleMint Documentation",
  },
  description: "Comprehensive documentation for the SettleMint blockchain platform, including guides, API references, and best practices.",
  keywords: ["settlemint", "blockchain", "documentation", "web3", "smart contracts", "hyperledger", "ethereum"],
  authors: [{ name: "SettleMint" }],
  creator: "SettleMint",
  publisher: "SettleMint",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://console.settlemint.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://console.settlemint.com/documentation",
    siteName: "SettleMint Documentation",
    title: "SettleMint Documentation",
    description: "Comprehensive documentation for the SettleMint blockchain platform",
    images: [
      {
        url: "/documentation/og-image.png",
        width: 1200,
        height: 630,
        alt: "SettleMint Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SettleMint Documentation",
    description: "Comprehensive documentation for the SettleMint blockchain platform",
    images: ["/documentation/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};