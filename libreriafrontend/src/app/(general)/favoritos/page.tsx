"use client";

import { useAuth } from "../../Context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFavoritos } from "../../Context/favoritos-context";
import SearchResults from "../../Components/SearchResults";


export default function FavoritosPage() {
  const { usuario } = useAuth();
  const router = useRouter();
  const { items, recargar } = useFavoritos();

  useEffect(() => {
    if (!usuario) {
      router.replace("/login");
      return;
    }
    recargar();
  }, [usuario, router, recargar]);

  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <h1 className="h1" style={{ marginBottom: 16 }}>Mis Favoritos</h1>
      {items.length === 0 ? <div className="muted">No tienes favoritos.</div> :
        <SearchResults libros={items} soloFavoritos />
      }
    </main>
  );
}
