import Header from './Components/Header';
import SearchBar from './Components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header/>
      <main className="mx-auto max-w-6xl px-4 py-16 space-y-8">
        <section className="grid gap-8 items-center md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Páginas con Historia
            </h1>
            <p className="opacity-80 max-w-prose">
              Un lugar donde cada libro abre la puerta a un nuevo mundo…
            </p>
            <SearchBar/>
          </div>
          <aside className="border rounded-3xl p-8 text-sm opacity-80">
            <p>Explora categorías, descubre novedades y guarda tus favoritos.</p>
            <div className="mt-4 h-10 bg-gray-200 rounded-md" />
          </aside>
        </section>
      </main>
    </div>
  );
}
