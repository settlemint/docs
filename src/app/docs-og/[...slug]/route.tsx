import { metadataImage } from "@/lib/metadata";
import { generateOGImage } from "fumadocs-ui/og";

export const GET = metadataImage.createAPI((page) => {
  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "SettleMint",
    primaryColor: "#292929",
    primaryTextColor: "#e5e7eb",
  });
});

export function generateStaticParams() {
  return metadataImage.generateParams();
}
