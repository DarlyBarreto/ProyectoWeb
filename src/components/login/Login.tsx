import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css';
import { authenticateUser } from '../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

interface User {
    username: string;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: string;
    correo: string;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = authenticateUser(username, password);
        if (user) {
            setError('');
            alert('Inicio de sesión exitoso');
            sessionStorage.setItem('user', JSON.stringify(user));
            navigate('/perfil');
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className='fondo'>
            <button className="back-button" id="back-button" onClick={() => navigate('/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <img src={Logo} alt="Logo ULEAM" className="Logo" />
                    <h2>Inicio de Sesión</h2>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Iniciar Sesión</button>
                    <div className="login-options">
                        <button className="register-button" onClick={() => navigate('/login-admin')}>
                            Iniciar sesión como administrador
                        </button>
                        <button className="register-button" onClick={() => navigate('/registro')}>
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
