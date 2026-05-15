import { PostListItem } from "@/components/posts/PostListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Post } from "@/lib/wordpress/types";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  if (!posts.length) {
    return <EmptyState title="目前沒有文章" description="WordPress 尚未回傳公開文章，請稍後再試。" />;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
