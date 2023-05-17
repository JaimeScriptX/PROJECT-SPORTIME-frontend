import { useState } from "react";

export const FilterModal = ({ closeModal }:{closeModal:any}) => {

  const [deporte, setDeporte] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const applyFilters = () => {
    closeModal();
  };

  return (
<div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-5 justify-center rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>

        <div className="mb-4">
          <label htmlFor="deporte" className="mr-2">
            Deporte:
          </label>
          <select
            id="deporte"
            className="py-1 px-2 border-x-2 border-gray text-gray-500 bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:bg-transparent dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-300"
            value={deporte}
            onChange={(e) => setDeporte(e.target.value)}
          >
            <option value="">Selecciona un deporte</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="fecha" className="mr-2">
            Fecha:
          </label>
          <select
            id="fecha"
            className="py-1 px-2 border-none text-gray-500 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          >
            <option value="">Hoy</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="hora" className="mr-2">
            Hora:
          </label>
          <select
            id="hora"
            className="py-1 px-2 border-l-2 text-gray-500 bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:bg-transparent dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-300"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          >
            <option value="">13:30</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
          </select>
        </div>

        <div className="flex justify-end">
        <button
                     className=" bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
                     onClick={closeModal}
                   >
            Cerrar
            </button>
          <button
            className="ml-2 bg-primary hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded"
            onClick={applyFilters}
            >
            Aplicar
            </button>

            </div>
            </div>
            </div>
)}
