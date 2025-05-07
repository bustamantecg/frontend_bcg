import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Aquí agregamos allowedRoles como prop
const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, usuario } = useAuth();

  if (loading) {
    return (
      <p className="text-center mt-10">
        <span className="loading loading-infinity loading-xl text-warning"></span>
        Cargando...
        <span className="loading loading-infinity loading-xl text-warning"></span>
      </p>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  // Si allowedRoles existe y el rol del usuario no está en la lista
  if (allowedRoles && !allowedRoles.includes(usuario?.rol)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
