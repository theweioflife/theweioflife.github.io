import Link from "next/link";
import { PostImage } from "@/components/posts/PostImage";
import { PostMeta } from "@/components/posts/PostMeta";
import type { Post } from "@/lib/wordpress/types";

type PostListItemProps = {
  post: Post;
  compact?: boolean;
};

export function PostListItem({ post, compact = false }: PostListItemProps) {
  const className = compact ? "post-list-item post-list-item-compact" : "post-list-item";

  return (
    <article className={className}>
      <Link href={`/posts/${post.slug}/`} className="post-list-image-link" aria-label={post.title}>
        <PostImage image={post.featuredImage} />
      </Link>
      <div className="post-list-content">
        <h2>
          <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
        </h2>
        <PostMeta date={post.date} />
        {compact ? null : (
          <>
            <p>{post.excerpt}</p>
            {post.categories.length ? (
              <p className="category-row">
                {post.categories.map((category) => (
                  <Link key={category.slug} href={`/categories/${category.slug}/`}>
                    {category.name}
                  </Link>
                ))}
              </p>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}
