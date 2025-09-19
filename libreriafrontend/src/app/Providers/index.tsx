"use client";
import React, { ReactNode } from "react";
import { AuthProvider } from "../Context/auth-context";
import { CatalogoProvider } from "../Context/catalogo-context";
import { CarritoProvider } from "../Context/carrito-context";
import { FavoritosProvider } from "../Context/favoritos-context";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <CatalogoProvider>
        <CarritoProvider>
          <FavoritosProvider>
            {children}
          </FavoritosProvider>
        </CarritoProvider>
      </CatalogoProvider>
    </AuthProvider>
  );
};

export default Providers;
