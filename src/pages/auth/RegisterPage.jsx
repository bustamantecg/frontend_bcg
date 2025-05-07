import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`;
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
    rol: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { contrasenia, confirmarContrasenia } = formData;
    //const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexPassword.test(contrasenia)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }

    // Validar longitud mínima
    if (formData.contrasenia.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (formData.contrasenia !== formData.confirmarContrasenia) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      //await axios.post("http://localhost:5000/api/usuarios/registro", formData);      
      await axios.post(`${API_URL}/registro`, formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al registrar");
    }
  };

  return (
    <>
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit} className="space-y-4">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium text-indigo-600">Crear cuenta</div>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              name="contrasenia"
              placeholder="Contraseña"
              value={formData.contrasenia}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              title="requiere al menos 8 caracteres, incluyendo numeros, caracteres en mayúsculas, caracteres en minúsculas"
              required
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              name="confirmarContrasenia"
              placeholder="Repetir contraseña"
              value={formData.confirmarContrasenia}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"              
              required
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg text-gray-400 duration-300 focus-within:border-indigo-500">
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full bg-transparent border-none outline-none appearance-none placeholder:italic text-white"
              required
            >
              <option value="" disabled className="text-gray-500">-- Seleccione un rol --</option>
              <option value="alumno" className="text-black">Alumno</option>
              <option value="docente" className="text-black">Docente</option>
              <option value="admin" className="text-black">Administrador</option>
             {/*  <option value="admin" className="text-black">Administrador</option>*/}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Registrarse
          </button>

          <p className="text-center text-sm mt-4">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-indigo-600 underline">
              Inicia sesión
            </a>
          </p>
        </section>
      </form>
    </main>
    
    </>
  );
};

export default RegisterPage;
