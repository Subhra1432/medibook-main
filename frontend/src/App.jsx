import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookPage from './pages/BookPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import { getDoctors, getAppointments } from './api/api';

export default function App() {
  const [page, setPage] = useState('home');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Fetch doctors on mount
  useEffect(() => {
    getDoctors()
      .then(res => setDoctors(res.data.data))
      .catch(() => console.warn('Could not load doctors from API'))
      .finally(() => setLoadingDoctors(false));
  }, []);

  // Fetch appointments (using a hardcoded patient ID for demo; replace with auth)
  useEffect(() => {
    getAppointments()
      .then(res => setAppointments(res.data.data))
      .catch(() => console.warn('Could not load appointments from API'));
  }, []);

  const addAppointment = (appt) => {
    setAppointments(prev => [...prev, appt]);
    setPage('appointments');
  };

  const pages = {
    home:         <HomePage setPage={setPage} setSelectedDoctor={setSelectedDoctor} doctors={doctors} />,
    doctors:      <DoctorsPage setPage={setPage} setSelectedDoctor={setSelectedDoctor} doctors={doctors} />,
    book:         <BookPage selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} doctors={doctors} onBook={addAppointment} />,
    appointments: <AppointmentsPage appointments={appointments} setAppointments={setAppointments} />,
    profile:      <ProfilePage />,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar page={page} setPage={setPage} apptCount={appointments.filter(a => a.status === 'Confirmed').length} />
      <main style={{ marginLeft: 210, flex: 1, padding: 24, maxWidth: 'calc(100% - 210px)' }}>
        {loadingDoctors && page === 'home' ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray)' }}>
            <i className="ti ti-loader-2" style={{ fontSize: 36, display: 'block', marginBottom: 12 }} />
            Loading MediBook...
          </div>
        ) : (
          pages[page] || pages.home
        )}
      </main>
    </div>
  );
}
