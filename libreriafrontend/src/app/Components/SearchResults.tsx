
"use client";
import React, { useState, useEffect } from "react";
import { useCatalogo } from "../Context/catalogo-context";
import { useCarrito } from "../Context/carrito-context";
import { useAuth } from "../Context/auth-context";
import { useFavoritos } from "../Context/favoritos-context";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

function PortadaGenerica() {
  return <div className="cover" />;
}

import type { Libro } from "../Modelos/libro";
import type { Usuario } from "../Modelos/usuario";

type Favorito = { id_libro: number };
type Props = {
  libros?: Libro[];
  soloFavoritos?: boolean;
};

export default function SearchResults({ libros: librosProp, soloFavoritos }: Props) {
  const { libros: librosCtx, vista, cargando, error } = useCatalogo();
  const { agregar: agregarCarrito } = useCarrito();
  const { usuario } = useAuth();
  const { items: favoritos, agregar, quitar } = useFavoritos();
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [librosLocal, setLibrosLocal] = useState<Libro[]|undefined>(librosProp);

  // Función para saber si un libro es favorito
  function esFavorito(id_libro: number) {
    return favoritos.some(l => l.id_libro === id_libro);
  }

  // Función para agregar o quitar favorito
  async function handleFavorito(libro: Libro) {
    if (!usuario) {
      router.push("/login");
      return;
    }
    if (esFavorito(libro.id_libro)) {
      await quitar(libro.id_libro);
      setMsg("Eliminado de favoritos");
      setTimeout(() => setMsg(""), 1500);
      if (soloFavoritos && librosLocal) {
        setLibrosLocal(prev => prev ? prev.filter(l => l.id_libro !== libro.id_libro) : prev);
      }
    } else {
      await agregar(libro);
      setMsg("Agregado a favoritos");
      setTimeout(() => setMsg(""), 1500);
    }
  }

  // Mantener sincronizado librosLocal con librosProp
  useEffect(() => {
    setLibrosLocal(librosProp);
  }, [librosProp]);


  const libros = librosLocal ?? librosCtx;
  if (cargando && !librosProp) return <div style={{ padding: 40, textAlign:"center" }}>Cargando…</div>;
  if (error && !librosProp) return <div style={{ padding: 40, textAlign:"center", color:"#dc2626" }}>{error}</div>;
  if (!libros.length) return <p className="muted" style={{ padding: 40, textAlign:"center" }}>Sin resultados</p>;
  
  // Mensaje de éxito
  const showMsg = msg && <div style={{ background: '#e0ffe0', color: '#1a7f37', padding: 8, borderRadius: 8, marginBottom: 12, textAlign: 'center', zIndex: 10 }}>{msg}</div>;

  if (vista === "lista" && !librosProp) {
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
              <button
                className="btn"
                style={{ background: esFavorito(l.id_libro) ? '#ffe0e0' : '#fff', color: esFavorito(l.id_libro) ? '#ff7e29' : '#aaa', border: 'none', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label={esFavorito(l.id_libro) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                onClick={() => handleFavorito(l)}
              >
                <svg width="22" height="22" fill="none" stroke={esFavorito(l.id_libro) ? '#ff7e29' : '#aaa'} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 21s-8-6.58-8-11.5A5.5 5.5 0 0 1 12 4.5a5.5 5.5 0 0 1 8 5.01C20 14.42 12 21 12 21z"/>
                </svg>
              </button>
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
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:12, gap:8 }}>
              <button
                className="btn"
                style={{ background: esFavorito(l.id_libro) ? '#ffe0e0' : '#fff', color: esFavorito(l.id_libro) ? '#ff7e29' : '#aaa', border: 'none', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label={esFavorito(l.id_libro) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                onClick={() => handleFavorito(l)}
              >
                <svg width="22" height="22" fill="none" stroke={esFavorito(l.id_libro) ? '#ff7e29' : '#aaa'} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 21s-8-6.58-8-11.5A5.5 5.5 0 0 1 12 4.5a5.5 5.5 0 0 1 8 5.01C20 14.42 12 21 12 21z"/>
                </svg>
              </button>
              {soloFavoritos && (
                <button
                  className="btn"
                  style={{ background: '#ffe0e0', color: '#dc2626', border: 'none', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Eliminar de favoritos"
                  onClick={() => handleFavorito(l)}
                >
                  <svg width="20" height="20" fill="none" stroke="#dc2626" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              )}
              <button className="btn" onClick={()=>agregarCarrito(l)}>Pedir L. {l.precio ?? 0}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}