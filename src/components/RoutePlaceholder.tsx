interface RoutePlaceholderProps {
  name: string;
}

export function RoutePlaceholder({ name }: RoutePlaceholderProps) {
  return (
    <main className="grid min-h-dvh place-items-center bg-paper text-ink">
      <h1 className="font-display text-6xl font-bold uppercase tracking-tight text-brand">{name}</h1>
    </main>
  );
}
