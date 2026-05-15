import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/posts/PostList";
import { getAllPosts, getPaginatedPosts } from "@/lib/wordpress/api";
import { absoluteUrl, getDefaultOgImageUrl, siteConfig } from "@/lib/config/site";

type PostsPageParams = {
  params: Promise<{ page: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / siteConfig.postsPerPage));
  const staticPageCount = Math.max(1, totalPages - 1);
  return Array.from({ length: staticPageCount }, (_, index) => ({
    page: String(index + 2)
  }));
}

export async function generateMetadata({ params }: PostsPageParams): Promise<Metadata> {
  const { page } = await params;
  const currentPage = Number(page);
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / siteConfig.postsPerPage));
  const isIndexable = Number.isInteger(currentPage) && currentPage >= 2 && currentPage <= totalPages;

  return {
    title: `文章第 ${page} 頁`,
    description: `${siteConfig.name} 文章列表第 ${page} 頁。`,
    robots: isIndexable
      ? undefined
      : {
          index: false,
          follow: false
        },
    alternates: {
      canonical: absoluteUrl(`/posts/page/${page}/`)
    },
    openGraph: {
      title: `文章第 ${page} 頁 | ${siteConfig.name}`,
      description: `${siteConfig.name} 文章列表第 ${page} 頁。`,
      url: absoluteUrl(`/posts/page/${page}/`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [getDefaultOgImageUrl()]
    }
  };
}

export default async function PaginatedPostsPage({ params }: PostsPageParams) {
  const { page: pageParam } = await params;
  const currentPage = Number(pageParam);
  const posts = await getAllPosts();
  const page = getPaginatedPosts(posts, currentPage, siteConfig.postsPerPage);

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound();
  }

  return (
    <section className="section-block" aria-labelledby="posts-heading">
      <p className="eyebrow">Archive</p>
      <h1 id="posts-heading">文章第 {currentPage} 頁</h1>
      <PostList posts={page.posts} />
    </section>
  );
}
