
import { useState } from "react";
import { api } from "../lib/api";

export default function RegisterForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [repeat, setRepeat] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setError("");
    if (password !== repeat) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await api.registrarUsuario({ correo, password, tipo_usuario: 'cliente' });
      setMsg("Usuario registrado correctamente. Ya puedes iniciar sesión.");
      setCorreo(""); setPassword(""); setRepeat("");
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto border rounded-2xl p-6 opacity-90 bg-white" autoComplete="off">
      <h2 style={{ textAlign: "center", fontWeight: 600, marginBottom: 16 }}>Registro de usuario</h2>
      {msg && <div style={{ color: '#1a7f37', background: '#e0ffe0', padding: 8, borderRadius: 8, marginBottom: 12, textAlign: 'center' }}>{msg}</div>}
      {error && <div style={{ color: '#dc2626', background: '#ffe0e0', padding: 8, borderRadius: 8, marginBottom: 12, textAlign: 'center' }}>{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Correo electrónico</label>
        <input type="email" required value={correo} onChange={e => setCorreo(e.target.value)} className="input w-full" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Contraseña</label>
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="input w-full" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Repetir contraseña</label>
        <input type="password" required value={repeat} onChange={e => setRepeat(e.target.value)} className="input w-full" />
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
    </form>
  );
}
