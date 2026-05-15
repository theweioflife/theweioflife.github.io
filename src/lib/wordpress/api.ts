import { wordpressClient } from "@/lib/http/axios-client";
import { mapCategory, mapPage, mapPost, paginatePosts } from "@/lib/wordpress/mappers";
import type {
  Category,
  Page,
  PaginatedPosts,
  Post,
  WordPressCategory,
  WordPressPage,
  WordPressPost
} from "@/lib/wordpress/types";

const embeddedParams = {
  _embed: "1"
};

export async function getPosts(page = 1, perPage = 100): Promise<PaginatedPosts> {
  const response = await wordpressClient.get<WordPressPost[]>("/posts", {
    params: {
      ...embeddedParams,
      per_page: String(perPage),
      page: String(page)
    }
  });

  const totalPages = Number(response.headers["x-wp-totalpages"] ?? 1);
  return {
    posts: response.data.map(mapPost),
    page,
    totalPages: Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const allPosts: Post[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await getPosts(page, 100);
    allPosts.push(...result.posts);
    totalPages = result.totalPages || (result.posts.length < 100 ? page : page + 1);
    if (result.posts.length < 100) {
      break;
    }
    page += 1;
  } while (page <= totalPages);

  return allPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await wordpressClient.get<WordPressPost[]>("/posts", {
    params: {
      ...embeddedParams,
      slug
    }
  });
  return response.data[0] ? mapPost(response.data[0]) : null;
}

export async function getPages(): Promise<Page[]> {
  const response = await wordpressClient.get<WordPressPage[]>("/pages", {
    params: {
      ...embeddedParams,
      per_page: "100"
    }
  });
  return response.data.map(mapPage);
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const response = await wordpressClient.get<WordPressPage[]>("/pages", {
    params: {
      ...embeddedParams,
      slug
    }
  });
  return response.data[0] ? mapPage(response.data[0]) : null;
}

export async function getCategories(): Promise<Category[]> {
  const response = await wordpressClient.get<WordPressCategory[]>("/categories", {
    params: {
      per_page: "100"
    }
  });
  return response.data.map(mapCategory);
}

export async function getPostsByCategorySlug(slug: string): Promise<Post[]> {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    return [];
  }
  return posts.filter((post) => post.categories.some((item) => item.slug === category.slug));
}

export function getPaginatedPosts(posts: Post[], page: number, perPage: number) {
  return paginatePosts(posts, page, perPage);
}
