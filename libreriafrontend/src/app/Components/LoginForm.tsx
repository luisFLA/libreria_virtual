"use client";
import { useAuth } from "../Context/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { iniciarSesion, cargando, error} = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="card" style={{ maxWidth: 420, margin: "0 auto", width: "100%" }}>
      <label className="muted" style={{ fontSize: 14 }}>Correo</label>
      <input className="input" placeholder="tucorreo@ejemplo.com"
             value={correo} onChange={e=>setCorreo(e.target.value)} />

      <div style={{ height: 8 }} />
      <label className="muted" style={{ fontSize: 14 }}>Contraseña</label>
      <input className="input" type="password" placeholder="••••••••"
             value={password} onChange={e=>setPassword(e.target.value)} />

      <div style={{ height: 12 }} />
      <button
        onClick={async ()=>{
          await iniciarSesion(correo,password);
          // Si no hay error, redirige
          if (!error) router.replace("/cuenta");
        }}
        disabled={cargando}
        className="btn btn-primary"
        style={{ width: "100%" }}
      >
        {cargando ? "Ingresando..." : "Entrar"}
      </button>

      {error && <p style={{ color:"#dc2626", fontSize: 14, marginTop: 8 }}>{error}</p>}
    </div>
  );
}
