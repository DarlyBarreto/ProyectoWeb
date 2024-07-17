import React, { useState, useEffect } from 'react';
import '../../assets/css/historial.css';
import '../../assets/css/general.css';
import '../../assets/css/fondo.css';
import { Link } from 'react-router-dom';

interface ClinicalData {
    date: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    name: string;
    cedula: string;
}

interface User {
    username: string;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: string;
    correo: string;
}

const Historial: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [clinicalData, setClinicalData] = useState<ClinicalData[]>([]);

    useEffect(() => {
        // Obtener el usuario logueado desde sessionStorage
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }

        // Obtener datos clínicos desde localStorage
        const storedClinicalData = localStorage.getItem('clinicalData');
        if (storedClinicalData) {
            const parsedClinicalData: ClinicalData[] = JSON.parse(storedClinicalData);
            setClinicalData(parsedClinicalData);
        }
    }, []);

    // Filtrar datos clínicos por cédula del usuario logueado
    const userClinicalData = clinicalData.filter(data => data.cedula === user?.cedula);

    return (
        <div className="historial-container body">
            <nav className="navbar">
                <ul className="navbar-links">
                    <li><Link to="/login">Cerrar sesión</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li><Link to="/carnet">Carnet</Link></li>
                </ul>
            </nav>
            <h2>Historial Clínico</h2>
            {userClinicalData.length > 0 ? (
                <table className="historial-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Diagnóstico</th>
                            <th>Tratamiento</th>
                            <th>Notas</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userClinicalData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.date}</td>
                                <td>{data.diagnosis}</td>
                                <td>{data.treatment}</td>
                                <td>{data.notes}</td>
                                <td>{data.name}</td>
                                <td>{data.cedula}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos clínicos disponibles para este usuario.</p>
            )}
        </div>
    );
};

export default Historial;
