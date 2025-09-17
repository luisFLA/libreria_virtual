export type Rol = 'usuario' | 'administrador';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  favoritos?: string[];
}
