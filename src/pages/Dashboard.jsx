// src/pages/Dashboard.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { usuario } = useAuth();

  if (!usuario) return <p className="text-center mt-10">Cargando...</p>;

  switch (usuario.rol) {
    case "admin":
      return <Navigate to="/admin" />;
    case "docente":
      return <Navigate to="/docente" />;
    case "alumno":
      return <Navigate to="/alumno" />;
    default:
      return <h2 className="text-center text-red-500 mt-10">Rol no reconocido</h2>;
  }
};

export default Dashboard;
