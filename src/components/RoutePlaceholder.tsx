interface RoutePlaceholderProps {
  name: string;
}

export function RoutePlaceholder({ name }: RoutePlaceholderProps) {
  return (
    <main className="grid min-h-[60dvh] place-items-center bg-chalk text-ink">
      <h1 className="text-8 text-brand">{name}</h1>
    </main>
  );
}
