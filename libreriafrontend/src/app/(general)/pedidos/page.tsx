"use client";
import "../../Estilo/productos.css";
import { useAuth } from "../../Context/auth-context";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Pedido } from "../../Modelos/pedido";

export default function PedidosPage() {
    const { usuario } = useAuth();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!usuario) return;

        const cargarPedidos = async () => {
            try {
                setCargando(true);
                // Llamar al backend: GET /pedidos/usuario/:id
                const res = await api.obtenerPedidosPorUsuario(usuario.id_usuario);
                setPedidos(res);
            } catch (err: any) {
                setError(err.message || "Error al cargar pedidos");
            } finally {
                setCargando(false);
            }
        };

        cargarPedidos();
    }, [usuario]);

    if (!usuario) {
        return <div style={{ padding: 24 }}>Debes iniciar sesión para ver tus pedidos.</div>;
    }

    return (
        <main className="container" style={{ padding: "24px 0" }}>
            <h1>Mis Pedidos</h1>

            {cargando && <p>Cargando pedidos…</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!cargando && !error && pedidos.length === 0 && (
                <p>No tienes pedidos todavía.</p>
            )}

            {!cargando && !error && pedidos.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
                    {pedidos.map(pedido => (
                        <div key={pedido.id_pedido} className="card" style={{ padding: 12 }}>
                            <h3>{pedido.Libro?.titulo}</h3>
                            <p><strong>ID Libro:</strong> {pedido.id_libro}</p>
                            <p><strong>Ejemplar físico:</strong> {pedido.ejemplar_fisico ? "Sí" : "No"}</p>
                            <p><strong>Precio:</strong> L. {pedido.precio}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}