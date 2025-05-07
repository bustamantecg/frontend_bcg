import React from 'react'
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { obtenerCursosPorDocente } from "../../services/cursoService"

function DocenteMisCursos() {
    const { usuario } = useAuth();
    const [misCursos, setmisCursos] = useState([]);

    useEffect(() => {
        const cargarCursos = async () => {
            try {
                const datos = await obtenerCursosPorDocente(usuario._id);
                setmisCursos(datos.data);
            } catch (error) {
                console.error("Docente Error al cargar tus cursos:", error);
            }
        };
        cargarCursos();
    }, [usuario]);

    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-4">Mis Cursos Asignados</h2>
            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Curso</th>
                            <th className="px-4 py-2">Nivel</th>
                            <th className="px-4 py-2">Duración</th>
                        </tr>
                    </thead>
                    <tbody>
                        {misCursos.length > 0 ? (
                            misCursos.map((curso) => (
                                <tr key={curso._id} className="border-t hover:bg-gray-100">
                                    <td className="px-4 py-2">{curso.nombre}</td>
                                    <td className="px-4 py-2">{curso.nivel}</td>
                                    <td className="px-4 py-2">{curso.duracion}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No tienes Cursos Asignado {usuario?.nombre}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DocenteMisCursos