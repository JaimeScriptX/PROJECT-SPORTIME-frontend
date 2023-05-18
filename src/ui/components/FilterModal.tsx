import { useState } from "react";
import Select  from 'react-select';


const sportOptions:Array<any> = [
  { value: 'Baloncesto', label: 'Baloncesto' },
  { value: 'Futbol', label: 'Fútbol' },
  { value: 'Futbol sala', label: 'Fútbol sala' },
  { value: 'Padel', label: 'Pádel' },
  { value: 'Tenis', label: 'Tenis' }
];

export const FilterModal = ({ closeModal, updateFilters  }:{closeModal:any, updateFilters: any}) => {

  const [sport, setSport] = useState<Select | null>(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const applyFilters = () => {
    updateFilters(sport, fecha, hora);
    console.log(updateFilters)
    closeModal();
  };

  return (
<div className="fixed mt-5 inset-0 items-center justify-center z-50" style={{paddingTop: '3rem'}}>
      <div className="bg-white px-10 pt-3 pb-5 rounded-b-xl">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>

        <div className="mb-4">
          <label htmlFor="deporte" className="mr-2">
            Deporte:
          </label>
          <Select
            options={sportOptions}
            id="sport"
            value={sport}
            required
            onChange={setSport}
            placeholder="Selecciona un deporte"
            className="text-lg mt-2"
            styles={{
              control: (provided) => ({
                ...provided,
                height: '43px',
                backgroundColor: '#181818',
                boxShadow: '0px 3.2px 0px -1px #FFFFFF',
                border: '0px',
                borderColor:"#a5ff1b",
                color: '#FFFFFF', // establecer el color del texto en blanco
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#FFFFFF', // establecer el color del placeholder en blanco
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#FFFFFF',
                 // establecer el color del texto seleccionado en blanco
              }),
            }}
            theme={(theme:any) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#a5ff1b',
                primary: '#222222',
              },
            })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fecha" className="mr-2 ">
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
