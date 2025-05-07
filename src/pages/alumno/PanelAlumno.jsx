import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher";

const PanelAlumno = () => {
  const { usuario, logout } = useAuth();

  return (
    <div className="flex min-h-screen">

      {/* MENÚ LATERAL */}
      <div className="w-64 bg-base-200 p-6">
        <h3 className="text-2xl font-bold mb-6">Alumno {usuario?.nombre}</h3>
        <ul className="menu bg-base-100 rounded-box">
          {/* Cursos del alumno */}
          <li>
            <details open>
              <summary>Cursos</summary>
              <ul>
                <li><Link to="mis-cursos">Mis Cursos</Link></li>
                <li><Link to="inscripcion">Inscribirse a un curso</Link></li>
              </ul>
            </details>
          </li>

          {/* Configuración */}
          <li>
            <details>
              <summary>Configuración</summary>
              <ul>
                <li><Link to="perfil">Mi perfil</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/alumno/cambiar-password">Cambiar contraseña</Link></li>
              </ul>
            </details>
          </li>

          <li className="mb-2 items-center"><ThemeSwitcher /></li>
          <li className="mb-2"><Link to="/alumno/cambiar-password" className="btn btn-outline btn-primary rounded-full">Cambiar contraseña</Link></li>
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

export default PanelAlumno;
