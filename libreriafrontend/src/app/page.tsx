import "./Estilo/inicio.css";

export default function Page() {
  return (
    <main>
      {/* Hero/banner */}
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

      {/* Nuevos lanzamientos */}
      <section className="container" style={{ marginTop: 48 }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 18, color: '#222' }}>Nuevos Lanzamientos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 24 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '2/3', background: '#eee' }} />
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 600 }}>Simple Way Of Piece Life</div>
                <div className="muted" style={{ fontSize: 14 }}>Autor Ejemplo</div>
                <div style={{ color: '#ff7e29', fontWeight: 700, marginTop: 6 }}>L. 400.00</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mejor valorados */}
      <section className="container" style={{ marginTop: 48 }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 18, color: '#222' }}>Mejor Valorados</h2>
        <div style={{ display: 'flex', gap: 24, overflowX: 'auto' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card" style={{ minWidth: 180, padding: 0, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '2/3', background: '#eee' }} />
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 600 }}>The Road to Recognition</div>
                <div className="muted" style={{ fontSize: 14 }}>Autor Ejemplo</div>
                <div style={{ color: '#ff7e29', fontWeight: 700, marginTop: 6 }}>L. 420.00</div>
                <div style={{ marginTop: 4 }}>
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog destacado */}
      <section className="container" style={{ marginTop: 48 }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 18, color: '#222' }}>Conoce más sobre nuestro Blog</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 18 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card" style={{ minHeight: 120, background: '#f5f5f5' }} />
          ))}
        </div>
      </section>

      {/* Últimos artículos */}
      <section className="container" style={{ marginTop: 48 }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 18, color: '#222' }}>Últimos Artículos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 18 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card" style={{ minHeight: 120, background: '#f5f5f5' }} />
          ))}
        </div>
      </section>

      {/* Best Seller */}
      <section className="container" style={{ marginTop: 48 }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 18, color: '#222' }}>Best Seller</h2>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 24 }}>
          <div style={{ width: 120, aspectRatio: '2/3', background: '#eee', borderRadius: 16 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>Birds Gonna Be Happy</div>
            <div className="muted" style={{ fontSize: 15 }}>Autor Ejemplo</div>
            <div style={{ color: '#ff7e29', fontWeight: 700, marginTop: 6 }}>L. 450.00</div>
          </div>
        </div>
      </section>

      {/* Nuestras mejores categorías */}
      <section className="container" style={{ marginTop: 48, marginBottom: 48 }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 18, color: '#222' }}>Nuestras Mejores Categorías</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 18 }}>
          {['Novelas', 'Crecimiento Personal', 'Finanzas', 'Medicina', 'Comercio'].map((cat, i) => (
            <div key={i} className="card" style={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18, background: '#f5f5f5' }}>{cat}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
