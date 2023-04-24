import { useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const sportOptions:Array<any> = [
    { value: 'baloncesto', label: 'Baloncesto' },
    { value: 'futbol', label: 'Fútbol' },
    { value: 'futbol-sala', label: 'Fútbol sala' },
    { value: 'padel', label: 'Pádel' },
    { value: 'tenis', label: 'Tenis' }
  ];

const difficultyOptions:Array<any> = [
  { value: 'principiante', label: 'Principiante' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'dificil', label: 'Difícil' }
];

const genderOptions:Array<any> = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'mixto', label: 'Mixto' }
];

const colorOptions:Array<any> = [
  { value: 'blanco-negro', label: 'Blanco y negro' },
  { value: 'rojo-negro', label: 'Rojo y negro' },
  { value: 'azul- verde', label: 'Azul y verde' }
];

const options = [
{
    value: 'Pabellon municipal de deportes',
    label: 'Pabellón municipal de deportes',
    image: 'https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg',
    description: 'Archena, Murcia',
},
{
    value: 'Ciudad deportiva “El Romeral”',
    label: 'Ciudad deportiva “El Romeral”',
    image: 'https://laguiaw.com/contenido/logotipos/92740_polideportivo_el_romeral_de_molina_de_segura.jpg',
    description: 'Molina de segura, Murcia',
},
// Agregar más opciones aquí...
];

  
  const customOption = ({ data, isSelected }:{data:any, isSelected:any}) => (
    <div className="flex items-center py-2">
      <img src={data.image} alt={data.label} className="h-12 mx-2 rounded-sm" />
      <div>
        <div className="font-medium">{data.label}</div>
        <div className="text-sm text-gray-500">{data.description}</div>
      </div>
    </div>
  );
  
  const CustomSelect = ({ options, value, onChange, placeholder }:{options:any, value:any, onChange:any, placeholder:any}) => (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      components={{ Option: customOption }}
      styles={{
        control: (provided) => ({
          ...provided,
          height: '43px', // altura personalizada
        }),
    }}
    theme={(theme:any) => ({
        ...theme,
        borderRadius: "0.375rem",
        colors: {
          ...theme.colors,
          primary25: '#a5ff1b',
          primary: '#181818',
        },
      })}
    />
  );

