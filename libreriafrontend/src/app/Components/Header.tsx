"use client";
import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useAuth } from "../Context/auth-context";

export default function Header() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <header className="header">
      <div className="header__inner container">
        <Link href="/" className="flex items-center"><Logo /></Link>

        <div style={{ flex: 1, marginLeft: 16, marginRight: 16 }}>
          <SearchBar />
        </div>

        <nav className="flex items-center" style={{ gap: 12 }}>
          <Link href="/productos" className="muted">Productos</Link>

          {/* Siempre manda a /cuenta */}
          <Link href="/cuenta" className="btn">Cuenta</Link>

          {/* Si hay sesión, además muestra "Salir" */}
          {usuario && (
            <button onClick={cerrarSesion} className="btn">Salir</button>
          )}

          <button className="btn" aria-label="Carrito">🛒</button>
          <button className="btn" aria-label="Favoritos">❤️</button>
        </nav>
      </div>
    </header>
  );
}
