// src/components/AddClinicalData.tsx
import React, { useState } from 'react';
import '../../assets/css/AñadirHitorial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface ClinicalData {
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  name: string;
  cedula: string;
}

const AddClinicalData: React.FC = () => {
  const navigate = useNavigate();
  const [clinicalData, setClinicalData] = useState<ClinicalData>({
    date: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    name: '',
    cedula: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClinicalData({ ...clinicalData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validación de formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(clinicalData.date)) {
      alert('El formato de fecha no es válido');
      return;
    }
  
    // Validación de longitud de diagnosis
    if (clinicalData.diagnosis.length < 5 || clinicalData.diagnosis.length > 20) {
      alert('La longitud del diagnóstico debe estar entre 5 y 20 caracteres');
      return;
    }
  
    // Validación de longitud de treatment
    if (clinicalData.treatment.length < 5 || clinicalData.treatment.length > 20) {
      alert('La longitud del tratamiento debe estar entre 5 y 20 caracteres');
      return;
    }
  
    // Validación de longitud de notes
    if (clinicalData.notes.length < 1 || clinicalData.notes.length > 20) {
      alert('La longitud de las notas adicionales debe estar entre 1 y 20 caracteres');
      return;
    }
  
    // Validación de longitud de name
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,15}$/;
    if (!nameRegex.test(clinicalData.name)) {
      alert('El nombre del paciente debe tener entre 3 y 15 letras, letras con acento y espacios');
      return;
    }
  
    // Validación de longitud de cedula
    if (clinicalData.cedula.length !== 10) {
      alert('La cédula del paciente debe tener 10 caracteres');
      return;
    }
  
    const storedClinicalData = localStorage.getItem('clinicalData');
    let existingData: ClinicalData[] = [];
    if (storedClinicalData) {
      existingData = JSON.parse(storedClinicalData);
    }
    localStorage.setItem('clinicalData', JSON.stringify([...existingData, clinicalData]));
    alert('Datos clínicos agregados con éxito');
    setClinicalData({
      date: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      name: '',
      cedula: '',
    });
  };

  return (
    <div className="add-clinical-data-container">
      <form className="add-clinical-data-form" onSubmit={handleSubmit}>
      <button className="back-button" id="back-button" onClick={() => navigate('/informe')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        <h2>Agregar Datos Clínicos</h2>
        <input
          type="date"
          name="date"
          placeholder="Fecha"
          value={clinicalData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnóstico"
          value={clinicalData.diagnosis}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="treatment"
          placeholder="Tratamiento"
          value={clinicalData.treatment}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Notas adicionales"
          value={clinicalData.notes}
          onChange={handleChange}
          rows={4}
        ></textarea>
        <input
          type="text"
          name="name"
          placeholder="Nombre del paciente"
          value={clinicalData.name}
          onChange={handleChange}
          required/>
        <input 
        type="text" 
        name="cedula" 
        placeholder="Cédula del paciente" 
        value={clinicalData.cedula} 
        onChange={handleChange} 
        required/>
        <button type="submit">Agregar Datos</button>
      </form>
    </div>
  );
};

export default AddClinicalData;
