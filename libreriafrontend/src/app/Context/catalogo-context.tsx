"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import type { Libro } from "../Modelos/libro";
import { useAuth } from "./auth-context";

type Estado = {
  textoBusqueda: string;
  pagina: number;
  limite: number;
  vista: "cuadricula" | "lista";
  cargando: boolean;
  error?: string;
  libros: Libro[];
  total: number;
  filtroGenero?: string;
  filtroAutor?: string;
  ordenarPor: "AZ" | "ZA";
};

type Ctx = Estado & {
  fijarBusqueda: (t: string) => void;
  fijarFiltros: (p: Partial<Estado>) => void;
  cambiarVista: (v: "cuadricula" | "lista") => void;
  irPagina: (n: number) => void;
  agregarFavorito: (id_libro: number) => Promise<void>;
  pedirFisico: (id_libro: number) => Promise<void>;
  recargar: () => Promise<void>;
};

const inicial: Estado = {
  textoBusqueda: "",
  pagina: 1,
  limite: 12,
  vista: "cuadricula",
  cargando: false,
  libros: [],
  total: 0,
  ordenarPor: "AZ",
};

const CatalogoContext = createContext<Ctx | undefined>(undefined);

export function CatalogoProvider({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<Estado>(inicial);
  const { usuario } = useAuth();

  const cargar = async () => {
    setS(x => ({ ...x, cargando: true, error: undefined }));
    try {
      const lista = await api.libros();
      setS(x => ({ ...x, libros: lista, total: lista.length, cargando: false }));
    } catch (e: any) {
      setS(x => ({ ...x, cargando: false, error: e.message || "No se pudieron cargar los libros" }));
    }
  };

  useEffect(() => { cargar(); }, []);

  const fijarBusqueda = (t: string) => setS(x => ({ ...x, textoBusqueda: t, pagina: 1 }));
  const fijarFiltros = (p: Partial<Estado>) => setS(x => ({ ...x, ...p, pagina: 1 }));
  const cambiarVista = (v: "cuadricula" | "lista") => setS(x => ({ ...x, vista: v }));
  const irPagina = (n: number) => setS(x => ({ ...x, pagina: n }));
  const recargar = async () => cargar();

  const agregarFavorito = async (id_libro: number) => {
    if (!usuario) throw new Error("Inicia sesión para favoritos");
    await api.crearFavorito(usuario.id_usuario, id_libro);
  };
  const pedirFisico = async (id_libro: number) => {
    if (!usuario) throw new Error("Inicia sesión para pedir ejemplar");
    await api.crearPedido(usuario.id_usuario, id_libro, true, 0);
  };

  const filtrados = useMemo(() => {
    let arr = [...s.libros];
    const q = s.textoBusqueda.trim().toLowerCase();
    if (q) arr = arr.filter(l => l.titulo.toLowerCase().includes(q) || l.autor.toLowerCase().includes(q) || l.genero.toLowerCase().includes(q));
    if (s.filtroGenero) arr = arr.filter(l => l.genero.toLowerCase().includes(s.filtroGenero!.toLowerCase()));
    if (s.filtroAutor) arr = arr.filter(l => l.autor.toLowerCase().includes(s.filtroAutor!.toLowerCase()));
    if (s.ordenarPor === "AZ") arr.sort((a,b)=>a.titulo.localeCompare(b.titulo)); else arr.sort((a,b)=>b.titulo.localeCompare(a.titulo));
    return arr;
  }, [s.libros, s.textoBusqueda, s.filtroGenero, s.filtroAutor, s.ordenarPor]);

  const desde = (s.pagina - 1) * s.limite;
  const pagina = filtrados.slice(desde, desde + s.limite);

  return (
    <CatalogoContext.Provider value={{
      ...s,
      libros: pagina,
      total: filtrados.length,
      fijarBusqueda, fijarFiltros, cambiarVista, irPagina, agregarFavorito, pedirFisico, recargar
    }}>
      {children}
    </CatalogoContext.Provider>
  );
}

export const useCatalogo = () => {
  const ctx = useContext(CatalogoContext);
  if (!ctx) throw new Error("useCatalogo debe usarse dentro de CatalogoProvider");
  return ctx;
};
