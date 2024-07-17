// src/components/Reports.tsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../assets/css/Informe.css';
import '../../assets/css/barra.css'
import '../../assets/css/general.css'
import { Link, useNavigate } from 'react-router-dom';

interface Appointment {
  date: string;
  time: string;
  patient: string;
  dentist: string;
}

interface User {
  username: string;
}

interface ClinicalHistory {
  patientName: string;
  treatments: string[];
  diagnoses: string[];
  medications: string[];
}

interface Payment {
  date: string;
  amount: number;
  description: string;
  name: string;
  cedula: string;
}

interface Treatment {
  date: string;
  diagnosis: string;
  treatment: string;
  name: string;
  cedula: string;
}

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [clinicalHistories, setClinicalHistories] = useState<ClinicalHistory[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    const storedClinicalHistories = localStorage.getItem('clinicalHistories');
    if (storedClinicalHistories) {
      setClinicalHistories(JSON.parse(storedClinicalHistories));
    }

    const storedPayments = localStorage.getItem('payments');
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    }

    const storedTreatment = localStorage.getItem('clinicalData');
    if (storedTreatment) {
      setTreatments(JSON.parse(storedTreatment));
    }
  }, []);

  const generateReport = () => {
    const doc = new jsPDF();

    generateAppointmentsReport(doc);
    generateUsersReport(doc);
    generateClinicalHistoriesReport(doc);
    generatePaymentsReport(doc);
    generateActivityReport(doc);

    doc.save('clinic_reports.pdf');
  };

  const generateAppointmentsReport = (doc: jsPDF) => {
    doc.text('Informe de Citas', 10, 10);

    const tableData = appointments.map(appointment => [
      appointment.date,
      appointment.time,
      appointment.patient,
      appointment.dentist,
    ]);

    // @ts-ignore
    doc.autoTable({
      startY: 20,
      head: [['Fecha', 'Hora', 'Paciente', 'Odontólogo']],
      body: tableData,
    });

    doc.addPage();
  };

  const generateUsersReport = (doc: jsPDF) => {
    doc.text('Informe de Usuarios', 10, 10);

    const tableData = users.map(user => [user.username]);

    // @ts-ignore
    doc.autoTable({
      startY: 20,
      head: [['Usuario']],
      body: tableData,
    });

    doc.addPage();
  };

  const generateClinicalHistoriesReport = (doc: jsPDF) => {
    doc.text('Informe de Historiales Clínicos', 10, 10);

    clinicalHistories.forEach((history, index) => {
      doc.text(`Historial Clínico ${index + 1}`, 10, 20);
      doc.text(`Paciente: ${history.patientName}`, 10, 30);

      // Detalles de tratamientos
      doc.text('Tratamientos:', 10, 40);
      history.treatments.forEach((treatment, idx) => {
        doc.text(`${idx + 1}. ${treatment}`, 15, 50 + idx * 10);
      });

      // Detalles de diagnósticos
      doc.text('Diagnósticos:', 10, 80);
      history.diagnoses.forEach((diagnosis, idx) => {
        doc.text(`${idx + 1}. ${diagnosis}`, 15, 90 + idx * 10);
      });

      // Detalles de medicamentos
      doc.text('Medicamentos:', 10, 120);
      history.medications.forEach((medication, idx) => {
        doc.text(`${idx + 1}. ${medication}`, 15, 130 + idx * 10);
      });

      doc.addPage();
    });
  };

  const generatePaymentsReport = (doc: jsPDF) => {
    doc.text('Informe de Pagos', 10, 10);

    const tableData = payments.map(payments => [
      payments.date,
      payments.description,
      payments.amount.toString(),
      payments.name,
      payments.cedula,
    ]);

    // @ts-ignore
    doc.autoTable({
      startY: 20,
      head: [['Número de Factura', 'Tratamiento', 'Cantidad', 'cliente', 'cedula']],
      body: tableData,
    });

    doc.addPage();
  };

  const generateActivityReport = (doc: jsPDF) => {
    doc.text('Informe de Actividad de Odontólogos', 10, 10);

    const tableData = treatments.map(item => [
      item.date,
      item.diagnosis.toString(),
      item.treatment.toString(),
      item.name,
      item.cedula,
    ]);

    // @ts-ignore
    doc.autoTable({
      startY: 20,
      head: [['fecha', 'diagnosis', 'Tratamientos', 'nombre', 'cedula']],
      body: tableData,
    });
  };

  return (
    <div className="reports-container">
      <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/login">Cerrar sesión</Link></li>
        <li><Link to="/historial-paciente">Ver historial de pacientes</Link></li>
        <li><Link to="/agregar-historial">Agregar historial de pacientes</Link></li>
      </ul>
    </nav>

      <h2>Informes y Estadísticas</h2>
      <div className="report-form">
        <button onClick={generateReport}>Generar Informes en PDF</button>
      </div>
    </div>
  );
};

export default Reports;
