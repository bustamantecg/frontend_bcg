import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher";

const DocentePanel = () => {
  const { usuario, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* MENÚ LATERAL */}
      <div className="w-64 bg-base-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Dodente: {usuario?.nombre} </h2>
        <ul className="menu bg-base-100 rounded-box">

          {/* Cursos */}
          <li>
            <details open>
              <summary>Cursos</summary>
              <ul>
                <li><Link to="/docente">Mis Cursos</Link></li>
              </ul>
            </details>
          </li>

          {/* Evaluaciones de Inscripciones */}
          <li>
            <details>
              <summary>Evaluaciones</summary>
              <ul>
                <li><Link to="/docente/mis-alumnos/">Alumnos</Link></li>
              </ul>
            </details>
          </li>
          <li><Link to="/">Home</Link></li>
          <li className="mb-2"><ThemeSwitcher /></li>
          <li className="mb-2"><Link to="/docente/cambiar-password" className="btn btn-outline btn-primary rounded-full">Cambiar contraseña</Link></li>
          {/* Cerrar sesión */}
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

export default DocentePanel;

