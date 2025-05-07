// src/components/Navbar.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { usuario, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center p-4 shadow-md">
      <div>
        <h1 className="text-2xl">Cambia el tema 🎨</h1>
        <ThemeSwitcher />
      </div>
      <div className="flex items-center gap-4">

        {isAuthenticated ? (
          <>
            <span>Hola, {usuario?.nombre}</span>
            <button
              onClick={handleLogout}
              className="btn btn-dash btn-warning"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-dash btn-primary"
          >
            Iniciar sesión
          </button>
        )
        }

      </div>
    </nav>
  );
};

export default Navbar;
