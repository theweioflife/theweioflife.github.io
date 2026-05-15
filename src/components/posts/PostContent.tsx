type PostContentProps = {
  html: string;
};

export function PostContent({ html }: PostContentProps) {
  return <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
