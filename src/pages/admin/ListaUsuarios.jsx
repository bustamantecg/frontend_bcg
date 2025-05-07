import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

// Instancia de SweetAlert2 con React
const MySwal = withReactContent(Swal);

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      //const res = await axios.get("http://localhost:5000/api/usuarios");
      const res = await axios.get(`${API_URL}`);
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al obtener los usuarios", err);
      toast.error("Error al cargar los usuarios.");
    }
  };

  const handleEliminar = async (id) => {
    const result = await MySwal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará el usuario de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        //await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
        await axios.delete(`${API_URL}/${id}`);
        toast.success("Usuario eliminado correctamente.");
        fetchUsuarios(); // Actualizar lista
      } catch (error) {
        console.error("Error al eliminar el usuario", error);
        toast.error("Error al eliminar el usuario.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel de Administración - Lista de Usuarios</h1>
      <h2 className="text-xl font-semibold mb-4">Usuarios registrados</h2>
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
                    title="Eliminar Usuario"
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
};

export default ListaUsuarios;
