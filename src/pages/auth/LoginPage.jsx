import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login, usuario } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (usuario) {
      const rolUsuario = usuario.rol;
      if (rolUsuario === "admin") navigate("/admin");
      else if (rolUsuario === "docente") navigate("/docente");
      else if (rolUsuario === "alumno") navigate("/alumno");
      else navigate("/");
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(correo, contrasenia);
    } catch (err) {
      console.error("Error en login:", err);
  
      setError(err);
    }
  };

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <form
          onSubmit={handleSubmit}>
          <section className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-4xl font-medium text-indigo-600">Ingresar</div>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                type="email"
                id="correo"
                placeholder="Correo Electrónico"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                type="password"
                id="contrasenia"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                required
              />
            </div>

            <button className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">LOG IN</button>

            <a href="#" className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">FORGOT PASSWORD?</a>

            <p className="text-center text-lg">
              No tienes una cuenta?{" "}
              <Link to="/register" className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                Crear una
              </Link>
            </p>
            <p className="text-center text-lg">
              <a href="/" className="font-medium text-indigo-500 underline-offset-4 hover:underline"> Inicio</a>
            </p>
          </section>
        </form>
      </main>
      
    </>
  );
};

export default LoginPage;
