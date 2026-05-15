type PostMetaProps = {
  date: string;
  authorName?: string;
};

export function PostMeta({ date, authorName }: PostMetaProps) {
  return (
    <p className="post-meta">
      <time dateTime={date}>{formatDate(date)}</time>
      {authorName ? <span> · {authorName}</span> : null}
    </p>
  );
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}
