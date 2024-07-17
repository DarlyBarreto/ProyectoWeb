// src/components/PatientHistory.tsx
import React, { useState, useEffect } from 'react';
import '../../assets/css/HistorialPaciente.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Treatment {
  date: string;
  diagnosis: string;
  treatment: string;
  name: string;
  cedula: string;
}

const HistorialPaciente: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const navigate = useNavigate(); // Add this line to import and assign the useNavigate hook

  useEffect(() => {
    const storedTreatments = localStorage.getItem('clinicalData');
    if (storedTreatments) {
      setTreatments(JSON.parse(storedTreatments));
    }
  }, []);

  return (
    <div className="patient-history-container">
      <button className="back-button" id="back-button" onClick={() => navigate('/informe')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h2>Historial Clínico del Paciente</h2>
      <div className="treatment-list">
        {treatments.map((treatment, index) => (
          <div key={index} className="treatment-item">
            <p><strong>Fecha:</strong> {treatment.date}</p>
            <p><strong>Diagnóstico:</strong> {treatment.diagnosis}</p>
            <p><strong>Tratamiento:</strong> {treatment.treatment}</p>
            <p><strong>Nombre del paciente:</strong> {treatment.name}</p>
            <p><strong>Cédula del paciente:</strong> {treatment.cedula}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialPaciente;
