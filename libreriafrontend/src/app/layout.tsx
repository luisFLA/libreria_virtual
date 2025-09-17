import './globals.css';
import type { Metadata } from 'next';
import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Páginas con Historia',
  description: 'Librería virtual',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-neutral-900 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
