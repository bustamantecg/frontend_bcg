import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect} from "react";

export default function NotFound() {
  const { usuario, logout, isAuthenticated } = useAuth();
  const [destino, setDestino] = useState("/");

    useEffect(() => {
      if (usuario) {
        const rolUsuario = usuario.rol;
        console.log("Usuario:", rolUsuario);
        if (rolUsuario === "admin") setDestino("/admin");
        else if (rolUsuario === "docente") setDestino("/docente");
        else if (rolUsuario === "alumno") setDestino("/alumno");
        else navigate("/");
      }
    }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-base-100">
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Página no encontrada"
        className="w-80 mb-6"
      />
      <h1 className="text-5xl font-bold text-error mb-2">404</h1>
      <p className="text-lg mb-6">Oops, la página que buscás no existe.</p>

      <Link to={destino} className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}