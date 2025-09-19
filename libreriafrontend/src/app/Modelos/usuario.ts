export type Usuario = {
  id_usuario: number;
  correo: string;
  password: string;
  tipo_usuario: "admin" | "cliente";
};
