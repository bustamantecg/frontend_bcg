import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CambiarPassword = () => {
  const navigate = useNavigate();
  const [actualPassword, setActualPassword] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [errorCoincidencia, setErrorCoincidencia] = useState(false);
  const usuario =  JSON.parse(localStorage.getItem('usuario'));
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaPassword !== repetirPassword) {
      setErrorCoincidencia(true);
      return;
    }
    setErrorCoincidencia(false);
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/usuarios/cambiar-password',
        { actualPassword, nuevaPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Contraseña actualizada correctamente');
      
      setActualPassword('');
      setNuevaPassword('');
      setRepetirPassword('');

      if (usuario?.rol === 'admin') {
        navigate('/admin');
      } else if (usuario?.rol  === 'docente') {
        navigate('/docente');
      } else if (usuario?.rol  === 'alumno') {
        navigate('/alumno');
      }

    } catch (error) {
      toast.error(error.response?.data?.mensaje || 'Error al cambiar la contraseña');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>

      <div className="form-control">
        <label className="label">Contraseña actual</label>
        <input
          type="password"
          className="input input-bordered"
          value={actualPassword}
          onChange={(e) => setActualPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-control mt-4">
        <label className="label">Nueva contraseña</label>
        <input
          type="password"
          className="input input-bordered"
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-control mt-4">
        <label className="label">Repetir nueva contraseña</label>
        <input
          type="password"
          className="input input-bordered"
          value={repetirPassword}
          onChange={(e) => setRepetirPassword(e.target.value)}
          required
        />
      </div>

      {errorCoincidencia && (
        <div className="alert alert-error mt-4">
          <span>Las contraseñas no coinciden.</span>
        </div>
      )}
      <div className="form-control mt-4">
        <button className="btn btn-primary mt-6" type="submit">Actualizar contraseña</button>
      </div>
    </form>
  );
};
export default CambiarPassword;
