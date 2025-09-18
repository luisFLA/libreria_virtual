import "./globals.css";
import "./Estilo/base.css";
import "./Estilo/inicio.css";
import "./Estilo/login.css";
import "./Estilo/productos.css";

import Proveedores from "./Providers";
import Header from "./Components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Librería | Páginas con Historia",
  description: "Inicio, login y búsqueda",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh">
        <Proveedores>
          <Header />
          {children}
          <footer>© {new Date().getFullYear()} Páginas con Historia</footer>
        </Proveedores>
      </body>
    </html>
  );
}
