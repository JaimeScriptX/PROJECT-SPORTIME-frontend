import { useEffect, useState } from 'react';
import Select  from 'react-select';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import "../../assets/css/datepicker.css"

const sportOptions:Array<any> = [
  { value: 'Baloncesto', label: 'Baloncesto' },
  { value: 'Futbol', label: 'Fútbol' },
  { value: 'Futbol sala', label: 'Fútbol sala' },
  { value: 'Padel', label: 'Pádel' },
  { value: 'Tenis', label: 'Tenis' }
];

export const Search = () => {

  const [sport, setSport] = useState<Select | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<Select | null>(null);
  const [hourOptions, setHourOptions] = useState([]);

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
    setSelectedHour(null);
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
    setHourOptions(options);
  }, [selectedDate]);
  return (

<form className="bg-white px-3 flex items-center justify-between border border-gray-300 rounded-full">
  <label className="text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
  <div className="relative flex flex-row items-center">
    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </div>
    <input type="search" className="py-4  pl-6 text-md text-black bg-transparent focus:ring-none focus:outline-none  dark:bg-transparent dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-none" placeholder="Dirección, centro de..." required/>
    <Select
      options={sportOptions}
      id="sport"
      value={sport}
      required
      onChange={setSport}
      placeholder="Deporte"
      className="text-lg border-x-2 focus:outline-none"
      styles={{
        control: (provided) => ({
          ...provided,
          height: '43px',
          width: '150px',
          border: '0px',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
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
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className=" border-gray-300 pl-2 py-2 w-32"
        placeholderText='Fecha'
        locale={es}
        minDate={new Date()}
      />
      <Select
          options={hourOptions}
          value={selectedHour}
          onChange={setSelectedHour}
          placeholder="Hora"
          className=" ml-2 text-lg border-l-2 focus:outline-none"
          styles={{
            control: (provided) => ({
              ...provided,
              height: '43px',
              width: '120px',
              border: '0px',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
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
    <button type="submit" className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-primary dark:hover:bg-lime-400 dark:focus:ring-blue-800">Buscar</button>
  </div>
</form>

  )
}