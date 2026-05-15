export type RenderedText = {
  rendered: string;
};

export type WordPressMediaSize = {
  source_url: string;
  width: number;
  height: number;
};

export type WordPressMedia = {
  id: number;
  alt_text?: string;
  source_url: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, WordPressMediaSize>;
  };
};

export type WordPressTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
};

export type WordPressAuthor = {
  id: number;
  name: string;
  slug: string;
};

export type WordPressPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: RenderedText;
  content: RenderedText;
  excerpt: RenderedText;
  featured_media: number;
  jetpack_featured_media_url?: string;
  _embedded?: {
    author?: WordPressAuthor[];
    "wp:featuredmedia"?: WordPressMedia[];
    "wp:term"?: WordPressTerm[][];
  };
};

export type WordPressPage = WordPressPost;

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type FeaturedImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  count?: number;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  modified: string;
  authorName: string;
  categories: Category[];
  featuredImage?: FeaturedImage;
};

export type Page = {
  id: number;
  slug: string;
  title: string;
  contentHtml: string;
  excerpt: string;
  modified: string;
};

export type PaginatedPosts = {
  posts: Post[];
  page: number;
  totalPages: number;
};
