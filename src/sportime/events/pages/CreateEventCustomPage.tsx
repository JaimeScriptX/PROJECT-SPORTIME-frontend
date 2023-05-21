import { useState } from "react";
import { Footer, Navbar } from "../../../ui";
import ReactSelect  from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLock, faWallet } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-toggle'
import "react-toggle/style.css" 
import { useEventStore } from "../../../hooks/useEventStore";
import CustomSelect from "../components/MultiSelect";
import { useNavigate } from "react-router-dom";

const sportOptions:Array<any> = [
  { value: 'Baloncesto', label: 'Baloncesto' },
  { value: 'Futbol', label: 'Fútbol' },
  { value: 'Futbol sala', label: 'Fútbol sala' },
  { value: 'Padel', label: 'Pádel' },
  { value: 'Tenis', label: 'Tenis' }
];

const genderOptions:Array<any> = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Femenino', label: 'Femenino' },
  { value: 'Mixto', label: 'Mixto' }
];

const difficultyOptions:Array<any> = [
  { value: 'Principiante', label: 'Principiante' },
  { value: 'Intermedio', label: 'Intermedio' },
  { value: 'Dificil', label: 'Difícil' }
];

const colorOptions:Array<any> = [
  { value: 'blanco', label: 'Blanco' },
  { value: 'negro', label: 'Negro' },
  { value: 'rojo', label: 'Rojo' },
  { value: 'azul', label: 'Azul' },
  { value: 'verde', label: 'Verde' }
];

interface Select {
  value: string;
  label: string;
}

