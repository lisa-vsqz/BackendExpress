// src/app/auth/error.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="error-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Error de Autenticación</h1>
        <p className="mb-6">Ocurrió un error: {error}</p>
        <Link href="/auth/signin" className="text-blue-600 hover:underline">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
