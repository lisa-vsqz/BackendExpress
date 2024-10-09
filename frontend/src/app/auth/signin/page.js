// app/auth/signin.jsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push("/userscrud"); // Cambia a la ruta protegida que desees
    } else {
      alert("Credenciales inválidas");
    }
  };

  const handleSignUpRedirect = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="sign-in-form flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <label className="block mb-4">
          <span className="text-gray-700">Correo electrónico:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="tu@correo.com"
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Contraseña:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="********"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Iniciar Sesión
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600">¿No tienes una cuenta?</span>
          <button
            type="button"
            onClick={handleSignUpRedirect}
            className="ml-2 text-blue-600 hover:underline"
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  );
}
