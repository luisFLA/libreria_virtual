'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({placeholder='Busca por título, autor, género'}:{placeholder?:string}){
  const [q, setQ] = useState('');
  const router = useRouter();

  function onSubmit(e: React.FormEvent){
    e.preventDefault();
    if(q.trim().length === 0) return;
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex gap-2">
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-xl border px-4 py-2 outline-none focus:ring-2 ring-neutral-900/20"
      />
      <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black">Buscar</button>
    </form>
  );
}