export const ModalCrearEvento = ({onClose}:{onClose:any}) => {

    const [sport, setSport] = useState(null);
    const [polideportivo, setPolideportivo] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    
    const mostrarDetalles = (e:any) => {
      e.preventDefault();
      const detalles = document.getElementById("detalles");
      if (detalles !== null) {
        detalles.style.display = "block";
      }
    }

    const handleOverlayClick = (event:any) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };

    const handleSubmit = (e:any) => {
      e.preventDefault()
      console.log(sport, polideportivo, difficulty)
      onClose()
    }
  return (
    <>
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0 "
          >
            <div
              className="fixed inset-0 transition-opacity bg-fondo bg-opacity-60"
              aria-hidden="true"
              onClick={handleOverlayClick}
            ></div>

            <div
              className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-fondo rounded-lg shadow-xl 2xl:max-w-2xl"
            >

              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-2xl font-medium text-primary">
                  Crear evento
                </h1>
                <button
                  className="text-white focus:outline-none hover:text-gray-700"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-sm text-white ">
                ¡Crea un evento y conoce a gente nueva con la que compartir tu deporte preferido!
              </p>

              <form className="mt-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="user name" className="block text-sm text-primary font-bold capitalize">
                  Nombre del evento
                </label>
                  <div className="relative">
                    <input
                      placeholder="Arthur Melo"
                      type="text"
                      className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-1">
                      <button className="text-primary bg-fondo py-1 px-2 rounded-md hover:text-white" onClick={mostrarDetalles}>Añadir descripción</button>
                    </span>
                  </div>
                </div>
                <div className="mt-4" id="detalles" style={{display: 'none'}}>
                    <label
                        htmlFor="email"
                        className="block text-sm text-primary font-bold"
                    >
                        Descripción
                    </label>
                    <textarea
                        placeholder="Traeros balón"
                        className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm text-primary font-bold capitalize"
                    >
                        Polideportivo
                    </label>
                    <CustomSelect
                        value={polideportivo}
                        options={options}
                        onChange={setPolideportivo}
                        placeholder="Selecciona un polideportivo"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="sport"
                        className="block text-sm text-primary font-bold capitalize"
                    >
                        Deporte
                    </label>
                    <Select
                        options={sportOptions}
                        id="sport"
                        value={sport}
                        onChange={setSport}
                        placeholder="Selecciona un deporte"
                        className=" text-lg mt-2"
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              height: '43px', // altura personalizada
                            }),
                        }}
                        theme={(theme:any) => ({
                            ...theme,
                            borderRadius: "0.375rem",
                            colors: {
                              ...theme.colors,
                              primary25: '#a5ff1b',
                              primary: '#181818',
                            },
                          })}
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm text-primary font-bold"
                    >
                        Fecha
                    </label>
                    <input
                        placeholder="arthurmelo@example.app"
                        type="date"
                        className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm text-primary font-bold"
                    >
                        Hora
                    </label>
                    <input
                        placeholder="arthurmelo@example.app"
                        type="time"
                        className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="duration" className="block text-sm text-primary font-bold">
                        Duración
                    </label>
                    <div className="flex items-center mt-2">
                        <input
                            type="number"
                            id="hours"
                            name="hours"
                            min="0"
                            max="23"
                            className="w-16 mr-2 px-3 py-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                        />
                        <span className="text-white mr-2">h</span>
                        <input
                            type="number"
                            id="minutes"
                            name="minutes"
                            min="0"
                            max="59"
                            className="w-16 mr-2 px-3 py-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                        />
                        <span className="text-white">min</span>
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm text-primary font-bold"
                    >
                        Jugadores
                    </label>
                    <input
                        placeholder="arthurmelo@example.app"
                        type="number"
                        className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm text-primary font-bold"
                    >
                        Género
                    </label>
                    <Select
                        options={genderOptions}
                        id="sport"
                        value={sport}
                        onChange={setSport}
                        placeholder="Selecciona un género"
                        className=" text-lg mt-2"
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              height: '43px', // altura personalizada
                            }),
                        }}
                        theme={(theme:any) => ({
                            ...theme,
                            borderRadius: "0.375rem",
                            colors: {
                              ...theme.colors,
                              primary25: '#a5ff1b',
                              primary: '#181818',
                            },
                          })}
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm text-primary font-bold"
                    >
                        Colores de las camisetas
                    </label>
                    <Select
                        options={colorOptions}
                        id="sport"
                        value={sport}
                        onChange={setSport}
                        placeholder="Selecciona colores de las camisetas"
                        className=" text-lg mt-2"
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              height: '43px', // altura personalizada
                            }),
                        }}
                        theme={(theme:any) => ({
                            ...theme,
                            borderRadius: "0.375rem",
                            colors: {
                              ...theme.colors,
                              primary25: '#a5ff1b',
                              primary: '#181818',
                            },
                          })}
                    />
                </div>
                <div className="mt-4">
                    <h1 className="text-lg font-medium text-white">
                        Detalles del evento
                    </h1>
                    </div>
                    <div className="flex items-center mt-2">
                      <label
                          htmlFor="permission1"
                          className="block text-sm leading-5 text-white pr-2"
                      >
                        <FontAwesomeIcon icon={faGear} size="lg" style={{color: "#ffffff",}} />  Seleccionar dificultad
                      </label>
                      <Select
                        options={difficultyOptions}
                        id="difficulty"
                        value={difficulty}
                        onChange={setDifficulty}
                        placeholder="Seleccione una"
                        theme={(theme:any) => ({
                            ...theme,
                            borderRadius: "0.375rem",
                            colors: {
                              ...theme.colors,
                              primary25: '#a5ff1b',
                              primary: '#181818',
                            },
                          })}
                      />
                    </div>
                <div className="flex items-center mt-2">
                  <label
                          htmlFor="permission2"
                          className=" block text-sm leading-5 text-white"
                      >
                        <FontAwesomeIcon icon={faLock} size="lg" style={{color: "#ffffff", marginRight:"5px"}} />  Marcar evento como privado 
                      </label>
                  <div className="relative ml-3 mt-2">
                    <label htmlFor="toggle" className="inline-block w-10 h-6 bg-gray-400 rounded-full"></label>
                    <input type="checkbox" id="toggle" className="hidden" />
                    <label htmlFor="toggle" className="absolute left-0 bg-white border-2 border-gray-400 rounded-full w-4 h-4 top-1"></label>
                  </div>
                </div>
                <button className="bg-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 mr-2" onClick={handleOverlayClick}>
                    Cancelar
                </button>
                <button className="bg-primary px-4 py-2 mt-4 rounded-md hover:bg-indigo-600">
                    Crear evento
                </button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}
