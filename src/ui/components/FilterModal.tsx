import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReactSelect  from 'react-select';
import es from 'date-fns/locale/es';
import { useSearchStore } from "../../hooks/useSearchStore";
import { useLocation, useNavigate } from "react-router-dom";

const sportOptions:Array<any> = [
  { value: '', label: 'Deporte' },
  { value: 'baloncesto', label: 'Baloncesto' },
  { value: 'futbol', label: 'Fútbol' },
  { value: 'futbol sala', label: 'Fútbol sala' },
  { value: 'padel', label: 'Pádel' },
  { value: 'tenis', label: 'Tenis' }
];

const hourPlaceholderOption = { value: '', label: 'Hora' };

interface Select {
  value: string;
  label: string;
}

export const FilterModal = ({ closeModal , searchN }:{closeModal:any, searchN:string}) => {
  const { getSearch } = useSearchStore();
  const history = useNavigate();

  const location = useLocation();
  const searchData = location.state?.search;
  const sportData = location.state?.sport;
  const selectedDateData = location.state?.selectedDate;
  const selectedHourData = location.state?.selectedHour;
  const hourOptionsData = location.state?.hourOptions;

  const [search, setSearch] = useState(searchN || searchData)
  const [sport, setSport] = useState<Select | null>(null || sportData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null || selectedDateData);
  const [selectedHour, setSelectedHour] = useState<Select | null>(null || selectedHourData);
  const [hourOptions, setHourOptions] = useState<Array<Select>>([] || hourOptionsData);

  const handleOverlayClick = (event:any) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const generateHourOptions = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const options:any = [];

      if (selectedDate && selectedDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)) {
        for (let hour = currentHour + 1; hour < 24; hour++) {
          options.push({
            value: hour.toString(),
            label: `${hour.toString().padStart(2, '0')}:00`,
          });
        }
      } else {
        for (let hour = 0; hour < 24; hour++) {
          options.push({
            value: hour.toString(),
            label: `${hour.toString().padStart(2, '0')}:00`,
          });
        }
      }

      return options;
    };
    const options = generateHourOptions();
    setHourOptions([hourPlaceholderOption, ...options]);
  }, [selectedDate]);

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
    setSelectedHour(null);
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    const sportS = sport ? sport.value : null;
    const dateS = selectedDate ? new Date(selectedDate.getTime()) : undefined;
    if (dateS) {
      dateS.setUTCDate(dateS.getUTCDate() + 1);
    }  
    let timeString = ""
    if (selectedHour && selectedHour.label) {
      const timeParts = selectedHour.label.split(':');
      const hour = parseInt(timeParts[0]);
      const minute = parseInt(timeParts[1]);
      
      const selectedDateTime = new Date();
      selectedDateTime.setHours(hour);
      selectedDateTime.setMinutes(minute);
      timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      console.log(timeString)
    }
    const time = timeString.length === 0 ? undefined : timeString
    
      try {
        const searchData = await getSearch({search, date: dateS, sport:sportS || "", time:time});
        history("/search", { state: { searchData, sport, selectedDate, selectedHour, hourOptions } });
        closeModal()
      } catch (error) {
        console.error(error);
        // Manejar el error de búsqueda
      }

  };



  return (
<div className="fixed mt-16 inset-0 items-center justify-center z-50 bg-fondo bg-opacity-60" onClick={handleOverlayClick}>
      <div className="bg-white px-10 pt-3 pb-5 rounded-b-xl">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <form onSubmit={handleSubmit}>  
        <div className="mb-4">
          <label htmlFor="deporte" className="mr-2">
            Buscar:
          </label><br/>
          <input name="search" value={search} onChange={(e) => setSearch(e.target.value)} className=" border-gray-300 text-white placeholder:text-white bg-portada mt-2 pl-2 py-2 rounded-sm  w-full" placeholder="Dirección, centro deportivo, ciudad..."/>
        </div>

        <div className="mb-4">
          <label htmlFor="deporte" className="mr-2">
            Deporte:
          </label>
          <ReactSelect
            options={sportOptions}
            id="sport"
            value={sport}
            onChange={setSport}
            placeholder={sportOptions[0].label}
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
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className=" border-gray-300 text-white placeholder:text-white bg-portada mt-2 pl-2 py-2 rounded-sm  w-full"
            placeholderText='Fecha'
            locale={es}
            minDate={new Date()}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hora" className="mr-2">
            Hora:
          </label>
          <ReactSelect
          options={hourOptions}
          value={selectedHour}
          onChange={setSelectedHour}
          placeholder={hourPlaceholderOption.label}
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

        <div className="flex ">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-lime-500 text-black font-semibold py-2 px-4 rounded-md"
            >
            Buscar
          </button>
        </div>
        </form>
      </div>
    </div>
)}
