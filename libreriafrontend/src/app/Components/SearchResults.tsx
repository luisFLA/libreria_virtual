"use client";
import { useCatalogo } from "../Context/catalogo-context";
import { useCarrito } from "../Context/carrito-context";
import { useAuth } from "../Context/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

function PortadaGenerica() {
  return <div className="cover" />;
}

export default function SearchResults() {
  const { libros, vista, agregarFavorito, cargando, error } = useCatalogo();
  const { agregar: agregarCarrito } = useCarrito();
  const { usuario } = useAuth();
  const router = useRouter();
  const [msg, setMsg] = useState("");

  if (cargando) return <div style={{ padding: 40, textAlign:"center" }}>Cargando…</div>;
  if (error) return <div style={{ padding: 40, textAlign:"center", color:"#dc2626" }}>{error}</div>;
  if (!libros.length) return <p className="muted" style={{ padding: 40, textAlign:"center" }}>Sin resultados</p>;
  
  // Mensaje de éxito
  const showMsg = msg && <div style={{ background: '#e0ffe0', color: '#1a7f37', padding: 8, borderRadius: 8, marginBottom: 12, textAlign: 'center' }}>{msg}</div>;

  if (vista === "lista") {
    return (
      <>
        {showMsg}
        <ul className="space-y">
          {libros.map(l => (
            <li key={l.id_libro} className="card" style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div className="cover" style={{ width:64, height:96, overflow:'hidden', background:'#f1f5f9' }}>
                <img
                  src={`/` + encodeURIComponent(l.titulo) + `.jpg`}
                  alt={l.titulo}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                  onError={e => { e.currentTarget.src = '/default-cover.jpg'; }}
                />
              </div>
              <div style={{ flex:1 }}>
                <div className="titulo-libro">{l.titulo}</div>
                <div className="autor-libro">{l.autor} • {l.genero}</div>
                <div style={{ color: '#ff7e29', fontWeight: 700, marginTop: 4 }}>L. {l.precio ?? 0}</div>
              </div>
              <button className="btn" onClick={async () => {
                if (!usuario) {
                  router.push("/login");
                  return;
                }
                await agregarFavorito(l.id_libro);
                setMsg("Agregado a favoritos");
                setTimeout(() => setMsg(""), 1500);
              }}>Favorito</button>
              <button className="btn" onClick={()=>agregarCarrito(l)}>Pedir L. {l.precio ?? 0}</button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      {showMsg}
      <div className="grid-products">
        {libros.map(l => (
          <div key={l.id_libro} className="card-book">
            <div className="cover" style={{ overflow:'hidden', background:'#f1f5f9' }}>
              <img
                src={`/` + encodeURIComponent(l.titulo) + `.jpg`}
                alt={l.titulo}
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
                onError={e => { e.currentTarget.src = '/default-cover.jpg'; }}
              />
            </div>
            <div className="titulo-libro">{l.titulo}</div>
            <div className="autor-libro">{l.autor}</div>
            <div className="genero-libro">{l.genero}</div>
            <div style={{ color: '#ff7e29', fontWeight: 700, marginTop: 4 }}>L. {l.precio ?? 0}</div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
              <button className="btn" onClick={async () => {
                if (!usuario) {
                  router.push("/login");
                  return;
                }
                await agregarFavorito(l.id_libro);
                setMsg("Agregado a favoritos");
                setTimeout(() => setMsg(""), 1500);
              }}>Agregar</button>
              <button className="btn" onClick={()=>agregarCarrito(l)}>Pedir L. {l.precio ?? 0}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}