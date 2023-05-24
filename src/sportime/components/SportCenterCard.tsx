import React from 'react'
import flecha from '../../assets/images/Arrow.svg'
export const SportCenterCard = ({name, direccion}:{name:string, direccion:string}) => {
  return (
    <> 
        <a className="relative" href="/centro-deportivo">
            <img className="h-56 mb-10 absolute rounded-bl-3xl rounded-br-3xl rounded-r-3xl object-cover" style={{width: '23rem'}} src="https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg" />
            <div className="relative mt-48 mb-12 w-96 rounded-tr-3xl">
            <div className="w-64 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
                <p className="pl-5 w-full font-n27 text-gray-300">{direccion}</p>
            </div>
            <div className="w-64 h-8 flex items-center absolute left-0 top-0 rounded-tr-3xl bg-white">
                <p className="absolute text-center pl-2 text-black font-n27">{name}</p>
            </div>
            </div>
            <button className="w-20 h-20 absolute rounded-3xl bg-primary flex items-center justify-center" style={{ right: '27px', top:'12.5rem' }}>
            <img src={flecha}/>
            </button>
        </a>
    </>
  )
}