export const CreateEventCustomPage = () => {
    
    const {startCreateCustom, user} = useEventStore()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [sport, setSport] = useState<Select | null>(null);
    const [centroDeportivo, setCentroDeportivo] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [hour, setHour] = useState('');
    const [minutes, setMinutes] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [gender, setGender] = useState<Select | null>(null);
    const [difficulty, setDifficulty] = useState<Select | null>(null);
    const [color, setColor] = useState<Select | null>(null);
    const [colorsM, setColorsM] = useState([]);
    const [price, setPrice] = useState('0');
    const [isPrivate, setIsPrivate] = useState(false)
    const [priceOpen, setPriceOpen] = useState(false)

    const calculateDuration = () => {
      const duration = `${hour || "00"}:${minutes || "00"}:00`;
      return duration;
    };

    const colorOptions = [
      { value: 'red', label: 'Rojo', color: '#ef233c' },
      { value: 'green', label: 'Verde', color: '#9cf21a' },
      { value: 'blue', label: 'Azul', color: '#3a86ff' },
      { value: 'yellow', label: 'Amarillo', color: '#FFFF00' },
      { value: 'white', label: 'Blanco', color: '#dee2e6' },
      { value: 'black', label: 'Negro', color: '#343a40' },
    ];

    const handleColorChange = (selectedOptions:any) => {
      if (selectedOptions.length <= 2) {
        setColorsM(selectedOptions);
      }
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const dateS = new Date();
        dateS.setHours(parseInt(time.split(':')[0]));
        dateS.setMinutes(parseInt(time.split(':')[1]));
        dateS.setSeconds(0);
        const formattedTime = dateS.toISOString().substr(11, 8);

        console.log(formattedTime)

        const newDuration = calculateDuration();

        const sportS = sport ? sport.value : null;
        const genderS = gender ? gender.value : null;
        const difficultyS = difficulty ? difficulty.value : null;
        const coloryS = color ? color.value : null;

        const fk_difficulty = {
          type: difficultyS
        }

        const fk_sex = {
          gender: genderS
        }

        const fk_sport = {
          name: sportS
        }

        console.log(newDuration)
        const eventData = {
          name,
          details,
          sportS,
          centroDeportivo,
          date,
          time,
          duration,
          playerCount,
          genderS,
          difficultyS,
          coloryS,
          price,
          isPrivate
        };
        
        console.log(eventData);
        startCreateCustom({name, details, price:parseInt(price), date, duration: newDuration, is_private:isPrivate, number_players:parseInt(playerCount), time, fk_difficulty, fk_person:user.uuid, fk_sex, fk_sport, fk_teamcolor:1  })
    }
    
    const handlePrivate = () => {
      setIsPrivate(!isPrivate)
    }

    const handlePrice = (event:any) => {
      const isOpen = event.target.checked;
      setPriceOpen(isOpen);
  
      if (!isOpen) {
        setPrice('0');
      }
    }

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
                        <h1 className='text-black text-xl lg:text-3xl font-n27'>Crear evento [PERSONALIZADO]</h1>
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
                                    placeholder="¡Unete a pasartlo bien jugando con unos amigos!"
                                    type="text"
                                    maxLength={69}
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none "
                                  />
                                </div>
                              </div>
                              <div className="mt-4" id="detalles">
                                  <label
                                      htmlFor="detalles"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Detalles
                                  </label>
                                  <textarea
                                      placeholder="Traeros balón (opcional)"
                                      name="detalles"
                                      value={details}
                                      onChange={(e) => setDetails(e.target.value)}
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="centro-deportivo"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Centro deportivo
                                  </label>
                                  <input
                                    placeholder="Busca el centro deportivo donde vas a jugar"
                                    type="text"
                                    name="centro-deportivo"
                                    value={centroDeportivo}
                                    onChange={(e) => setCentroDeportivo(e.target.value)}
                                    className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="deporte"
                                      className="block text-md text-primary font-bold capitalize"
                                  >
                                      Deporte
                                  </label>
                                  <ReactSelect
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
                              <div className="mt-4">
                                  <label
                                      htmlFor="fecha"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Fecha
                                  </label>
                                  <input
                                      placeholder="arthurmelo@example.app"
                                      type="date"
                                      required
                                      name="fecha"
                                      value={date} onChange={(e) => setDate((e.target.value))}
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none "
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="hora"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Hora
                                  </label>
                                  <input
                                      placeholder="arthurmelo@example.app"
                                      type="time"
                                      required
                                      name="hora"
                                      value={time}
                                      onChange={(e) => setTime(e.target.value)}
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="duracion"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Duración
                                  </label>
                                  <div className="flex items-baseline">
                                    <input
                                        placeholder="1"
                                        type="number"
                                        name="hora"
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                        className="block w-20 mr-1 px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none"
                                    />
                                    <h1 className="text-white text-xl pr-2">H</h1>
                                    <input
                                        placeholder="30"
                                        type="number"
                                        name="hora"
                                        value={minutes}
                                        onChange={(e) => setMinutes(e.target.value)}
                                        className="block w-20 mr-1 px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none"
                                    />
                                    <h1 className="text-white text-xl">M</h1>
                                  </div>
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="jugadores"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Nº de jugadores por equipo
                                  </label>
                                  <input
                                      placeholder="5"
                                      type="number"
                                      min={1}
                                      required
                                      name="jugadores"
                                      value={playerCount}
                                      onChange={(e) => setPlayerCount(e.target.value)}
                                      className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="genero"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Género
                                  </label>
                                  <ReactSelect
                                      options={genderOptions}
                                      id="sport"
                                      value={gender}
                                      required
                                      onChange={setGender}
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
                                  <ReactSelect
                                      options={colorOptions}
                                      id="sport"
                                      value={color}
                                      onChange={setColor}
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
                                   <CustomSelect colorOptions={colorOptions} color={colorsM} setColor={handleColorChange} />
                              </div>
                              <div className="mt-4">
                              <label
                                      className="block text-md text-primary font-bold"
                                  >
                                      Dificultad
                                  </label>
                                    <ReactSelect
                                      options={difficultyOptions}
                                      id="difficulty"
                                      value={difficulty}
                                      required
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
                                  <div className="flex items-center pt-8">
                                    <label htmlFor="precio" className="block text-mdleading-5 text-white pr-2">
                                      <FontAwesomeIcon icon={faCircleCheck} size="lg" style={{ color: "#ffffff", marginRight: "5px" }} /> Es de pago la pista y esta reservada
                                    </label>
                                    <Toggle
                                      defaultChecked={priceOpen}
                                      icons={false}
                                      onChange={handlePrice}
                                    />
                                  </div>
                                  <h1 className="text-white pt-2">
                                    <FontAwesomeIcon icon={faWallet} size="lg" style={{ color: "#ffffff", marginRight: "10px" }} /> Precio por persona
                                    <input
                                      type="number"
                                      name="precio"
                                      value={price}
                                      min={0}
                                      onChange={(e) => setPrice(e.target.value)}
                                      className={`w-12 px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200 focus:border-primary focus:outline-none ${priceOpen ? '' : 'opacity-50'}`}
                                      required={priceOpen}
                                      disabled={!priceOpen}
                                    />€
                                  </h1>
                              <div className="flex items-center pt-8">
                                <label
                                    htmlFor="privado"
                                    className="block text-mdleading-5 text-white pr-2"
                                    >
                                      <FontAwesomeIcon icon={faLock} size="lg" style={{color: "#ffffff", marginRight:"5px"}} />  Marcar evento como privado 
                                </label>
                                <Toggle
                                          defaultChecked={isPrivate}
                                          icons={false}
                                          onChange={handlePrivate} 
                                      />
                              </div>
                              <button className="bg-white px-4 py-2 mt-5 mb-6  rounded-md hover:bg-red-400 mr-2" >
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