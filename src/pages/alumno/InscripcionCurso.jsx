import { useEffect, useState } from "react";
import { inscribirseACurso } from "../../services/inscripcionService";
import { obtenerCursos } from "../../services/cursoService";
import axios from "axios";
import { toast } from "react-toastify";

const InscripcionCurso = () => {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/cursos")
            .then((res) => {
                setCursos(res.data.cursos); // Asegurate que res.data es un array
            })
            .catch((err) => {
                console.error(err);
                setCursos([]); // O manejar el error adecuadamente
            });
    }, []);

    const manejarInscripcion = (idCurso) => {
        inscribirseACurso({ cursoId: idCurso })
            .then(() => {
                toast.success("Inscripción exitosa");
                
            })
            .catch((error) => {
                const mensaje = error.response?.data?.mensaje || "Error desconocido";
                toast.error(mensaje); // mostrará "Ya estás inscrito en este curso." si aplica
                console.error("Error al inscribirse:", error);
            });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Inscribirse a un Curso</h2>
            <ul className="space-y-4">
                {Array.isArray(cursos) && cursos.map((curso) => (
                    <li key={curso._id} className="border p-4 rounded shadow">
                        <h3 className="font-bold">{curso.nombre}</h3>
                        <p>Nivel: {curso.nivel} Duración: {curso.duracion}</p>
                        <div className="tooltip">
                            <div className="tooltip-content">
                                <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">inscribite ya!</div>
                            </div>
                            <button
                                className="btn btn-primary mt-2"
                                onClick={() => manejarInscripcion(curso._id)}
                            >
                                Inscribirse
                            </button>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InscripcionCurso;
