import type { Post } from "@/lib/wordpress/types";
import { absoluteUrl, siteConfig } from "@/lib/config/site";

type BlogPostingJsonLdProps = {
  post: Post;
};

export function BlogPostingJsonLd({ post }: BlogPostingJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Person",
      name: post.authorName
    },
    image: post.featuredImage?.src,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    },
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}/`)
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
