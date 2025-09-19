"use client";
import "../../Estilo/productos.css";
import { useCatalogo } from "../../Context/catalogo-context";
import { useState } from "react";
import SearchResults from "../../Components/SearchResults";

export default function ProductosPage() {
  const { ordenarPor, fijarFiltros, vista, cambiarVista, limite, total } = useCatalogo();
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  // Solo filtro por precio

  const aplicarFiltros = () => {
    fijarFiltros({
      precioMin: precioMin ? Number(precioMin) : undefined,
      precioMax: precioMax ? Number(precioMax) : undefined,
    });
  };

  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <div className="breadcrumb">HOME / PRODUCTS</div>

      <div className="productos__head">
        <div className="muted">Mostrar por:
          <select value={ordenarPor} onChange={(e)=>fijarFiltros({ ordenarPor: e.target.value as any })} className="input" style={{ width: 180, marginLeft: 8 }}>
            <option value="AZ">Alfabéticamente, A-Z</option>
            <option value="ZA">Alfabéticamente, Z-A</option>
          </select>
        </div>
        <div className="muted">Mostrar 1-12 de {total} resultados</div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <select value={limite} onChange={(e)=>fijarFiltros({ limite: Number(e.target.value) })} className="input" style={{ width: 100 }}>
            {[12,24,36].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="view-switch">
            <button onClick={()=>cambiarVista("cuadricula")} className={vista==="cuadricula" ? "activo" : ""} aria-label="Vista cuadricula">▦</button>
            <button onClick={()=>cambiarVista("lista")} className={vista==="lista" ? "activo" : ""} aria-label="Vista lista">≣</button>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:24 }}>
        <aside className="sidebar">
          <div className="sidebar__box" style={{ marginBottom: 12 }}>
            <h3>Precio</h3>
            <div className="flex" style={{ gap:8 }}>
              <input className="input" placeholder="L. 0" value={precioMin} onChange={e=>setPrecioMin(e.target.value.replace(/[^\d]/g, ""))} />
              <input className="input" placeholder="L. 9999" value={precioMax} onChange={e=>setPrecioMax(e.target.value.replace(/[^\d]/g, ""))} />
            </div>
            <button className="btn" style={{ width:"100%", marginTop:10 }} onClick={aplicarFiltros}>Filtro</button>
          </div>
        </aside>

        <section>
          <SearchResults />
          <div className="paginacion">
            <button aria-label="Anterior">←</button>
            <button className="activo">1</button>
            <button>2</button>
            <button>3</button>
            <button aria-label="Siguiente">→</button>
          </div>
        </section>
      </div>
    </main>
  );
}
