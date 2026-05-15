import type { Metadata } from "next";
import { PostContent } from "@/components/posts/PostContent";
import { absoluteUrl, getDefaultOgImageUrl, siteConfig } from "@/lib/config/site";
import { getPageBySlug } from "@/lib/wordpress/api";

export const metadata: Metadata = {
  title: "關於",
  description: "關於 theweioflife。",
  alternates: {
    canonical: absoluteUrl("/about/")
  },
  openGraph: {
    title: `關於 | ${siteConfig.name}`,
    description: "關於 theweioflife。",
    url: absoluteUrl("/about/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [getDefaultOgImageUrl()]
  }
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  return (
    <article className="article-page">
      <header className="article-header">
        <p className="eyebrow">About</p>
        <h1>{page?.title ?? "關於"}</h1>
      </header>
      {page ? (
        <PostContent html={page.contentHtml} />
      ) : (
        <div className="post-content">
          <p>theweioflife 是一個記錄生活、活動與創作情報的內容網站。</p>
        </div>
      )}
    </article>
  );
}
