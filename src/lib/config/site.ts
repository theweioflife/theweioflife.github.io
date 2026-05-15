export const siteConfig = {
  name: "theweioflife",
  defaultTitle: "theweioflife",
  description: "生活、活動與創作情報筆記",
  locale: "zh_TW",
  language: "zh-TW",
  wordpressSite: process.env.WORDPRESS_SITE ?? "theweioflife1.wordpress.com",
  postsPerPage: 12,
  defaultOgImage: "/og-default.svg",
  githubPagesRepository: process.env.NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY?.trim() ?? ""
};

export function getBasePath() {
  return siteConfig.githubPagesRepository
    ? `/${siteConfig.githubPagesRepository.replace(/^\/|\/$/g, "")}`
    : "";
}

export function getRequiredSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl && process.env.NODE_ENV !== "production") {
    return new URL("http://localhost:3000");
  }

  if (!configuredUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is required for production builds.");
  }

  const url = new URL(configuredUrl);
  if (url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute https:// URL.");
  }

  const basePath = getBasePath();
  if (basePath && !url.pathname.replace(/\/$/, "").endsWith(basePath)) {
    throw new Error("NEXT_PUBLIC_SITE_URL path must include the configured GitHub Pages basePath.");
  }

  return url;
}

export function absoluteUrl(path: string) {
  const base = getRequiredSiteUrl();
  return new URL(path.replace(/^\//, ""), `${base.href.replace(/\/$/, "")}/`).toString();
}

export function getDefaultOgImageUrl() {
  return absoluteUrl(siteConfig.defaultOgImage);
}
