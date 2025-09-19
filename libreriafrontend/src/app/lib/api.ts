const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000";

async function pedir<T>(ruta: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${ruta}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text().catch(() => `HTTP ${res.status}`));
  return res.json() as Promise<T>;
}

export const api = {
  usuarios: () => pedir<import("../Modelos/usuario").Usuario[]>("/usuarios"),
  libros: () => pedir<import("../Modelos/libro").Libro[]>("/libros"),

  crearFavorito: (id_usuario: number, id_libro: number, valoracion = 5, comentario = "") =>
    pedir("/favoritos", { method: "POST", body: JSON.stringify({ id_usuario, id_libro, valoracion, comentario }) }),

  eliminarFavorito: (id_usuario: number, id_libro: number) =>
    fetch(`${BASE}/favoritos/${id_usuario}/${id_libro}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok && res.status !== 204) throw new Error("No se pudo eliminar favorito");
        return { ok: true };
      }),

  pedirFavoritosUsuario: (id_usuario: number) =>
    pedir(`/favoritos/usuario/${id_usuario}`),

  crearPedido: (id_usuario: number, id_libro: number, ejemplar_fisico = true, precio = 0) =>
    pedir("/pedidos", { method: "POST", body: JSON.stringify({ id_usuario, id_libro, ejemplar_fisico, precio }) }),
  registrarUsuario: (data: { correo: string; password: string; tipo_usuario: string }) =>
    pedir("/usuarios", { method: "POST", body: JSON.stringify(data) }),
};
