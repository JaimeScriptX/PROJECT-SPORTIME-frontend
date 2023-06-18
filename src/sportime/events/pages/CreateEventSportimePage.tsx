import { useEffect, useState } from "react";
import { Footer, Navbar } from "../../../ui";
import ReactSelect from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLock, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useSportCenter } from "../../../hooks/useSportCenter";
import es from 'date-fns/locale/es';
import DatePicker from "react-datepicker";
import { useReservedStore } from "../../../hooks/useReservedStore";
import CustomSelect from "../components/MultiSelect";
import Toggle from "react-toggle";
import "react-toggle/style.css" 
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import wallpaper from '../../../assets/images/wallpaper.jpg'

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
  players: number
};

export const CreateEventSportimePage = () => {
    
    const {getSportCenters} = useSportCenter()
    const {getHours,getSportCenterByIdSport, createReservedAndEvent, user} = useReservedStore()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();


    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [sport, setSport] = useState<Select | null>(null);
    const [sportCenter, setSportCenter] = useState<Select | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [playerCount, setPlayerCount] = useState('');
    const [playerCountError, setPlayerCountError] = useState("");
    const [gender, setGender] = useState<Select | null>(null);
    const [difficulty, setDifficulty] = useState<Select | null>(null);
    const [sportCenters, setSportCenters] = useState([])
    const [sports, setSports] = useState<Array<Select>>([])
    const [hoursMorning, setHoursMorning] = useState([])
    const [hoursAfternoon, setHoursAfternoon] = useState([])
    const [hoursNight, setHoursNight] = useState([])
    const [selectedHours, setSelectedHours] = useState<string[]>([]);
    const [colorsM, setColorsM] = useState<Array<Select>>([]);
    const [price, setPrice] = useState(0);
    const [isPrivate, setIsPrivate] = useState(false)
    const [sportCenterPrice, setSqportCenterPrice] = useState(0)
    
    
    const handleHourClick = (hour: string) => {
      const isMorningHour = hoursMorning.some((h:any) => h.hour === hour);
      const isAfternoonHour = hoursAfternoon.some((h:any) => h.hour === hour);
      const isNightHour = hoursNight.some((h:any) => h.hour === hour);
    
      const isMorningSelected = selectedHours.some((h) =>
        hoursMorning.some((hour:any) => hour.hour === h)
      );
      const isAfternoonSelected = selectedHours.some((h) =>
        hoursAfternoon.some((hour:any) => hour.hour === h)
      );
      const isNightSelected = selectedHours.some((h) =>
        hoursNight.some((hour:any) => hour.hour === h)
      );
    
      if (
        (isMorningHour && (isAfternoonSelected || isNightSelected)) ||
        (isAfternoonHour && (isMorningSelected || isNightSelected)) ||
        (isNightHour && (isMorningSelected || isAfternoonSelected))
      ) {
        // La hora seleccionada pertenece a otra categoría, no se permite agregarla
        return;
      }
    
      const lastSelectedHour = selectedHours[selectedHours.length - 1];
    
      if (
        lastSelectedHour &&
        (hour <= lastSelectedHour || parseInt(hour) - parseInt(lastSelectedHour) >= 2)
      ) {
        // La hora seleccionada es menor o igual que la última hora seleccionada, o es dos horas mayor, no se permite agregarla
        return;
      }
    
      setSelectedHours((prevHours) => {
        const updatedHours = prevHours.filter((h) => h !== hour);
        if (updatedHours.length === prevHours.length) {
          // La hora no estaba presente en el array, se agrega
          return [...updatedHours, hour];
        }
        return updatedHours;
      });
    
      console.log(selectedHours);
    };
    
    const SportCenterSport = async (selectedOption: Select | null) => {
      setSportCenter(selectedOption); 
      if (selectedOption) {
        const sportCenterId = selectedOption.value;
        await getSportCenterByIdSport(sportCenterId).then((response) => {
          const data = response?.sport; // Acceder al array de deportes dentro de la respuesta

          if (Array.isArray(data)) {
            const sportsOptions = data.map((center: any) => ({
              value: center.id,
              label: center.name,
            }));
            setSports(sportsOptions);
            console.log(sportsOptions);
          }
        })
      }
    };
    
    const SportCenters = async() => {
      await getSportCenters().then((data) => {
        setSportCenters(data);
        setSqportCenterPrice(data[0].price)
        setHoursMorning([])
        setHoursAfternoon([])
        setHoursNight([])
      })
    }

    useEffect(() => {
      SportCenters()
    }, [])
    

    useEffect(() => {
      if(playerCount && selectedHours){
        handlePrice()
      }
    }, [selectedHours,playerCount])
    

    useEffect(() => {
      if (sport && date) {
        checkHours(sportCenter, date);
      }
    }, [sport, date]);
    
    const sportCenterOptions = sportCenters.map((center: any) => ({
      value: center.id,
      label: center.name,
    }));

    const handleSportChange = (selectedOption: Select | null) => {
      setSport(selectedOption);
    };
    
    const handleDateChange = (selectedOption: any | null) => {
      setDate(selectedOption);
    };

    const checkHours = async (sportCenter: any, date: any) => {
      setSelectedHours([])
      const dateS = date ? new Date(date.getTime()) : null;
      if (dateS) {
        dateS.setUTCDate(dateS.getUTCDate() + 1);
      }
      const formattedDate = dateS ? dateS.toISOString().substring(0, 10) : null;
      console.log(formattedDate);
      await getHours({ sporCenter_id: sportCenter.value, date: formattedDate, sport: sport?.value }).then((data) => {
        setHoursMorning(data.morning)
        setHoursAfternoon(data.afternoon)
        setHoursNight(data.night)
      });
    };

    const handleColorChange = (selectedOptions:any) => {
      if (selectedOptions.length <= 2) {
        setColorsM(selectedOptions);
      }
    };

    console.log(price)
    
    const handlePrivate = () => {
      setIsPrivate(!isPrivate)
    }
    
    
    const handlePlayerCountChange = (e:any) => {
      const value = e.target.value;
      setPlayerCount(value);
  
      // Validar el campo playerCount
      if (value.trim() === "") {
        setPlayerCountError("Este campo es obligatorio");
      } else if (parseInt(value) < 1) {
        setPlayerCountError("El número de jugadores por equipo debe ser mayor o igual a 1");
      } else {
        setPlayerCountError("");
      }
    };

    const onSubmit = async(data:Inputs) => {
        if(data.name.length >= 5){       
        const sportS = sport ? sport.label : null;
        const sportCenterS = sportCenter ? sportCenter.label : null;
        const genderS = gender ? gender.value : null;
        const difficultyS = difficulty ? difficulty.value : null;

        if (playerCount.trim() === "") {
          setPlayerCountError("Este campo es obligatorio");
          return;
        }

        const fk_difficulty = {
          type: difficultyS
        }

        const fk_sex = {
          gender: genderS
        }

        const fk_sport = {
          name: sportS
        }

        const fk_sportcenter = {
          name: sportCenterS
        }

        const start = selectedHours.length > 0 ? selectedHours[0] : null;
        const end = selectedHours.length > 0 ? selectedHours[selectedHours.length - 1] : null;
      
        const dateS = date ? new Date(date.getTime()) : null;
        if (dateS) {
          dateS.setUTCDate(dateS.getUTCDate() + 1);
          console.log(dateS)
        }  
        console.log(start, end)
        await createReservedAndEvent({name: data.name, details: data.details, price, date: dateS || new Date(),  is_private:isPrivate, number_players:parseInt(playerCount), fk_difficulty, fk_person:user.uuid, fk_sex, fk_sport, fk_teamcolor:colorsM[0].label, fk_teamcolor_two:colorsM[1].label, sportCenter:sportCenter?.value, fk_sportcenter, start, end })
        }
      };

    const onNavigateBack = () => {
      navigate(-1)
    }

    const handlePrice = () => {
      setPrice(selectedHours.length * sportCenterPrice / (Number(playerCount) * 2))
    }

    const isWeekday = (date:any) => {
      const day = date.getDay();
      return day >= 1 && day <= 5; // 1 es lunes, 5 es viernes
    };

    return (
    <>
    <Navbar />
        <div className='relative w-full h-60'>
            <img src={wallpaper} className='absolute top-0 left-0 w-full h-full object-cover object-center' style={{ objectPosition: '20% 50%' }} />
            <div className='absolute top-4 left-3 w-10 h-10 flex items-center justify-center bg-white opacity-80 cursor-pointer  rounded-full'  onClick={onNavigateBack}>
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
                                  <label
                                      htmlFor="email"
                                      className="block text-md text-primary font-bold capitalize"
                                  >
                                      Polideportivo
                                  </label>
                                  <ReactSelect
                                  options={sportCenterOptions}
                                  id="sport"
                                  value={sportCenter}
                                  required
                                  onChange={SportCenterSport}
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
                                  <ReactSelect
                                  options={sports}
                                  id="sport"
                                  value={sport}
                                  required
                                  onChange={handleSportChange}
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
                                  <DatePicker
                                    selected={date}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    required
                                    className=" block w-full px-3 py-2 mt-2 text-white bg-fondo placeholder-white border-b-2 border-gray-200  focus:border-primary focus:outline-none "
                                    placeholderText='Seleccione la fecha'
                                    locale={es}
                                    minDate={new Date()}
                                    filterDate={isWeekday}
                                  />
                              </div>
                              <div className="mt-4">
                              <label htmlFor="email" className="block text-md text-primary font-bold flex">
                                Hora
                                <button type="button" className="ml-auto px-2 py-1 text-sm text-black bg-white rounded-full" onClick={() => setSelectedHours([])}>Reiniciar horas seleccionadas</button>
                              </label>
                                    <h1 className="text-lg text-white pt-2 pb-1 ml-2">Mañana</h1>
                                    <hr className=" border-gray-400 ml-2" />
                                    <div className="flex flex-wrap mt-2 pl-2">
                                    {hoursMorning.map((hour: any) => (
                                    <span
                                      className={`font-medium cursor-pointer rounded-full py-1 px-3 mr-2 mb-2 ${
                                        selectedHours.includes(hour.hour) ? 'bg-primary' : 'bg-white'
                                      } ${hour.isAvailable === false ? 'opacity-50' : ''}`}
                                      aria-disabled={!hour.isAvailable}
                                      onClick={() => {
                                        if (hour.isAvailable) {
                                          handleHourClick(hour.hour);
                                        }
                                      }}
                                    >
                                      {hour.hour}
                                    </span>
                                  ))}
                                    </div>
                                    <h1 className="text-lg text-white pt-2 pb-1 ml-2">Tarde</h1>
                                    <hr className=" border-gray-400 ml-2" />
                                    <div className="flex flex-wrap mt-2 pl-2">
                                      {hoursAfternoon.map((hour:any) => (
                                        <span
                                        className={`font-medium cursor-pointer rounded-full py-1 px-3 mr-2 mb-2 ${
                                          selectedHours.includes(hour.hour) ? 'bg-primary' : 'bg-white'
                                        } ${hour.isAvailable === false ? 'opacity-50' : ''}`}
                                        aria-disabled={!hour.isAvailable}
                                        onClick={() => {
                                          if (hour.isAvailable) {
                                            handleHourClick(hour.hour);
                                          }
                                        }}
                                      >
                                        {hour.hour}
                                      </span>
                                      ))}
                                    </div>
                                    <h1 className="text-lg text-white pt-2 pb-1 ml-2">Noche</h1>
                                    <hr className=" border-gray-400 ml-2" />
                                    <div className="flex flex-wrap mt-2 pl-2">
                                      {hoursNight.map((hour:any) => (
                                       <span
                                       className={`font-medium cursor-pointer rounded-full py-1 px-3 mr-2 mb-2 ${
                                         selectedHours.includes(hour.hour) ? 'bg-primary' : 'bg-white'
                                       } ${hour.isAvailable === false ? 'opacity-50' : ''}`}
                                       aria-disabled={!hour.isAvailable}
                                       onClick={() => {
                                         if (hour.isAvailable) {
                                           handleHourClick(hour.hour);
                                         }
                                       }}
                                     >
                                       {hour.hour}
                                     </span>
                                      ))}
                                    </div>
                                    <p className="flex flex-wrap pt-2">
                                      <h1 className="bg-white rounded-full p-2"></h1>            <h1 className="text-white font-n27 px-2">Disponible</h1>
                                      <h1 className="bg-primary rounded-full p-2"></h1>          <h1 className="text-white font-n27 px-2">Elegido</h1>
                                      <h1 className="bg-white opacity-50 rounded-full p-2"></h1> <h1 className="text-white font-n27 px-2">Ocupado</h1>
                                    </p>
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
                                  {!isNaN(price) && isFinite(price) && (
                                    <div className="flex items-center pt-6">
                                      <div className="p-3 bg-white rounded-lg">
                                        <h1 className="text-xl">Precio por persona / <span className="font-bold">{price}€</span></h1>
                                      </div>
                                    </div>
                                  )}

                              <div className="flex items-center pt-6">
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
                              <button type="submit" className="bg-primary px-4 py-2 mt-4 rounded-md hover:bg-lime-500">
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