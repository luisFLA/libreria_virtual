"use client";
import React from "react";
import { AuthProvider } from "../Context/auth-context";
import { CatalogoProvider } from "../Context/catalogo-context";

export default function Proveedores({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CatalogoProvider>{children}</CatalogoProvider>
    </AuthProvider>
  );
}
