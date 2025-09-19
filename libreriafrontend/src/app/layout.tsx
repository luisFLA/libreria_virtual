import "./globals.css";
import "./Estilo/base.css";
import "./Estilo/inicio.css";
import "./Estilo/login.css";
import "./Estilo/productos.css";

import Proveedores from "./Providers";
import Header from "./Components/Header";
import Logo from "./Components/Logo";
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
          <footer style={{ background: '#fff6f0', borderTop: '1px solid #eee', marginTop: 32 }}>
            <div className="container" style={{ textAlign: 'center', padding: '24px 0', color: '#888', fontSize: 15 }}>
              <span style={{ fontWeight: 600, color: '#ff7e29' }}>PÁGINAS CON HISTORIA</span> &nbsp;|&nbsp; © {new Date().getFullYear()}<br />
              <a href="/" style={{ color: '#ff7e29', margin: '0 8px' }}>Inicio</a>
              <a href="/productos" style={{ color: '#ff7e29', margin: '0 8px' }}>Catálogo</a>
              <a href="/cuenta" style={{ color: '#ff7e29', margin: '0 8px' }}>Mi cuenta</a>
            </div>
          </footer>
        </Proveedores>
      </body>
    </html>
  );
}
