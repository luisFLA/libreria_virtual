'use client';
import { ReactNode } from 'react';
import { AuthProvider } from '../Context/auth-context';

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
