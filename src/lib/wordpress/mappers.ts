import { sanitizeHtml, stripHtml } from "@/lib/wordpress/sanitize";
import type {
  Category,
  FeaturedImage,
  Page,
  Post,
  WordPressCategory,
  WordPressMedia,
  WordPressPage,
  WordPressPost,
  WordPressTerm
} from "@/lib/wordpress/types";

export function mapPost(post: WordPressPost): Post {
  const title = stripHtml(post.title.rendered) || "未命名文章";
  return {
    id: post.id,
    slug: decodeSlug(post.slug),
    title,
    excerpt: truncate(stripHtml(post.excerpt.rendered || post.content.rendered), 160),
    contentHtml: sanitizeHtml(post.content.rendered, `${title} 內文圖片`),
    date: post.date,
    modified: post.modified,
    authorName: post._embedded?.author?.[0]?.name ?? "theweioflife",
    categories: mapEmbeddedCategories(post._embedded?.["wp:term"]),
    featuredImage: mapFeaturedImage(post, title)
  };
}

export function mapPage(page: WordPressPage): Page {
  const title = stripHtml(page.title.rendered) || "未命名頁面";
  return {
    id: page.id,
    slug: decodeSlug(page.slug),
    title,
    contentHtml: sanitizeHtml(page.content.rendered, `${title} 內文圖片`),
    excerpt: truncate(stripHtml(page.excerpt.rendered || page.content.rendered), 160),
    modified: page.modified
  };
}

export function mapCategory(category: WordPressCategory): Category {
  return {
    id: category.id,
    name: category.name,
    slug: decodeSlug(category.slug),
    count: category.count
  };
}

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function paginatePosts(posts: Post[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const start = (page - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    page,
    totalPages
  };
}

function mapEmbeddedCategories(terms?: WordPressTerm[][]): Category[] {
  return (
    terms
      ?.flat()
      .filter((term) => term.taxonomy === "category")
      .map((term) => ({
        id: term.id,
        name: term.name,
        slug: decodeSlug(term.slug)
      })) ?? []
  );
}

function mapFeaturedImage(post: WordPressPost, title: string): FeaturedImage | undefined {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const src = media?.source_url ?? post.jetpack_featured_media_url;
  if (!src) {
    return undefined;
  }

  const dimensions = getImageDimensions(media);
  return {
    src,
    alt: media?.alt_text?.trim() || `${title} 主圖`,
    width: dimensions.width,
    height: dimensions.height
  };
}

function getImageDimensions(media?: WordPressMedia) {
  return {
    width: media?.media_details?.width ?? media?.media_details?.sizes?.full?.width ?? 1200,
    height: media?.media_details?.height ?? media?.media_details?.sizes?.full?.height ?? 630
  };
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}
