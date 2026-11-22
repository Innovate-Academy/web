export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">
        Página en construcción
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted">{description}</p>
    </main>
  );
}
