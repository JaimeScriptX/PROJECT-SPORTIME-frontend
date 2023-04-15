import { useState } from "react";
import { Footer, Navbar } from "../../../ui";
import Select from 'react-select';
import { MapCreate } from "../components/MapCreate";

const options:Array<any> = [
  { value: 'publico', label: 'Público' },
  { value: 'privado', label: 'Privado' }
];

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

const locations = [
  {
    name: 'Location 1',
    longitude: -74.0059,
    latitude: 40.7128,
    scrollPosition: 0,
  },
  {
    name: 'Location 2',
    longitude: -73.9352,
    latitude: 40.7306,
    scrollPosition: 800,
  },
  {
    name: 'Location 3',
    longitude: -73.9928,
    latitude: 40.7193,
    scrollPosition: 1600,
  },
  {
    name: 'Location 4',
    longitude: -74.0049,
    latitude: 40.7423,
    scrollPosition: 2400,
  },
];

const Step1 = ({ name, setName, publicPrivate, setPublicPrivate }:{name:string, setName:React.Dispatch<React.SetStateAction<string>>, publicPrivate:any, setPublicPrivate:React.Dispatch<React.SetStateAction<null>>}) => (
  <div>
    <div className="mb-4">
      <label htmlFor="name" className="block font-n27 pb-1 text-primary">Nombre del evento</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded border border-gray-400 py-2 px-3 dark:focus:border-primary"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="public-private" className="block font-n27 pb-1 text-primary">Tipo de evento</label>
      <Select
        options={options}
        id="public-private"
        value={publicPrivate}
        onChange={setPublicPrivate}
        placeholder="Seleccione una opción"
      />
    </div>
  </div>
);

const Step2 = ({ sport, setSport, polideportivo, setPolideportivo, date, setDate, playerCount, setPlayerCount }:{sport:any, setSport:React.Dispatch<React.SetStateAction<null>>, polideportivo:any, setPolideportivo:React.Dispatch<React.SetStateAction<string>>, date:any, 
    setDate:React.Dispatch<React.SetStateAction<string>>, playerCount:any, setPlayerCount:React.Dispatch<React.SetStateAction<string>> }) => (
  <div>
    <div className="mb-4">
      <label htmlFor="sport" className="block font-n27 text-primary pb-1">Deporte</label>
      <Select
        options={sportOptions}
        id="sport"
        value={sport}
        onChange={setSport}
        placeholder="Selecciona un deporte"
      />
    </div>

    <div className="mb-4">
    <label htmlFor="polideportivo" className="block font-n27 text-primary pb-1">Polideportivo</label>
  <input
    type="text"
    id="polideportivo"
    value={polideportivo}
    onChange={(e) => setPolideportivo(e.target.value)}
    className="w-full rounded border border-gray-400 py-2 px-3"
  />
</div>

<div className="">
    <MapCreate/>
</div>

<div className="mb-4">
  <label htmlFor="date" className="block font-n27 text-primary pb-1">Fecha</label>
  <input
    type="date"
    id="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full rounded border border-gray-400 py-2 px-3"
  />
</div>

<div className="mb-4">
  <label htmlFor="player-count" className="block font-n27 text-primary pb-1">Número de jugadores</label>
  <input
    type="number"
    id="player-count"
    value={playerCount}
    onChange={(e) => setPlayerCount(e.target.value)}
    className="w-full rounded border border-gray-400 py-2 px-3"
  />
</div>
</div>
);

const Step3 = ({ gender, setGender, difficulty, setDifficulty, color, setColor }:{gender:any, setGender:React.Dispatch<React.SetStateAction<null>>, difficulty:any, setDifficulty: React.Dispatch<React.SetStateAction<null>>, 
    color:any, setColor:React.Dispatch<React.SetStateAction<null>>}) => (

    <div>
      <div className="mb-4">
        <label htmlFor="gender" className="block font-n27 text-primary pb-1">Género</label>
        <Select
          options={genderOptions}
          id="gender"
          value={gender}
          onChange={setGender}
          placeholder="Seleccione un género"
        />
      </div>
      <div className="mb-4">
  <label htmlFor="difficulty" className="block font-n27 text-primary pb-1">Dificultad</label>
  <Select
    options={difficultyOptions}
    id="difficulty"
    value={difficulty}
    onChange={setDifficulty}
    placeholder="Seleccione la dificultad"
  />
</div>

<div className="mb-4">
  <label htmlFor="color" className="block font-n27 text-primary pb-1">Colores de las camisetas</label>
  <Select
    options={colorOptions}
    id="color"
    value={color}
    onChange={setColor}
    placeholder="Seleccione los colores"
  />
</div>
</div>
);

