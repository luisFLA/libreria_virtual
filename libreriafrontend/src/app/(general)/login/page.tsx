"use client";
import "../../Estilo/login.css";
import LoginForm from "../../Components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg,#fff6f0 0%,#fff 100%)' }}>
      <div className="login__grid" style={{ width: '100%', maxWidth: 950, boxShadow: '0 8px 32px rgba(0,0,0,.07)', borderRadius: 24, overflow: 'hidden', background: '#fff' }}>
        {/* Fondo naranja a la izquierda */}
        <div className="login__left" style={{ minHeight: 480, background: 'repeating-linear-gradient(45deg,#ffb26b 0 18px,#ff8a65 18px 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', padding: 24 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 22, marginBottom: 24, textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
            PÁGINAS CON HISTORIA
          </div>
        </div>
        {/* Formulario a la derecha */}
        <div className="card" style={{ border: 'none', boxShadow: 'none', borderRadius: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 32px' }}>
          <div className="login__avatar" style={{ background: 'url(https://randomuser.me/api/portraits/women/44.jpg) center/cover, #e5e7eb' }} />
          <h1 className="login__title">Inicia Sesion</h1>
          <div className="space-y">
            <button className="btn" style={{ width: '100%', background: '#fff', border: '1px solid #eee', color: '#222' }}>Continue with Google</button>
            <button className="btn" style={{ width: '100%', background: '#fff', border: '1px solid #eee', color: '#222' }}>Continue with Facebook</button>
          </div>
          <div className="login__divider"><span>o con Correo</span></div>
          <LoginForm />
          <div className="muted" style={{ textAlign: 'center', marginTop: 12 }}>¿Olvidaste tu Contraseña?</div>
          <div className="muted" style={{ textAlign: 'center', marginTop: 6 }}>Continuar con SSO</div>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>¿No tienes cuenta?</h2>
            <Link href="/registro" className="btn btn-primary" style={{ marginTop: 8 }}>Regístrate aquí</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
