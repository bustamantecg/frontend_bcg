import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { darseBaja, obtenerMisInscripcionesACurso } from "../../services/inscripcionService";
import { useAuth } from "../../context/AuthContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MySwal = withReactContent(Swal);

const CursosInscritosAlumno = () => {
  const { usuario } = useAuth();
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const datos = await obtenerMisInscripcionesACurso(usuario._id);
        setCursos(datos.data);
        console.log(datos.data);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      }
    };
    cargarCursos();
  }, [usuario]);

  const handleVerCurso = (idCurso) => {
    navigate(`/alumno/curso/${idCurso}`);
  };

  const handleBaja = async (idInscripcion) => {
    const result = await MySwal.fire({
      title: "¿Está seguro?",
      text: "Esta acción Cancelará la inscripción al curso.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await darseBaja(idInscripcion); // <--- aquí estaba el error
        toast.success("Cancelación de Inscripción realizada correctamente.");
        setCursos(cursos.filter((item) => item._id !== idInscripcion));
      } catch (error) {
        console.error("Error al Cancelar la Inscripción.", error);
        toast.error("Error al Cancelar la Inscripción.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Cursos Inscritos ({cursos.length})</h1>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Docente</th>
              <th>Duración</th>
              <th>Alta</th>
              <th>Nota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.length > 0 ? (
              cursos.map((item) => (
                <tr key={item._id}>
                  <td>                    
                      <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => document.getElementById(`modal-${item.curso._id}`).showModal()}
                      >
                        {item.curso.nombre}
                      </span>

                      {/* Modal para este curso */}
                      <dialog id={`modal-${item.curso._id}`} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                          <h3 className="font-bold text-xl mb-2">{item.curso.nombre}</h3>
                          <p><strong>Nivel:</strong> {item.curso.nivel}</p>
                          <p><strong>Duración:</strong> {item.curso.duracion}</p>
                          <p><strong>Fecha de inicio:</strong> {item.createdAt ? format(new Date(item.createdAt), "yyyy-MM-dd") : "No disponible"}</p>
                          <p><strong>Horario:</strong> {item.curso.horario ?? "A confirmar"}</p>
                          <p><strong>Docente:</strong> {item.curso.docente?.nombre ?? "Sin asignar"} </p>
                          <p><strong>Caorreo del Docente:</strong> {item.curso.docente?.correo ?? "No proporcionado"} </p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Cerrar</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    

                  </td>
                  <td>{item.curso.docente.nombre ?? "No docente"} </td>
                  <td>{item.curso.duracion}</td>
                  <td>{format(new Date(item.createdAt), "yyyy-MM-dd")}</td>
                  <td>{item.notaFinal ? item.notaFinal : "Sin nota"}</td>
                  <td>
                    {!item.notaFinal && (
                      <button
                        onClick={() => handleBaja(item._id)}
                        title="Cancelar Inscripción"
                        className="btn btn-xs btn-error"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No estás inscrito en ningún curso.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CursosInscritosAlumno;
