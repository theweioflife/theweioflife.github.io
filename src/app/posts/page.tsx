import type { Metadata } from "next";
import { PostList } from "@/components/posts/PostList";
import { getAllPosts, getPaginatedPosts } from "@/lib/wordpress/api";
import { absoluteUrl, getDefaultOgImageUrl, siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "文章",
  description: `閱讀 ${siteConfig.name} 的最新文章。`,
  alternates: {
    canonical: absoluteUrl("/posts/")
  },
  openGraph: {
    title: `文章 | ${siteConfig.name}`,
    description: `閱讀 ${siteConfig.name} 的最新文章。`,
    url: absoluteUrl("/posts/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [getDefaultOgImageUrl()]
  }
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const page = getPaginatedPosts(posts, 1, siteConfig.postsPerPage);

  return (
    <section className="section-block" aria-labelledby="posts-heading">
      <p className="eyebrow">Archive</p>
      <h1 id="posts-heading">文章</h1>
      <p className="lead">依發布時間瀏覽所有文章。</p>
      <PostList posts={page.posts} />
    </section>
  );
}
