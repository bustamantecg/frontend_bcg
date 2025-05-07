import axios from 'axios';

//const API_URL = 'http://localhost:5000/api/cursos';
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/cursos`;

const config = () => {
    const token = localStorage.getItem('token'); // O desde tu context/auth provider
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

export const obtenerCursos = () => axios.get(API_URL);
export const obtenerCursoPorId = (id) => axios.get(`${API_URL}/${id}`);
export const crearCurso = (curso) => axios.post(API_URL, curso);
export const actualizarCurso = (id, curso) => axios.put(`${API_URL}/${id}`, curso);
export const eliminarCurso = (id) => axios.delete(`${API_URL}/${id}`);
export const obtenerCursosPorDocente = (docenteId) => axios.get(`${API_URL}/docente/${docenteId}`, config());