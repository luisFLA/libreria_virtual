export type Libro = {
  id_libro: number;
  titulo: string;
  autor: string;
  genero: string;
  editorial?: string;
  color?: string;
  material?: string;
  precio?: number;
  portadaUrl?: string; // opcional para UI
};
