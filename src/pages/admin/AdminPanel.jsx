import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher";

const AdminPanel = () => {
  const { usuario, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* MENÚ LATERAL */}
      <div className="w-64 bg-base-200 p-6">
        <h3 className="text-2xl font-bold mb-6">Admin {usuario?.nombre}</h3>
        <ul className="menu bg-base-100 rounded-box">
        <li><Link to="/">Home</Link></li>
          {/* Cursos */}
          <li>
            <details open>
              <summary>Cursos</summary>
              <ul>
                <li><Link to="cursos/nuevo">Agregar nuevo</Link></li>
                <li><Link to="cursos">Listar cursos</Link></li>
                <li><Link to="alumnos">Listar Inscripciones</Link></li>
              </ul>
            </details>
          </li>

          {/* Docentes */}
          <li>
            <details>
              <summary>Docentes</summary>
              <ul>               
                <li><Link to="docentes">Listar docentes</Link></li>
              </ul>
            </details>
          </li>

          {/* Alumnos */}
          <li>
            <details>
              <summary>Alumnos</summary>
              <ul>
                <li><Link to="alumnos">Listar alumnos</Link></li>
              </ul>
            </details>
          </li>
          {/* usuarios */}
          <li>
            <details>
              <summary>Usuarios</summary>
              <ul>                
                <li><Link to="user/listado">Listar Usuarios</Link></li>
              </ul>
            </details>
          </li>          
          <li className="mb-2 items-center"><ThemeSwitcher /></li>
          <li className="mb-2"><Link to="/admin/cambiar-password" className="btn btn-outline btn-warning rounded-full">Cambiar contraseña</Link></li>          
          <li className="mb-2">
            <button onClick={logout} className="btn btn-outline btn-error rounded-full">
              Cerrar sesión
            </button>
          </li>          
        </ul>
      </div>
      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>      
    </div>
  );
};

export default AdminPanel;
