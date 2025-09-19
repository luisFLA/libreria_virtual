"use client";
import React from "react";
import { AuthProvider } from "../Context/auth-context";
import { CatalogoProvider } from "../Context/catalogo-context";
import { CarritoProvider } from "../Context/carrito-context";

export default function Proveedores({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CatalogoProvider>
        <CarritoProvider>
          {children}
        </CarritoProvider>
      </CatalogoProvider>
    </AuthProvider>
  );
}
