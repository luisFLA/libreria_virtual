"use client";
import "../../Estilo/login.css";
import LoginForm from "../../Components/LoginForm";

export default function LoginPage() {
  return (
    <main className="container" style={{ padding: "28px 0" }}>
      <div className="login__grid">
        <div className="login__left" />
        <div className="card">
          <div className="login__avatar" />
          <h1 className="login__title">Inicia Sesion</h1>
          <div className="space-y">
            <button className="btn">Continuar con Google</button>
            <button className="btn">Continuar con Facebook</button>
          </div>
          <div className="login__divider"><span>o con correo</span></div>
          <LoginForm />
          <div className="muted" style={{ textAlign:"center", marginTop:12 }}>¿Olvidaste tu Contraseña?</div>
          <div className="muted" style={{ textAlign:"center", marginTop:6 }}>Continuar con SSO</div>
        </div>
      </div>
    </main>
  );
}
