import { useState } from "react";
import { CircularProgress } from "../sportsCenter/components/CircularProgress"
import { Link } from "react-router-dom";

export const EventCard = ({id, deporte, hora, fecha, nivel, genero, jugadores, nombre, centroDeportivo, total, plazas }:
    {id: number, deporte:string, hora:string, fecha:string, nivel:string, genero:string, jugadores:number, nombre:string, centroDeportivo:string, total:number, plazas:number}) => {

    const plazasOcupadas = plazas
    const [progress, setProgress] = useState(plazasOcupadas);

    const nombreClase = nombre.length >= 35 ? "h-14" : "h-8";
  return (
    <a className="relative" href={`/evento/${id}`}>
    <div className="flex items-center justify-center gap-10 md:gap-20 max-sm:pt-1 pt-1 bg-primary">
      <p className="font-n27">{deporte}</p>
      <p className="font-n27">{hora}</p>
      <p className="font-n27">{fecha}</p>
    </div>
    <img className="md:w-96 w-80 md:h-56 h-52 mb-10 absolute rounded-bl-3xl rounded-br-3xl object-cover" src="https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg" />
    <div className="relative md:mt-28 mt-44 mb-12 md:w-96 w-80 rounded-tr-3xl">
      <div className="hidden md:flex md:w-60 w-56 h-10  items-center absolute left-0 bg-opacity-80 rounded-br-3xl bg-gray-200" style={{bottom:'4.5rem'}} >
        <p className="absolute text-left pl-2 text-black font-n27" style={{fontSize:'12px'}}>{centroDeportivo}</p>
      </div>
      <div className="md:hidden md:w-60 w-56 h-10 flex items-center absolute left-0 bg-opacity-80 rounded-br-3xl bg-gray-200" style={{bottom:'8.5rem'}} >
        <p className="absolute text-left pl-2 text-black font-n27" style={{fontSize:'12px'}}>{centroDeportivo}</p>
      </div>
    </div>
    <div className="relative md:mt-48 mt-44 mb-12 md:w-96 w-80 rounded-tr-3xl">
      <div className="md:w-64 w-52 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
        <p className="pl-6 max-md:pt-1 w-full text-sm md:text-base font-n27 text-gray-300" style={{fontSize:''}}>Nivel: {nivel}</p>
        <p className="md:pr-20 pr-16 text-sm md:text-base font-n27 text-gray-300">Género: {genero}</p>
        <p className="absolute max-md:pt-1 text-xl translate-x-16 md:translate-x-20 md:text-2xl text-gray-300 top-11">{jugadores} VS {jugadores}</p>
      </div>
      <div className={`md:w-64 w-52 ${nombreClase} flex items-center absolute left-0 bottom-16 rounded-tr-3xl bg-white`}>
        <p className="absolute text-left pl-1 pr-1 text-sm md:text-base text-black font-n27">{nombre}</p>
      </div>
    </div> 
    <div className="md:w-20 w-14 h-20 absolute md:top-56 max-md:top-52" style={{ right: '2rem' }}> 
      <CircularProgress value={progress} total={total}/>
    </div>
  </a>
  )
}
