"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Context/auth-context";

export default function CuentaPage() {
  const { usuario, cerrarSesion } = useAuth();
  const router = useRouter();

  // Si no hay sesión, manda a login
  useEffect(() => {
    if (!usuario) {
      router.replace("/login");
    }
  }, [usuario, router]);

  // Vista intermedia mientras redirige
  if (!usuario) {
    return (
      <main className="container" style={{ padding: "24px 0" }}>
        <div className="card">Redirigiendo a iniciar sesión…</div>
      </main>
    );
  }

  // Vista con datos
  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <h1 className="h1" style={{ marginBottom: 16 }}>Mi cuenta</h1>

      <section className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Datos del usuario</h2>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Tipo:</strong> {usuario.tipo_usuario}</p>
        <button className="btn" style={{ marginTop: 16, background: '#ff7e29', color: '#fff' }} onClick={() => {
          cerrarSesion();
          router.replace("/login");
        }}>Cerrar sesión</button>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Acciones rápidas</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href="/productos" className="btn">Ir al catálogo</a>
          <a href="/favoritos" className="btn">Ver favoritos</a>
          <a href="/pedidos" className="btn">Ver pedidos</a>
        </div>
      </section>
    </main>
  );
}
