"use client";
import "../../Estilo/productos.css";
import SearchResults from "../../Components/SearchResults";
import { useCatalogo } from "../../Context/catalogo-context";

export default function Productos() {
  const { ordenarPor, fijarFiltros, vista, cambiarVista, limite, total } = useCatalogo();

  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <div className="breadcrumb">HOME / PRODUCTS</div>

      <div className="productos__head">
        <div className="muted">Mostrando {total} resultados</div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <select value={ordenarPor} onChange={(e)=>fijarFiltros({ ordenarPor: e.target.value as any })} className="input" style={{ width: 220 }}>
            <option value="AZ">Mostrar por Alfabéticamente, A-Z</option>
            <option value="ZA">Mostrar por Alfabéticamente, Z-A</option>
          </select>
          <select value={limite} onChange={(e)=>fijarFiltros({ limite: Number(e.target.value) })} className="input" style={{ width: 140 }}>
            {[12,24,36].map(n => <option key={n} value={n}>Show: {n}</option>)}
          </select>
          <div className="view-switch">
            <button onClick={()=>cambiarVista("cuadricula")} className={vista==="cuadricula" ? "activo" : ""}>▦</button>
            <button onClick={()=>cambiarVista("lista")} className={vista==="lista" ? "activo" : ""}>≣</button>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:24 }}>
        <aside className="sidebar">
          <div className="sidebar__box" style={{ marginBottom: 12 }}>
            <h3>Precio</h3>
            <div className="flex" style={{ gap:8 }}>
              <input className="input" placeholder="L 0" />
              <input className="input" placeholder="L 9999" />
            </div>
            <button className="btn" style={{ width:"100%", marginTop:10 }}>Filtro</button>
          </div>
          <div className="sidebar__box"><h3>Tipo de Producto</h3><div className="muted">—</div></div>
          <div className="sidebar__box"><h3>Disponibilidad</h3><div className="muted">—</div></div>
          <div className="sidebar__box"><h3>Editorial</h3><input className="input" placeholder="Filtrar por editorial" /></div>
          <div className="sidebar__box"><h3>Color</h3><input className="input" placeholder="Filtrar por color" /></div>
          <div className="sidebar__box"><h3>Material</h3><input className="input" placeholder="Filtrar por material" /></div>
        </aside>

        <section>
          <SearchResults />
        </section>
      </div>
    </main>
  );
}
