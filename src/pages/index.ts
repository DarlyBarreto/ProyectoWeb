import React from 'react';
import Home from '../components/home/Home'


export { Home }

export const Login = React.lazy(() => import('../components/login/Login'));
export const LoginAdministrador = React.lazy(() => import('../components/login/LoginAdministrador'));
export const RegistroUsuario = React.lazy(() => import('../components/registro/registroUsuario'));
export const PerfilUsuario = React.lazy(() => import('../components/usuario/perfil'));
export const Carnet = React.lazy(() => import('../components/usuario/carnet'));
export const Historial = React.lazy(() => import('../components/usuario/historial'));
export const AñadirHistorial = React.lazy(() => import('../components/admin/AñadirHistorial'));
export const Informe = React.lazy(() => import('../components/admin/Informe'));
export const HistorialPaciente = React.lazy(() => import('../components/admin/HistorialPaciente'));
