type ErrorStateProps = {
  title: string;
  description: string;
};

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <section className="error-state" aria-labelledby="error-state-heading">
      <h2 id="error-state-heading">{title}</h2>
      <p>{description}</p>
    </section>
  );
}
