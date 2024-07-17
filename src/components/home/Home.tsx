import React from 'react';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import Hero from '../../assets/image/hero.png';
import '../../assets/css/home.css';
import '../../assets/css/general.css';
import '../../assets/css/fondo.css';
const Home = () => {
  return (
    <div className='body'>
      <div className="header">
        <div className="logo">
          <img src={Logo} alt="Logo Izquierda" className="logo" />
        </div>
        <h1>Seguimiento de Personas con Capacidades Especiales</h1>
        <a href="/registro" className="button button-register">Registro</a>
        <a href="/login" className="button button-login">Inicio de Sesión</a>
      </div>

      <div className="container">
        <h1>¿Qué hacemos?</h1><br />
        <h3><p>En ULEAM, nos comprometemos a ofrecer un ambiente inclusivo y accesible para todos nuestros estudiantes y miembros de la comunidad con capacidades especiales. Nuestro objetivo es proporcionar los recursos y el apoyo necesario para garantizar el éxito académico y personal de cada individuo.</p></h3><br />
        <img src={Hero} alt="Imagen" />

        <h1>Servicios y Recursos</h1><br />
        <h3>
          <ul>
            <li>Adaptaciones y adecuaciones en infraestructura y tecnología.</li>
            <li>Apoyo psicopedagógico y tutorías personalizadas.</li>
            <li>Asesoramiento para la integración laboral.</li>
            <li>Actividades culturales y deportivas inclusivas.</li>
            <li>Acceso a becas y programas de apoyo financiero.</li><br />
          </ul>
        </h3>

        <h2>Contáctanos</h2><br />
        <h3>
          <p>Si deseas más información sobre nuestros servicios para personas con capacidades especiales o necesitas asistencia, no dudes en contactarnos:</p><br />
          <p>Universidad Laica Eloy Alfaro de Manabí (ULEAM)<br />
          Dirección: Av. Circunvalacion, Manta<br />
          Teléfono: (05) 262-0288<br />
          Rector: Dr. Marcos Zambrano, PhD<br />
          Correo Electrónico: info@uleam.edu.ec</p>
        </h3>
      </div>
      {/* Footer o pie de pagina, en este apartado colocamos el texto que querramos para nuestro tema */}
      <footer>
        <p>&copy; 2024 ULEAM - Seguimiento de Personas con Capacidades Especiales</p>
      </footer>
    </div>
  );
};

export default Home;