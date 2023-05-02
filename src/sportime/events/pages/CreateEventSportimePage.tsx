import { useState } from "react";
import { Footer, Navbar } from "../../../ui";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const sportOptions:Array<any> = [
  { value: 'baloncesto', label: 'Baloncesto' },
  { value: 'futbol', label: 'Fútbol' },
  { value: 'futbol-sala', label: 'Fútbol sala' },
  { value: 'padel', label: 'Pádel' },
  { value: 'tenis', label: 'Tenis' }
];

const genderOptions:Array<any> = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'mixto', label: 'Mixto' }
];

const difficultyOptions:Array<any> = [
  { value: 'principiante', label: 'Principiante' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'dificil', label: 'Difícil' }
];

const colorOptions:Array<any> = [
  { value: 'blanco-negro', label: 'Blanco y negro' },
  { value: 'rojo-negro', label: 'Rojo y negro' },
  { value: 'azul- verde', label: 'Azul y verde' }
];


export const CreateEventSportimePage = () => {
    
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [publicPrivate, setPublicPrivate] = useState(null);
    const [sport, setSport] = useState(null);
    const [polideportivo, setPolideportivo] = useState('');
    const [date, setDate] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [gender, setGender] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [color, setColor] = useState(null);
    
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const eventData = {
            name,
            publicPrivate,
            sport,
            polideportivo,
            date,
            playerCount,
            gender,
            difficulty,
            color
        };
        
        console.log(eventData);
    };
    
    return (
    <>
    <Navbar />
        <div className='relative w-full h-60'>
            <img src={'https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg'} className='absolute top-0 left-0 w-full h-full object-cover object-center' style={{ objectPosition: '20% 50%' }} />
            <div className='absolute top-4 left-3 w-10 h-10 flex items-center justify-center bg-white opacity-80  rounded-full'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='-5 -3 35 30' fill='none' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-arrow-left'>
                <path d='M19 12H5M12 19l-7-7 7-7' />
                </svg>
            </div>
        </div>
        <div className="bg-footer">   
            <div className='bg-fondo'>
                <div className='absolute left-1/2 transform -translate-x-1/2 px-44 lg:px-72 py-16' style={{ marginTop: '-110px' }}>
                    <div className='fixed top-14 lg:top-12 py-4 w-full flex justify-center inset-x-0 bg-primary'>
                        <h1 className='text-black text-2xl lg:text-4xl font-n27'>Crear evento [SPORTIME]</h1>
                    </div>
                </div>
                <div className="pt-10 lg:max-w-3xl max-w-sm mx-auto pb-16 lg:pb-0">
                            <p className="text-xl pb-5 text-center text-white">
                              ¡Crea un evento y conoce a gente nueva con la que compartir tu deporte preferido!
                            </p>

                            <form className="mt-5" onSubmit={handleSubmit}>
                            <div>
                              <label htmlFor="user name" className="block text-md text-primary font-bold">
                                Nombre del evento
                              </label>
                                <div className="relative">
                                  <input
                                    placeholder="Arthur Melo"
                                    type="text"
                                    className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                                  />
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-1 pb-1">
                                    <button className="text-primary bg-footer py-1 px-2 rounded-md hover:text-white">Añadir descripción</button>
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4" id="detalles" style={{display: 'none'}}>
                                  <label
                                      htmlFor="email"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Descripción
                                  </label>
                                  <textarea
                                      placeholder="Traeros balón"
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="email"
                                      className="block text-md text-primary font-bold capitalize"
                                  >
                                      Polideportivo
                                  </label>
                                  <Select
                                  options={sportOptions}
                                  id="sport"
                                  value={sport}
                                  onChange={setSport}
                                  placeholder="Selecciona un polideportivo"
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
                              <div className="mt-4">
                                  <label
                                      htmlFor="sport"
                                      className="block text-md text-primary font-bold capitalize"
                                  >
                                      Deporte
                                  </label>
                                  <Select
                                  options={sportOptions}
                                  id="sport"
                                  value={sport}
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
                              <div className="mt-4">
                                  <label
                                      htmlFor="email"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Fecha
                                  </label>
                                  <input
                                      placeholder="arthurmelo@example.app"
                                      type="date"
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="email"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Hora
                                  </label>
                                  <input
                                      placeholder="arthurmelo@example.app"
                                      type="time"
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="email"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Nº de jugadores por equipo
                                  </label>
                                  <input
                                      placeholder="5"
                                      type="number"
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="email"
                                      className="block text-md text-primary font-bold"
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

                              <div className="mt-4">
                                  <label
                                      className="block text-md text-primary font-bold"
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
                              <div className="mt-4">
                              <label
                                      className="block text-md text-primary font-bold"
                                  >
                                      Dificultad
                                  </label>
                                    <Select
                                      options={difficultyOptions}
                                      id="difficulty"
                                      value={difficulty}
                                      onChange={setDifficulty}
                                      placeholder="Seleccione una dificultad"
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
ç                                
                              <div className="flex items-center ">
                                <label
                                    htmlFor="permission2"
                                    className=" block text-mdleading-5 text-white"
                                    >
                                      <FontAwesomeIcon icon={faLock} size="lg" style={{color: "#ffffff", marginRight:"5px"}} />  Marcar evento como privado 
                                    </label>
                                <div className="relative ml-3 mt-2">
                                  <label htmlFor="toggle" className="inline-block w-10 h-6 bg-gray-400 rounded-full"></label>
                                  <input type="checkbox" id="toggle" className="hidden" />
                                  <label htmlFor="toggle" className="absolute left-0 bg-white border-2 border-gray-400 rounded-full w-4 h-4 top-1"></label>
                                </div>
                              </div>
                              <button className="bg-white px-4 py-2 mt-4 mb-6  rounded-md hover:bg-red-400 mr-2" >
                                  Reiniciar
                              </button>
                              <button className="bg-primary px-4 py-2 mt-4 rounded-md hover:bg-lime-500">
                                  Crear evento
                              </button>
                              </form>
                          </div>
                      </div>
                  </div>
    <Footer />
    </>
);
}