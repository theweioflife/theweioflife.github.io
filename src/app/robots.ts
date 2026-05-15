import type { MetadataRoute } from "next";
import { absoluteUrl, getRequiredSiteUrl } from "@/lib/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getRequiredSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl.origin
  };
}
