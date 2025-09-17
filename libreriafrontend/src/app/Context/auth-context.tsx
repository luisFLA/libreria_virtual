'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Usuario } from '../Modelos/usuario';

type AuthCtx = {
  user: Usuario | null;
  setUser: (u: Usuario | null) => void;
};

const Ctx = createContext<AuthCtx>({ user: null, setUser: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  return <Ctx.Provider value={{ user, setUser }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
