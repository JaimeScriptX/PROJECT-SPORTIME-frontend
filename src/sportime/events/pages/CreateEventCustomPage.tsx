import { useEffect, useRef, useState } from "react";
import { Footer, Navbar } from "../../../ui";
import ReactSelect  from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLock, faWallet } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-toggle'
import "react-toggle/style.css" 
import { useEventStore } from "../../../hooks/useEventStore";
import CustomSelect from "../components/MultiSelect";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import wallpaper from '../../../assets/images/wallpaper.jpg'
import es from 'date-fns/locale/es';
import { useForm } from "react-hook-form";

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

const colorOptions = [
  { value: 'Blanco', label: 'Blanco', color: '#dee2e6' },
  { value: 'Negro', label: 'Negro', color: '#343a40' },
  { value: 'Rojo', label: 'Rojo', color: '#ef233c' },
  { value: 'Verde', label: 'Verde', color: '#9cf21a' },
  { value: 'Azul', label: 'Azul', color: '#3a86ff' },
  { value: 'Amarillo', label: 'Amarillo', color: '#FFFF00' },
];

interface Select {
  value: string;
  label: string;
}

type Inputs = {
  name: string,
  details: string,
  players: number,
  sportCenter: string,
  hour: number,
  minutes:number,
};

export const CreateEventCustomPage = () => {
    
    const {startCreateCustom, user} = useEventStore()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();


    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [sport, setSport] = useState<Select | null>(null);
    const [sportCenter, setSportCenter] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Select | null>(null);
    const [hourOptions, setHourOptions] = useState([]);
    const [hour, setHour] = useState('');
    const [minutes, setMinutes] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [playerCountError, setPlayerCountError] = useState("");
    const [gender, setGender] = useState<Select | null>(null);
    const [difficulty, setDifficulty] = useState<Select | null>(null);
    const [colorsM, setColorsM] = useState<Array<Select>>([]);
    const [price, setPrice] = useState('0');
    const [isPrivate, setIsPrivate] = useState(false)
    const [priceOpen, setPriceOpen] = useState(false)
    const [error, setError] = useState("");
    const submitButtonRef = useRef(null);

    useEffect(() => {
      const generateHourOptions = () => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const options = [];
    
        const selectedDate = date || new Date(); // Si no hay fecha seleccionada, se usa la fecha actual
    
        if (
          selectedDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)
        ) {
          // Es la fecha actual, generar opciones a partir de la próxima hora
          for (let hour = currentHour + 1; hour < 24; hour++) {
            options.push({
              value: hour.toString(),
              label: `${hour.toString().padStart(2, '0')}:00`,
            });
          }
        } else {
          // No es la fecha actual, generar opciones para todas las horas
          for (let hour = 0; hour < 24; hour++) {
            options.push({
              value: hour.toString(),
              label: `${hour.toString().padStart(2, '0')}:00`,
            });
          }
        }
    
        return options;
      };
    
      const options:any = generateHourOptions();
      setHourOptions(options);
    }, [date]);
    


    const calculateDuration = ({hour, minutes}:{hour:any, minutes:any}) => {
      const duration = `${hour || "00"}:${minutes || "00"}:00`;
      return duration;
    };


    const handleColorChange = (selectedOptions:any) => {
      if (selectedOptions.length <= 2) {
        setColorsM(selectedOptions);
      }
    };



    const onSubmit = (data:Inputs) => {

        if(!playerCountError && data.name && data.sportCenter && data.hour && data.minutes){
          setHour(data.hour.toString())
          setMinutes(data.minutes.toString())

        let timeString = ""
        if (time && time.label) {

          const timeParts = time.label.split(':');
          const hour = parseInt(timeParts[0]);
          const minute = parseInt(timeParts[1]);
          
          const selectedDateTime = new Date();
          selectedDateTime.setHours(hour);
          selectedDateTime.setMinutes(minute);
          timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        }
        const newDuration = calculateDuration({hour:data.hour, minutes:data.minutes});
        console.log(newDuration)
        const sportS = sport ? sport.value : null;
        const genderS = gender ? gender.value : null;
        const difficultyS = difficulty ? difficulty.value : null;

        const fk_difficulty = {
          type: difficultyS
        }

        const fk_sex = {
          gender: genderS
        }

        const fk_sport = {
          name: sportS
        }
        
        const dateS = date ? new Date(date.getTime()) : null;
        if (dateS) {
          dateS.setUTCDate(dateS.getUTCDate() + 1);
          console.log(dateS)
        }        
        startCreateCustom({name:data.name, details:data.details, price:parseInt(price), date: dateS || new Date(), duration: newDuration, is_private:isPrivate, number_players:parseInt(playerCount), time: timeString, fk_difficulty, fk_person:user.uuid, fk_sex, fk_sport, fk_teamcolor:colorsM[0].label, fk_teamcolor_two:colorsM[1].label, sport_center_custom:data.sportCenter  })
      }
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

    const handlePriceChange = (e:any) => {
      const inputValue = e.target.value;
      setPrice(inputValue);
  
      if (priceOpen) {
        if (inputValue.includes("-")) {
          setError("El valor no puede ser negativo");
        } else {
          const parsedPrice = parseFloat(inputValue);
          if (isNaN(parsedPrice) || parsedPrice < 0) {
            setError("El valor debe ser un número mayor o igual a 0");
          } else {
            setError("");
          }
        }
      }
    };

    const handlePlayerCountChange = (e:any) => {
      const value = e.target.value;
      
      setPlayerCount(value);
    
      // Validar el campo playerCount
      if (value.trim() === "") {
        setPlayerCountError("Este campo es obligatorio");
      } else if (parseInt(value) < 1) {
        setPlayerCountError("El número de jugadores por equipo debe ser mayor o igual a 1");
      } else if (parseInt(value) > 20) {
        setPlayerCountError("El número de jugadores por equipo no puede ser mayor a 20");
      } else {
        setPlayerCountError("");
      }
    };
    

    const onNavigateBack = () => {
      navigate(-1)
    }

    return (
    <>
    <Navbar />
        <div className='relative w-full h-60'>
            <img src={wallpaper} className='absolute top-0 left-0 w-full h-full object-cover object-center' style={{ objectPosition: '20% 50%' }} />
            <div className='absolute top-4 left-3 w-10 h-10 flex items-center justify-center bg-white opacity-80 cursor-pointer rounded-full'  onClick={onNavigateBack}>
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

                            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                              <label htmlFor="user name" className="block text-md text-primary font-bold">
                                Nombre del evento
                              </label>
                                <div className="relative">
                                <input
                                    placeholder="¡Únete a pasarlo bien jugando con unos amigos!"
                                    {...register("name", { required: true, minLength: 5, maxLength: 69 })}
                                    className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
                                  />
                                  {errors.name && errors.name.type === "required" && (
                                    <span className="text-error">Este campo es obligatorio</span>
                                  )}
                                  {errors.name && errors.name.type === "minLength" && (
                                    <span className="text-error">El nombre debe tener al menos 5 caracteres</span>
                                  )}
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
                                    placeholder="Traed balón (opcional)"
                                    {...register("details")}
                                    className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
                                    />
                              </div>
                              <div className="mt-4">
                                <label htmlFor="centro-deportivo" className="block text-md text-primary font-bold">
                                  Centro deportivo
                                </label>
                                <input
                                  placeholder="Centro deportivo donde se va a jugar"
                                  required
                                  {...register("sportCenter", { required: "Este campo es obligatorio" })}
                                  className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none"
                                />
                                {errors.sportCenter && (
                                  <span className="text-error">{errors.sportCenter.message}</span>
                                )}
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
                                  <DatePicker
                                    selected={date}
                                    onChange={setDate}
                                    dateFormat="dd/MM/yyyy"
                                    className=" block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-white border-b-2 border-gray-200  focus:border-primary focus:outline-none "
                                    placeholderText='Seleccione la fecha'
                                    locale={es}
                                    required
                                    minDate={new Date()}
                                  />
                              </div>
                              <div className="mt-4">
                                  <label
                                      htmlFor="hora"
                                      className="block text-md text-primary font-bold"
                                  >
                                      Hora
                                  </label>
                                  <ReactSelect
                                    options={hourOptions}
                                    value={time}
                                    onChange={setTime}
                                    placeholder="Seleccione la hora"
                                    className="text-lg focus:outline-none"
                                    required
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
                              <label htmlFor="hour" className="block text-md text-primary font-bold">
                                Duración
                              </label>
                              <div className="flex items-baseline">
                                <input
                                  placeholder="1"
                                  type="number"
                                  min={0}
                                  max={10}
                                  {...register("hour", {
                                    required: "Campo obligatorio",
                                    pattern: {
                                      value: /^(?=.*[0-9])\d*$/,
                                      message: "Ingresa un valor válido para la hora",
                                    },
                                  })}
                                  className="block w-20 mr-1 px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
                                />
                                <h1 className="text-white text-xl pr-2">H</h1>
                                {errors.hour && <span className="text-error">{errors.hour.message}</span>}
                                <input
                                  placeholder="30"
                                  type="number"
                                  min={0}
                                  max={60}
                                  {...register("minutes", {
                                    required: "Campo obligatorio",
                                    pattern: {
                                      value: /^(?=.*[0-9])\d*$/,
                                      message: "Ingresa un valor válido para los minutos",
                                    },
                                  })}
                                  className="block w-20 mr-1 px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
                                />
                                <h1 className="text-white text-xl">M</h1>
                                {errors.minutes && <span className="text-error pl-2">{errors.minutes.message}</span>}
                              </div>
                            </div>
                              <div className="mt-4">
                                <label htmlFor="jugadores" className="block text-md text-primary font-bold">
                                  Nº de jugadores por equipo
                                </label>
                                <input
                                  placeholder="5"
                                  type="number"
                                  required
                                  min={1}
                                  value={playerCount}
                                  onChange={handlePlayerCountChange}
                                  className="block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
                                />
                                {playerCountError && <span className="text-error">{playerCountError}</span>}
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
                                   <CustomSelect  colorOptions={colorOptions} color={colorsM} setColor={handleColorChange} />
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
                                      onChange={handlePriceChange}
                                      className={`w-12 px-3 py-2 mt-2 text-white bg-fondo placeholder-gray-400 border-b-2 border-gray-200 focus:border-primary focus:outline-none ${priceOpen ? '' : 'opacity-50'}`}
                                      required={priceOpen}
                                      disabled={!priceOpen}
                                    />€
                                  </h1>
                                  {error && <span className="text-error">{error}</span>}
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
                              <button type="submit" ref={submitButtonRef} className="bg-primary px-4 py-2 mt-4 rounded-md hover:bg-lime-500">
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