// app/auth/signup.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [firstName, setFirstName] = useState(''); // Agregar campos necesarios
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('client');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Llama a tu API para crear un nuevo usuario
    const res = await fetch("http://localhost:5000/api/users", { // Cambia la URL según tu API
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, role }),
    });

    if (res.ok) {
      router.push("/auth/signin");
    } else {
      const errorData = await res.json();
      alert(`Error al registrarse: ${errorData.message}`);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">Registrarse</h1>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Número de Teléfono:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Rol:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-input"
          >
            <option value="client">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="signup-button">Registrarse</button>
      </form>
    </div>
  );
}
