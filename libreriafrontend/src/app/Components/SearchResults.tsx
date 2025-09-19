"use client";
import { useCatalogo } from "../Context/catalogo-context";

function PortadaGenerica() {
  return <div className="cover" />;
}

export default function SearchResults() {
  const { libros, vista, agregarFavorito, pedirFisico, cargando, error } = useCatalogo();

  if (cargando) return <div style={{ padding: 40, textAlign:"center" }}>Cargando…</div>;
  if (error) return <div style={{ padding: 40, textAlign:"center", color:"#dc2626" }}>{error}</div>;
  if (!libros.length) return <p className="muted" style={{ padding: 40, textAlign:"center" }}>Sin resultados</p>;

  if (vista === "lista") {
    return (
      <ul className="space-y">
        {libros.map(l => (
          <li key={l.id_libro} className="card" style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div className="cover" style={{ width:64, height:96 }}>
              {/* si tienes URL: <img src={l.portadaUrl} alt={l.titulo}/> */}
            </div>
            <div style={{ flex:1 }}>
              <div className="titulo-libro">{l.titulo}</div>
              <div className="autor-libro">{l.autor} • {l.genero}</div>
            </div>
            <button className="btn" onClick={()=>agregarFavorito(l.id_libro)}>Favorito</button>
            <button className="btn" onClick={()=>pedirFisico(l.id_libro)}>Pedir</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid-products">
      {libros.map(l => (
        <div key={l.id_libro} className="card-book">
          <div className="cover">
            {/* si tienes URL: <img src={l.portadaUrl} alt={l.titulo}/> */}
          </div>
          <div className="titulo-libro">{l.titulo}</div>
          <div className="autor-libro">{l.autor}</div>
          <div className="genero-libro">{l.genero}</div>

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
            <button className="btn" onClick={()=>agregarFavorito(l.id_libro)}>Agregar</button>
            <button className="btn" onClick={()=>pedirFisico(l.id_libro)}>Pedir</button>
          </div>
        </div>
      ))}
    </div>
  );
}