export const CreateEventPage = () => {
    
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
        <div className='relative w-full h-80'>
            <img src={'https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg'} className='absolute top-0 left-0 w-full h-full object-cover object-center' style={{ objectPosition: '20% 50%' }} />
            <div className='absolute top-4 left-3 w-10 h-10 flex items-center justify-center bg-white opacity-80  rounded-full'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='-5 -3 35 30' fill='none' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-arrow-left'>
                <path d='M19 12H5M12 19l-7-7 7-7' />
                </svg>
            </div>
        </div>
        <div className="bg-footer">   
            <div className='bg-fondo rounded-t-3xl relative mx-36 max-md:mx-0' style={{ marginTop: '-60px' }}>
                <div className='absolute left-1/2 transform -translate-x-1/2 px-32 lg:px-36 py-16' style={{ marginTop: '-110px' }}>
                    <div className='fixed top-12 py-4 w-full flex justify-center inset-x-0 bg-primary'>
                        <h1 className='text-black text-3xl lg:text-4xl font-n27'>Crear evento</h1>
                    </div>
                </div>
                <div className="pt-10 lg:max-w-3xl max-w-sm mx-auto">
                    <div
                        className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200"
                    >
                        <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
                        <li className="relative text-left text-white">
                            <span
                            className="absolute left-0 -bottom-[1.75rem] rounded-full bg-primary text-white"
                            >
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="#181818"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                                />
                            </svg>
                            </span>

                            <span className="hidden sm:block"> Información básica </span>

                            <svg
                            className="ml-0 h-6 w-6 sm:hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentcolor"
                            stroke-width="2"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                            </svg>
                        </li>

                        <li className="relative text-center text-white">
                            <span
                            className="absolute left-1/2 -bottom-[1.75rem] -translate-x-1/2 rounded-full bg-primary text-white"
                            >
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="#181818"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                                />
                            </svg>
                            </span>

                            <span className="hidden sm:block"> Polideportivo </span>

                            <svg
                            className="mx-auto h-6 w-6 sm:hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentcolor"
                            stroke-width="2"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            </svg>
                        </li>

                        <li className="relative text-right">
                            <span className="hidden sm:block"> Detalles </span>

                            <svg
                            className="ml-auto h-6 w-6 sm:hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentcolor"
                            stroke-width="2"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                            </svg>
                        </li>
                        </ol>
                    </div>
                </div>
                <div className="lg:max-w-xl max-w-sm mx-auto py-10">
                    <form onSubmit={handleSubmit}>
                        <div className={currentStep === 1 ? "" : "hidden"}>
                            <Step1 name={name} setName={setName} publicPrivate={publicPrivate} setPublicPrivate={setPublicPrivate} />
                            <button type="button" onClick={() => setCurrentStep(2)} className="bg-primary text-black py-2 px-4 rounded">Siguiente</button>
                        </div>
                        <div className={currentStep === 2 ? "" : "hidden"}>
                            <Step2 sport={sport} setSport={setSport} polideportivo={polideportivo} setPolideportivo={setPolideportivo} date={date} setDate={setDate} playerCount={playerCount} setPlayerCount={setPlayerCount} />
                            <button type="button" onClick={() => setCurrentStep(1)} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded">Anterior</button>
                            <button type="button" onClick={() => setCurrentStep(3)} className="bg-primary text-black py-2 px-4 rounded">Siguiente</button>
                        </div>
                        <div className={currentStep === 3 ? "" : "hidden"}>
                            <Step3 gender={gender} setGender={setGender} difficulty={difficulty} setDifficulty={setDifficulty} color={color} setColor={setColor} />
                            <button type="button" onClick={() => setCurrentStep(2)} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded">Anterior</button>
                            <button type="submit" className="bg-primary text-black py-2 px-4 rounded">Crear evento</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    <Footer />
    </>
);
}