"use client";
import "../../Estilo/productos.css";
import { useAuth } from "../../Context/auth-context";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Favorito } from "../../Modelos/favoritos";

export default function FavoritosPage() {
    const { usuario } = useAuth();
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!usuario) return;

        const cargarFavoritos = async () => {
            try {
                setCargando(true);
                const favs = await api.obtenerFavoritosPorUsuario(usuario.id_usuario);
                setFavoritos(favs);
            } catch (err: any) {
                setError(err.message || "Error al cargar favoritos");
            } finally {
                setCargando(false);
            }
        };

        cargarFavoritos();
    }, [usuario]);

    // 🔹 Función para eliminar favorito
    const eliminarFavorito = async (id_favorito: number) => {
        try {
            await api.eliminarFavoritosPorUsuario(id_favorito); // aquí llamas al backend
            setFavoritos(prev => prev.filter(f => f.id_favorito !== id_favorito)); // actualizas estado
        } catch (err: any) {
            alert(err.message || "Error al eliminar favorito");
        }
    };

    if (!usuario) {
        return <div style={{ padding: 24 }}>Debes iniciar sesión para ver tus favoritos.</div>;
    }

    return (
        <main className="container" style={{ padding: "24px 0" }}>
            <h1>Mis Favoritos</h1>

            {cargando && <p>Cargando favoritos…</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!cargando && !error && favoritos.length === 0 && (
                <p>No tienes favoritos todavía.</p>
            )}

            {!cargando && !error && favoritos.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
                    {favoritos.map(fav => (
                        <div key={fav.id_favorito} className="card" style={{ padding: 12 }}>
                            <h3>{fav.Libro?.titulo}</h3>
                            <p><strong>Autor:</strong> {fav.Libro?.autor}</p>
                            <p><strong>Género:</strong> {fav.Libro?.genero}</p>
                            {fav.comentario && <p><strong>Comentario:</strong> {fav.comentario}</p>}
                            <p><strong>Valoración:</strong> {fav.valoracion}/5</p>
                            <button
                                onClick={() => eliminarFavorito(fav.id_favorito)}
                                style={{ backgroundColor: "red", color: "white", padding: "6px 12px", border: "none", cursor: "pointer" }}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}