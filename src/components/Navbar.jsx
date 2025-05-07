import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { usuario, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handlePanel = () => {
    if (usuario) {
      const rolUsuario = usuario.rol;
      if (rolUsuario === "admin") navigate("/admin");
      else if (rolUsuario === "docente") navigate("/docente");
      else if (rolUsuario === "alumno") navigate("/alumno");
      else navigate("/");
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white mr-4">BCG Instituto</h1>
          <ThemeSwitcher />
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-white font-medium">Hola {usuario?.nombre}</span>
              <button
                onClick={handlePanel}
                className="btn btn-sm btn-ghost btn-warning hover:bg-yellow-700 hover:text-white"
              >
                Mi Panel
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost btn-warning hover:bg-yellow-700 hover:text-white"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm btn-ghost btn-primary hover:bg-blue-700 hover:text-white">
                Iniciar sesión
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
