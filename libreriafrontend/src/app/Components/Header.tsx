'use client';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/"><Logo className="w-20" /></Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/buscar" className="hover:underline">Buscar</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/contacto" className="hover:underline">Contáctanos</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/(auth)/login" className="px-3 py-1.5 rounded-full border hover:bg-neutral-50">Iniciar sesión</Link>
          <Link href="/(auth)/register" className="px-3 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-black">Crear usuario</Link>
        </div>
      </div>
    </header>
  );
}
