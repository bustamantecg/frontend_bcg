import axios from 'axios';

//const API_URL = 'http://localhost:5000/api/inscripciones';
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/inscripciones`;

// Asegúrate de enviar el token si estás usando autenticación
const config = () => {
  const token = localStorage.getItem('token'); // O desde tu context/auth provider
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const obtenerMisAlumnos = (id) =>{
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/mis-alumno`, config());
};

export const obtenerMisInscripcionesACurso = () =>{
  return axios.get(`${API_URL}/alumno/cursos`, config());};

export const inscribirseACurso = (datos) =>{
  return axios.post(`${API_URL}/alumno/inscripciones`, datos, config());
};

export const darseBaja = (id) =>{
  const token = localStorage.getItem('token');
  axios.delete(`${API_URL}/alumno/inscripciones/${id}`, config());
};


