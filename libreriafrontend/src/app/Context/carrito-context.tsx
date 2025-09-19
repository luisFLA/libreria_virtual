"use client";
import { createContext, useContext, useState } from "react";
import { api } from "../lib/api";
import type { Libro } from "../Modelos/libro";
import { useAuth } from "./auth-context";

export type CarritoItem = Libro & { cantidad: number };

type CarritoContextType = {
  items: CarritoItem[];
  agregar: (libro: Libro) => void;
  quitar: (id_libro: number) => void;
  vaciar: () => void;
  confirmar: () => Promise<void>;
  total: number;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CarritoItem[]>([]);
  const { usuario } = useAuth();

  const agregar = (libro: Libro) => {
    setItems(prev => {
      const existe = prev.find(i => i.id_libro === libro.id_libro);
      if (existe) {
        return prev.map(i => i.id_libro === libro.id_libro ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { ...libro, cantidad: 1 }];
    });
  };

  const quitar = (id_libro: number) => {
    setItems(prev => prev.filter(i => i.id_libro !== id_libro));
  };

  const vaciar = () => setItems([]);

  const confirmar = async () => {
    if (!usuario) throw new Error("Debes iniciar sesión");
    for (const item of items) {
      await api.crearPedido(usuario.id_usuario, item.id_libro, true, item.precio ?? 0);
    }
    setItems([]);
  };

  const total = items.reduce((acc, i) => acc + (i.precio ?? 0) * i.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ items, agregar, quitar, vaciar, confirmar, total }}>
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
};
