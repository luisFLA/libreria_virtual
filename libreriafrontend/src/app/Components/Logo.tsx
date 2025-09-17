'use client';
import Image from 'next/image';

export default function Logo({className='w-44 h-auto'}:{className?:string}) {
  return (
    <div className={className} aria-label="Páginas con Historia">
      <Image src="/logo.png" alt="Logo Páginas con Historia" width={512} height={512} priority />
    </div>
  );
}
