import React, { useState, useEffect } from 'react';
import '../../assets/css/Perfil.css';
import '../../assets/css/barra.css';
import '../../assets/css/general.css';
import '../../assets/css/fondo.css';
import { getLoggedInUser, updateUserInLocalStorage } from '../../utils/auth';
import { User } from '../../utils/users';
import { Link } from 'react-router-dom';

const Perfil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      setEditableUser({ ...loggedInUser });
    }
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editableUser) {
      const { name, value } = e.target;
      setEditableUser({ ...editableUser, [name]: value });
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editableUser) {
      updateUserInLocalStorage(editableUser);
      setUser(editableUser);
      alert('Datos actualizados con éxito. Cierre sesión y vuelva a ingresar para refrescar los datos');
    } else {
      setError('No se pudo actualizar los datos del usuario');
    }
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className='body'>
      <nav className="navbar">
        <ul className="navbar-links">
          <li><Link to="/login">Cerrar sesión</Link></li>
          <li><Link to="/carnet">Carnet</Link></li>
          <li><Link to="/historial">Historial</Link></li>
        </ul>
      </nav>
      
      <div className="perfil-container">
        <h2>Perfil de Usuario</h2>
        {user && editableUser ? (
          <form className="perfil-form" onSubmit={handleUpdate}>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={editableUser.username}
              onChange={handleInputChange}
              required
              readOnly
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={editableUser.nombre}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={editableUser.apellido}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={editableUser.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cedula"
              placeholder="Cédula"
              value={editableUser.cedula}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="fechaNacimiento"
              placeholder="Fecha de nacimiento"
              value={editableUser.fechaNacimiento}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={editableUser.correo}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              value={editableUser.ciudad}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={editableUser.direccion}
              onChange={handleInputChange}
              required 
            />
            <select
              name="estado"
              value={editableUser.estado}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione su estado civil</option>
              <option value="soltero">Soltero</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
              <option value="viudo">Viudo</option>
            </select>
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={editableUser.telefono}
              onChange={handleInputChange}
              required
            />
            <select
              name="sexo"
              value={editableUser.sexo}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione su sexo</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
            </select>
            <select
              name="discapacidad"
              value={editableUser.discapacidad}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione su discapacidad</option>
              <option value="auditiva">Auditiva</option>
              <option value="visual">Visual</option>
              <option value="motora">Motora</option>
              <option value="cognitiva">Cognitiva</option>
              <option value="ninguna">Ninguna</option>
            </select>
            {error && <p className="error">{error}</p>}
            <button type="submit">Actualizar</button>
          </form>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
    </div>
  );
};

export default Perfil;
