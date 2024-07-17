import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import '../../assets/css/Informe.css';
import '../../assets/css/barra.css';
import '../../assets/css/general.css';
import '../../assets/css/fondo.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
interface User {
    username: string;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: string;
    correo: string;
    ciudad: string;
    direccion: string;
    estado: string;
    telefono: string;
    sexo: string;
    discapacidad: string;
}

const Carnet: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            console.log('Usuario recuperado:', parsedUser);
        }
    }, []);

    const generateReport = () => {
        if (user) {
            const doc = new jsPDF('landscape', 'pt', 'credit-card'); // Tamaño de tarjeta de crédito
            generateUserCarnet(doc, user);
            doc.save('carnet.pdf');
        } else {
            alert('No hay usuario registrado en la sesión');
        }
    };

    const generateUserCarnet = (doc: jsPDF, user: User) => {
        doc.setFillColor(240, 240, 240); // Fondo gris claro
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        doc.setFontSize(12);

        // Título
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text('Carnet de Discapacidad', doc.internal.pageSize.width / 2, 40, { align: 'center' });

        // Información del usuario
        doc.setFontSize(12);
        doc.text(`Nombre: ${user.nombre} ${user.apellido}`, 20, 60);
        doc.text(`Cédula: ${user.cedula}`, 20, 75);
        doc.text(`Fecha de Nacimiento: ${user.fechaNacimiento}`, 20, 85);
        doc.text(`Discapacidad: ${user.discapacidad}`, 20, 95);
        doc.text(`Correo: ${user.correo}`, 20, 105);
        doc.text(`Ciudad: ${user.ciudad}`, 20, 115);
        doc.text(`Sexo: ${user.sexo}`, 20, 125);
        doc.text(`Estado civil: ${user.estado}`, 20, 135);
        doc.addImage(logo, 'PNG', 90, 0, 60, 20);
    };

    return (
        <div className="reports-container body">
            <nav className="navbar">
                <ul className="navbar-links">
                    <li><Link to="/login">Cerrar sesión</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li><Link to="/historial">Historial</Link></li>
                </ul>
            </nav>
            <h2>Generar Carnet</h2>
            <div className="report-form">
                <button onClick={generateReport}>Generar Carnet en PDF</button>
            </div>
        </div>
    );
};

export default Carnet;
