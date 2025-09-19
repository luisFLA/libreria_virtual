import { createContext, useContext, useState } from "react";
import { api } from "../lib/api";
import type { Libro } from "../Modelos/libro";
import { useAuth } from "./auth-context";

export type FavoritoItem = Libro;

type FavoritosContextType = {
  items: FavoritoItem[];
  agregar: (libro: Libro) => Promise<void>;
  quitar: (id_libro: number) => Promise<void>;
  vaciar: () => void;
  recargar: () => Promise<void>;
};

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoritoItem[]>([]);
  const { usuario } = useAuth();

  const recargar = async () => {
    if (!usuario) return setItems([]);
    const favoritos = await api.pedirFavoritosUsuario(usuario.id_usuario);
    setItems(Array.isArray(favoritos) ? favoritos.map((f: any) => f.Libro) : []);
  };

  const agregar = async (libro: Libro) => {
    if (!usuario) throw new Error("Debes iniciar sesión");
    await api.crearFavorito(usuario.id_usuario, libro.id_libro);
    setItems(prev => [...prev, libro]);
  };

  const quitar = async (id_libro: number) => {
    if (!usuario) throw new Error("Debes iniciar sesión");
    await api.eliminarFavorito(usuario.id_usuario, id_libro);
    setItems(prev => prev.filter(l => l.id_libro !== id_libro));
  };

  const vaciar = () => setItems([]);

  return (
    <FavoritosContext.Provider value={{ items, agregar, quitar, vaciar, recargar }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export const useFavoritos = () => {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error("useFavoritos debe usarse dentro de FavoritosProvider");
  return ctx;
};
