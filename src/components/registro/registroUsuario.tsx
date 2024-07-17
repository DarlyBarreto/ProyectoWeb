import React, { useState } from 'react';
import '../../assets/css/Registro.css';
import { saveUserToLocalStorage } from '../../utils/auth';
import { User } from '../../utils/users';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const RegistroUsuario: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cedula, setCedula] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [estado, setEstado] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sexo, setSexo] = useState('');
  const [discapacidad, setDiscapacidad] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
    } else if (!validateUsername(username)) {
      setError('El nombre de usuario debe tener entre 4 y 10 caracteres');
    } else if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres');
    } else if (!validateCedula(cedula)) {
      setError('La cédula debe tener 10 dígitos');
    } else if (!validateFechaNacimiento(fechaNacimiento)) {
      setError('La fecha de nacimiento no es válida');
    } else if (!validateCorreo(correo)) {
      setError('El correo electrónico no es válido');
    } else if (!validateNombre(nombre)) {
      setError('El nombre no puede estar vacío y debe tener entre 2 y 20 caracteres');
    } else if (!validateApellido(apellido)) {
      setError('El apellido no puede estar vacío y debe tener entre 2 y 20 caracteres');
    } else if (!validateCiudad(ciudad)) {
      setError('La ciudad no puede estar vacía y debe tener entre 2 y 50 caracteres');
    } else if (!validateDireccion(direccion)) {
      setError('La dirección no puede estar vacía y debe tener entre 5 y 100 caracteres');
    } else if (!validateTelefono(telefono)) {
      setError('El teléfono debe tener entre 7 y 15 dígitos');
    } else {
      const newUser: User = {
        username,
        password,
        cedula,
        fechaNacimiento,
        correo,
        nombre,
        apellido,
        ciudad,
        direccion,
        estado,
        telefono,
        sexo,
        discapacidad
      };
      saveUserToLocalStorage(newUser); // Guardar nuevo usuario en localStorage
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setCedula('');
      setFechaNacimiento('');
      setCorreo('');
      setError('');
      setApellido('');
      setNombre('');
      setCiudad('');
      setDireccion('');
      setEstado('');
      setTelefono('');
      setSexo('');
      setDiscapacidad('');
      alert('Usuario registrado con éxito');
    }
  };

  const validateUsername = (username: string) => {
    return username.length >= 4 && username.length <= 10;
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateCedula = (cedula: string) => {
    return cedula.length === 10;
  };

  const validateFechaNacimiento = (fechaNacimiento: string) => {
    const currentDate = new Date();
    const selectedDate = new Date(fechaNacimiento);
    return selectedDate <= currentDate;
  };

  const validateCorreo = (correo: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  };

  const validateNombre = (nombre: string) => {
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
    return nombreRegex.test(nombre.trim()) && nombre.trim().length >= 2 && nombre.trim().length <= 20;
  };

  const validateApellido = (apellido: string) => {
    const apellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
    return apellidoRegex.test(apellido.trim()) && apellido.trim().length >= 2 && apellido.trim().length <= 20;
  };

  const validateCiudad = (ciudad: string) => {
    return ciudad.trim().length >= 2 && ciudad.trim().length <= 50;
  };

  const validateDireccion = (direccion: string) => {
    return direccion.trim().length >= 5 && direccion.trim().length <= 100;
  };

  const validateTelefono = (telefono: string) => {
    const telefonoRegex = /^[0-9]+$/;
    return telefonoRegex.test(telefono) && telefono.length >= 7 && telefono.length <= 15;
  };

  return (
    <div className="register-container">
      <button className="back-button" id="back-button" onClick={() => navigate('/login')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className="register-form" onSubmit={handleRegister}>
        <img src={Logo} alt="Logo ULEAM" className="Logo" />
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="">Seleccione su estado</option>
          <option value="casada/o">Casada/o</option>
          <option value="soltera/o">Soltera/o</option>
        </select>
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
        >
          <option value="">Seleccione su sexo</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        <select
          value={discapacidad}
          onChange={(e) => setDiscapacidad(e.target.value)}
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
