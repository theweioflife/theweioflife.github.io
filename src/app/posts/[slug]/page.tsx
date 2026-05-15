import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostingJsonLd } from "@/components/seo/JsonLd";
import { PostContent } from "@/components/posts/PostContent";
import { PostImage } from "@/components/posts/PostImage";
import { PostMeta } from "@/components/posts/PostMeta";
import { absoluteUrl, getDefaultOgImageUrl, siteConfig } from "@/lib/config/site";
import { getAllPosts, getPostBySlug } from "@/lib/wordpress/api";

type PostPageParams = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {};
  }

  const url = absoluteUrl(`/posts/${post.slug}/`);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [post.featuredImage?.src ?? getDefaultOgImageUrl()]
    }
  };
}

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="article-page">
      <header className="article-header">
        <PostMeta date={post.date} authorName={post.authorName} />
        <h1>{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
      </header>
      <PostImage image={post.featuredImage} priority />
      <PostContent html={post.contentHtml} />
      <BlogPostingJsonLd post={post} />
    </article>
  );
}
