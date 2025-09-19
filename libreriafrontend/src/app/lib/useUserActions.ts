import { useAuth } from "../Context/auth-context";
import { api } from "../lib/api";
import type { Libro } from "../Modelos/libro";

export function useUserActions() {
  const { usuario } = useAuth();


  // Pedidos
  const pedirLibro = async (id_libro: number, precio = 0) => {
    if (!usuario) throw new Error("Inicia sesión para pedir ejemplar");
    await api.crearPedido(usuario.id_usuario, id_libro, true, precio);
  };
  // Si existe una función para obtener pedidos, debe implementarse aquí correctamente.
  // Por ahora, se elimina para evitar error, ya que no existe api.pedidosUsuario.

  return {
    pedirLibro,
    usuario,
  };
}
