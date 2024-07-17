import React from "react";
import { AñadirHistorial, Carnet, Historial, HistorialPaciente, Home, Informe, Login, LoginAdministrador, PerfilUsuario, RegistroUsuario } from "./pages";

export const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/login-admin',
        element: <LoginAdministrador/>
    },
    {
        path: '/registro',
        element: <RegistroUsuario/>
    },
    {
        path: '/perfil',
        element: <PerfilUsuario/>
    },
    {
        path: '/carnet',
        element: <Carnet/>
    },
    {
        path: '/historial',
        element: <Historial/>
    },
    {
        path: '/agregar-historial',
        element: <AñadirHistorial/>
    },
    {
        path: '/informe',
        element: <Informe/>
    },
    {
        path: '/historial-paciente',
        element: <HistorialPaciente/>
    }
]