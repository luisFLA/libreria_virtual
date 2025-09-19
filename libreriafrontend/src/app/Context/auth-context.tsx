"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Usuario } from "../Modelos/usuario";

type Ctx = {
  usuario: Usuario | null;
  cargando: boolean;
  error?: string;
  listo: boolean; // ✅ ya leí localStorage
  iniciarSesion: (correo: string, password: string) => Promise<void>;
  cerrarSesion: () => void;
};

const AuthContext = createContext<Ctx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [listo, setListo] = useState(false);



  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("lv:usuario") : null;
      if (raw) setUsuario(JSON.parse(raw));
    } finally {
      setListo(true);
    }
  }, []);

  const iniciarSesion = async (correo: string, password: string) => {
    setCargando(true); setError(undefined);
    try {
      const lista = await api.usuarios();
      const u = lista.find(x => x.correo === correo && x.password === password);
      if (!u) throw new Error("Credenciales inválidas");
      setUsuario(u);
      localStorage.setItem("lv:usuario", JSON.stringify(u));
    } catch (e: any) {
      setError(e.message || "No se pudo iniciar sesión");
    } finally {
      setCargando(false);
      setListo(true);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("lv:usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, error, listo, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
