'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Libro } from '../Modelos/libro';

export default function SearchResults(){
  const params = useSearchParams();
  const q = params.get('q')||'';
  const [items, setItems] = useState<Libro[]>([]);

  useEffect(()=>{
    if(!q) return;
    fetch(`/api/buscar?q=${encodeURIComponent(q)}`)
      .then(r=>r.json())
      .then(d=>setItems(d.resultados||[]));
  },[q]);

  if(!q) return <p>Escribe algo para buscar…</p>;
  if(items.length===0) return <p>No se encontraron resultados para “{q}”.</p>;

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(b => (
        <li key={b.id} className="rounded-2xl border p-4 hover:shadow-sm transition">
          <h3 className="font-semibold">{b.titulo}</h3>
          <p className="text-sm opacity-80">{b.autor}</p>
          <p className="text-xs mt-2">Género: {b.genero} · Año: {b.anio}</p>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1.5 rounded-full border hover:bg-neutral-50">Favoritos</button>
            <button className="px-3 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-black">Pedir</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
