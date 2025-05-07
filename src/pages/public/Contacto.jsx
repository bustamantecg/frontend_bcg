import React from 'react';
import { Link } from 'react-router-dom';

const Contacto = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="mb-6">Ponte en contacto con nosotros para cualquier consulta, sugerencia o duda. Estamos encantados de atenderte.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Información de Contacto</h2>
          <ul>
            <li className="mb-2"><i class="bi bi-telephone-inbound-fill"></i> 3834264830 horario Administrativo</li>
            <li className="mb-2"><i class="bi bi-envelope-at-fill"></i> bustamantecg@gmail.com</li>
            <li className="mb-2"><i class="bi bi-geo-alt-fill"></i> Padre Jacome Cardozo 2221 - Capital - San Fernando del Valle de Catamarca, CP 4700</li>
          </ul>
          <Link className="btn btn-soft btn-primary" to="/">
              <i class="bi bi-house-door"></i>
          </Link>            
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Formulario de Contacto</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre:</label>
              <input type="text" id="nombre" name="nombre" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
              <input type="email" id="email" name="email" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="mensaje" className="block text-gray-700 font-bold mb-2">Mensaje:</label>
              <textarea id="mensaje" name="mensaje" rows="5" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;