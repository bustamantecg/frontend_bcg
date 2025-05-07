import { obtenerCursos, eliminarCurso, actualizarCurso } from "../../services/cursoService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const ListaCursos = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [cursos, setCursos] = useState([]);
  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/cursos`;

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      //const res = await axios.get('http://localhost:5000/api/cursos');
      const res = await axios.get(`${API_URL}`);
      //const data = await res.json();
      setCursos(res.data.cursos);
    } catch (error) {
      console.error("Error al cargar los cursos.", error);
      toast.error("Error al cargar los Cursos.");
    }
  };

  const handleEliminar = async (id) => {
    const result = await MySwal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará el Curso de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        //await axios.delete(`http://localhost:5000/api/cursos/${id}`);
        await axios.delete(`${API_URL}/${id}`);
        //await eliminarCurso(_id);
        toast.success("Curso eliminado correctamente.");
        cargarCursos(); // Actualizar lista
      } catch (error) {
        console.error("Error al eliminar Curso", error);
        toast.error("Error al eliminar Curso.");
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Panel de Administración - Lista de Cursos</h1>
      <h2 className="text-xl font-semibold mb-4">Cursos registrados </h2>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Nivel</th>
              <th className="px-4 py-2">Duración</th>
              <th className="px-4 py-2">Portada</th>
              <th className="px-4 py-2">Video</th>
              <th className="px-4 py-2">Alta</th>
              <th className="px-4 py-2">Docente</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.length > 0 ? (
              cursos.map((curso) => (
                <tr key={curso._id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2"><strong>{curso.nombre}</strong></td>
                  <td className="px-4 py-2">{curso.nivel}</td>
                  <td className="px-4 py-2">{curso.duracion}</td>
                  <td className="px-4 py-2">{curso.portada}</td>
                  <td className="px-4 py-2">{curso.urlVideo}</td>
                  <td className="px-4 py-2">{format(new Date(curso.createdAt), "yyyy-MM-dd HH:mm:ss")}</td>
                  <td className="px-4 py-2">
                    {curso.docente ? (
                      <>
                        <strong>{curso.docente.nombre}</strong><br />
                        <span className="text-sm text-gray-600">{curso.docente.correo}</span>
                      </>
                    ) : (
                      <em className="text-gray-500">Sin asignar</em>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => navigate(`/admin/cursos/${curso._id}`)}
                      className="btn btn-xs btn-error"
                      title="Editar Curso"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => handleEliminar(curso._id)}
                      className="btn btn-xs btn-error"
                      title="Eliminar Curso"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay cursos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default ListaCursos;
