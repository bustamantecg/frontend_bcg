import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const ListaAlumnos = () => {    
    const [usuarios, setUsuarios] = useState([]);
    const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`;

    // Instancia de SweetAlert2 con React
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            //const res = await axios.get("http://localhost:5000/api/usuarios?rol=alumno");            
            const res = await axios.get(`${API_URL}?rol=alumno`);
            setUsuarios(res.data);
        } catch (err) {
            console.error("Error al obtener los alumnos", err);
            toast.error("Error al cargar los alumnos.");
        }
    };

    const handleEliminar = async (id) => {
        const result = await MySwal.fire({
            title: "¿Está seguro?",
            text: "Esta acción eliminará al Alumno de forma permanente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                //await axios.delete(`http://localhost:5000/api/usuarios/${id}`);                
                await axios.delete(`${API_URL}/${id}`);
                toast.success("Alumno eliminado correctamente.");
                fetchUsuarios(); // Actualizar lista
            } catch (error) {
                console.error("Error al eliminar Alumno", error);
                toast.error("Error al eliminar Alumno.");
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Panel de Administración - Lista de Alumnos</h1>
            <h2 className="text-xl font-semibold mb-4">Alumnos registrados</h2>

            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr className="text-left">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Correo</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2">Alta</th>
                            <th className="px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u, index) => (
                            <tr key={u._id} className="border-t hover:bg-gray-100">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{u.nombre}</td>
                                <td className="px-4 py-2">{u.correo}</td>
                                <td className="px-4 py-2 capitalize">{u.rol}</td>
                                <td className="px-4 py-2">{format(new Date(u.createdAt), "yyyy-MM-dd HH:mm:ss")}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="btn btn-xs btn-soft btn-secondary"
                                        title="Eliminar Alumno"
                                        onClick={() => handleEliminar(u._id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListaAlumnos