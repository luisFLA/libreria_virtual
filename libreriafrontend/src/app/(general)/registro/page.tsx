"use client";
import RegisterForm from "../../Components/RegisterForm";

export default function RegistroPage() {
  return (
    <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg,#fff6f0 0%,#fff 100%)' }}>
      <div className="card" style={{ width: '100%', maxWidth: 400, boxShadow: '0 8px 32px rgba(0,0,0,.07)', borderRadius: 24, overflow: 'hidden', background: '#fff', padding: 32 }}>
        <h1 className="h1" style={{ textAlign: 'center', marginBottom: 24 }}>Registro</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
