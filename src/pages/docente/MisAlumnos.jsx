import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const MisAlumnos = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [notasEditadas, setNotasEditadas] = useState({});

  useEffect(() => {
    const obtenerInscripciones = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/inscripciones/mis-alumnos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInscripciones(data);
      } catch (error) {
        console.error('Error al obtener inscripciones:', error);
      }
    };

    obtenerInscripciones();
  }, []);

  const handleNotaChange = (id, valor) => {
    setNotasEditadas({
      ...notasEditadas,
      [id]: valor
    });
  };

  const guardarNota = async (id) => {
    try {
      const nota = notasEditadas[id];
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:5000/api/inscripciones/${id}/actualizar-nota`, {
        notaFinal: Number(nota)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Refrescar la lista local
      setInscripciones((prev) =>
        prev.map((insc) =>
          insc._id === id ? { ...insc, notaFinal: Number(nota) } : insc
        )
      );

      // Limpiar el valor editado
      setNotasEditadas((prev) => {
        const nuevo = { ...prev };
        delete nuevo[id];
        return nuevo;
      });
      toast.success("✅ Nota actualizada correctamente");
    } catch (error) {
      console.error('Error al guardar nota:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Alumnos por Docente</h2>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr className="text-left">
              <th>#</th>
              <th>Alumno</th>
              <th>Curso</th>
              <th>Nota Final</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No hay inscripciones registradas.</td>
              </tr>
            ) : (
              inscripciones.map((inscripcion, index) => (
                <tr key={inscripcion._id}>
                  <td>{index + 1}</td>
                  <td>{inscripcion.alumno?.nombre} | {inscripcion.alumno?.correo}</td>
                  <td>{inscripcion.curso?.nombre}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={notasEditadas[inscripcion._id] ?? inscripcion.notaFinal ?? ''}
                      onChange={(e) => handleNotaChange(inscripcion._id, e.target.value)}
                      className="input input-bordered input-sm w-20"
                      required
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => guardarNota(inscripcion._id)}
                      className="btn btn-sm btn-success"
                    >
                      Guardar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MisAlumnos;
