import axios from 'axios';

const api = axios.create({
  baseURL: 'https://medibook-backend.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getDoctors = (dept) =>
  api.get('/doctors', { params: dept && dept !== 'All' ? { department: dept } : {} });

export const getDoctorById = (id) => api.get(`/doctors/${id}`);

export const getAppointments = (patientId) =>
  api.get('/appointments', { params: patientId ? { patient: patientId } : {} });

export const createAppointment = (data) => api.post('/appointments', data);

export const cancelAppointment = (id) =>
  api.patch(`/appointments/${id}/status`, { status: 'Cancelled' });

export const createPatient = (data) => api.post('/patients', data);

export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);

export default api;
