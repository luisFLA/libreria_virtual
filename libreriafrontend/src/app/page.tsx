import "./Estilo/inicio.css";

export default function Page() {
  return (
    <main>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <h1 className="h1">Paginas Con Historia</h1>
            <p className="muted" style={{ marginTop: 10, maxWidth: 560 }}>
              Páginas con Historia es más que una librería: es un lugar donde cada libro abre la puerta a un nuevo mundo.
              Nuestro propósito es conectar a los lectores con historias que inspiran, enseñan y acompañan en cada etapa de la vida.
            </p>
            <div className="hero__cta">
              <a href="/productos" className="btn btn-primary">LEER MAS…</a>
            </div>
          </div>

          <div className="mosaic">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="demo-cover" />)}
          </div>
        </div>
      </section>
    </main>
  );
}
