'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm(){
  const [form, setForm] = useState({nombre:'', email:'', password:'', confirmar:''});
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function set<K extends keyof typeof form>(k:K, v:any){ setForm(p=>({...p,[k]:v})) }

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    if(form.password !== form.confirmar){
      setError('Las contraseñas no coinciden'); return;
    }
    setLoading(true); setError(null);
    try{
      const res = await fetch('/api/usuarios', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if(!res.ok) throw new Error('No se pudo crear el usuario');
      router.push('/(auth)/login');
    }catch(err:any){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
      <input value={form.nombre} onChange={e=>set('nombre', e.target.value)} required placeholder="Nombre" className="w-full rounded-xl border px-4 py-2"/>
      <input type="email" value={form.email} onChange={e=>set('email', e.target.value)} required placeholder="Correo" className="w-full rounded-xl border px-4 py-2"/>
      <input type="password" value={form.password} onChange={e=>set('password', e.target.value)} required placeholder="Contraseña" className="w-full rounded-xl border px-4 py-2"/>
      <input type="password" value={form.confirmar} onChange={e=>set('confirmar', e.target.value)} required placeholder="Confirmar contraseña" className="w-full rounded-xl border px-4 py-2"/>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-neutral-900 text-white py-2 hover:bg-black disabled:opacity-60">
        {loading ? 'Creando...' : 'Crear usuario'}
      </button>
    </form>
  );
}
