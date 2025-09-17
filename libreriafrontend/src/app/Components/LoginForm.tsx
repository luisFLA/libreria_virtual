'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../Context/auth-context';

export default function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'usuario'|'administrador'>('usuario');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setLoading(true); setError(null);
    try{
      const res = await fetch('/api/auth/login', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, password, role })
      });
      if(!res.ok) throw new Error('Credenciales inválidas');
      const data = await res.json();
      setUser(data);
      router.push(role === 'administrador' ? '/admin' : '/');
    }catch(err:any){
      setError(err.message || 'Error al iniciar sesión');
    }finally{
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-1">
        <label className="text-sm">Tipo de usuario</label>
        <div className="grid grid-cols-2 gap-2">
          {(['usuario','administrador'] as const).map(r => (
            <button type="button" key={r}
              onClick={()=>setRole(r)}
              className={`rounded-xl border px-3 py-2 ${role===r ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50'}`}>
              {r[0].toUpperCase()+r.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm">Correo</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
          placeholder="Ingresa tu correo" className="w-full rounded-xl border px-4 py-2"/>
      </div>
      <div>
        <label className="text-sm">Contraseña</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
          placeholder="••••••••" className="w-full rounded-xl border px-4 py-2"/>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-neutral-900 text-white py-2 hover:bg-black disabled:opacity-60">
        {loading ? 'Ingresando...' : 'Continuar'}
      </button>
    </form>
  );
}
