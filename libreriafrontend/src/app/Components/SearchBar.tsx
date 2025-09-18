"use client";
import { useCatalogo } from "../Context/catalogo-context";

export default function SearchBar() {
  const { textoBusqueda, fijarBusqueda } = useCatalogo();
  return (
    <div style={{ position: "relative" }}>
      <input
        className="input"
        style={{ paddingLeft: 38 }}
        value={textoBusqueda}
        placeholder="Buscar..."
        onChange={(e)=>fijarBusqueda(e.target.value)}
      />
      <span
        style={{
          position:"absolute", left: 12, top: "50%", transform:"translateY(-50%)",
          opacity:.6, pointerEvents:"none"
        }}
        aria-hidden
      >🔎</span>
    </div>
  );
}
