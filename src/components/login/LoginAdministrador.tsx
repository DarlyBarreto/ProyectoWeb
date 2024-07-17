import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

const LoginAdministrador = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'barreto' && password === '1234') {
        setError('');
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            navigate('/informe');
        }, 5000);
    } else {
        setError('Credenciales incorrectas');
    }
};

    useEffect(() => {
        if (showMessage) {
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [showMessage]);

    return (
        <div className='fondo'>
                
                <button className="back-button" id="back-button" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
            <div className="login-container">
                
                <form className="login-form" onSubmit={handleLogin}>
                <img src={Logo} alt="Logo ULEAM" className="Logo" />
                    
                    
                    <h2>Administración</h2>
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
                    {showMessage && <p className="floating-message">Inicio de sesión exitoso</p>}
                    <button type="submit">Iniciar Sesión</button>
                    <div className="login-options">
                        <button className="register-button" onClick={() => navigate('/login')}>
                            Iniciar sesión como usuario
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

export default LoginAdministrador;