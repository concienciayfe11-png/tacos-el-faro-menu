export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-3xl font-bold">Menús Digitales</h1>
      <p className="mt-2 max-w-md text-stone-600">
        Página de ventas — pendiente de contenido. El menú de cada restaurante vive en
        <code className="mx-1 rounded bg-stone-100 px-1">/[slug]</code>, y el panel del dueño en
        <code className="mx-1 rounded bg-stone-100 px-1">/admin</code>.
      </p>
    </main>
  );
}
