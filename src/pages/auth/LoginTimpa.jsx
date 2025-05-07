import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(correo, contrasenia);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-[#0e7490] via-[#3b82f6] to-[#4f46e5]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="correo">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="contrasenia">
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenia"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-outline btn-primary py-2 px-4 rounded w-full"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>

<main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
<section className="flex w-[30rem] flex-col space-y-10">
    <div className="text-center text-4xl font-medium">Ingresar</div>
    {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
    )}

    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
        <input type="email" placeholder="Correo electrónico" 
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"/>
    </div>

    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
        <input type="password" placeholder="Password" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"/>
    </div>

    <button className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">LOG IN</button>

    <a href="#" className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">FORGOT PASSWORD?</a>

    <p className="text-center text-lg">
        No account?
        <a href="#" className="font-medium text-indigo-500 underline-offset-4 hover:underline">Create One</a>
    </p>
</section>
</main>
</>
  );
};

export default LoginPage;
