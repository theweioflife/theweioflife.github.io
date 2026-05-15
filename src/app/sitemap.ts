import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config/site";
import { getAllPosts, getCategories } from "@/lib/wordpress/api";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  const totalPostPages = Math.max(1, Math.ceil(posts.length / siteConfig.postsPerPage));
  const postPageRoutes = Array.from({ length: Math.max(0, totalPostPages - 1) }, (_, index) => ({
    url: absoluteUrl(`/posts/page/${index + 2}/`),
    lastModified: new Date()
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date()
    },
    {
      url: absoluteUrl("/posts/"),
      lastModified: new Date()
    },
    {
      url: absoluteUrl("/about/"),
      lastModified: new Date()
    },
    ...postPageRoutes,
    ...posts.map((post) => ({
      url: absoluteUrl(`/posts/${post.slug}/`),
      lastModified: new Date(post.modified)
    })),
    ...categories
      .filter((category) => category.count !== 0)
      .map((category) => ({
        url: absoluteUrl(`/categories/${category.slug}/`),
        lastModified: new Date()
      }))
  ];
}
