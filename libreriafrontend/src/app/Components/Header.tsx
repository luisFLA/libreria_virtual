"use client";
import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useAuth } from "../Context/auth-context";

export default function Header() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <header className="header">
      <div className="header__inner container" style={{ justifyContent: "center", position: "relative" }}>
        {/* Menú lateral (icono cuadrícula) */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
          <Link href="/productos" className="btn" aria-label="Catálogo" style={{ fontSize: 28, background: "#fff3e0", color: "#ff7e29", border: "none", marginRight: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="2" fill="#ff7e29"/><rect x="14" y="3" width="7" height="7" rx="2" fill="#ff7e29"/><rect x="14" y="14" width="7" height="7" rx="2" fill="#ff7e29"/><rect x="3" y="14" width="7" height="7" rx="2" fill="#ff7e29"/></svg>
          </Link>
        </div>

        {/* Logo centrado */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <Link href="/" className="flex items-center" style={{ justifyContent: "center" }}><Logo /></Link>
          <span style={{ fontSize: 12, color: "#888", letterSpacing: 1, marginTop: 2 }}>PAGINAS CON HISTORIA</span>
        </div>

        {/* Íconos a la derecha y botón de registro */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/cuenta" className="btn" aria-label="Cuenta">
            <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
          </Link>
          <Link href="/carrito" className="btn" aria-label="Carrito">
            <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </Link>
          <Link href="/favoritos" className="btn" aria-label="Favoritos">
            <svg width="22" height="22" fill="none" stroke="#ff7e29" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21s-8-6.58-8-11.5A5.5 5.5 0 0 1 12 4.5a5.5 5.5 0 0 1 8 5.01C20 14.42 12 21 12 21z"/></svg>
          </Link>
          <Link href="/registro" className="btn btn-primary" style={{ marginLeft: 8 }}>Registrarse</Link>
        </div>
      </div>
      {/* Barra de búsqueda debajo del header */}
      <div className="container" style={{ marginTop: 12, marginBottom: 8 }}>
        <SearchBar />
      </div>
    </header>
  );
}
