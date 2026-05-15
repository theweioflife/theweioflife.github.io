type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="empty-state" aria-labelledby="empty-state-heading">
      <h2 id="empty-state-heading">{title}</h2>
      <p>{description}</p>
    </section>
  );
}
