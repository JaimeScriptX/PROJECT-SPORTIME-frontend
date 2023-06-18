import React from 'react'
import flecha from '../../assets/images/Arrow.svg'
export const SportCenterCard = ({id, image, name, address, municipality}:{id:string, image:string, name:string, address:string, municipality:string}) => {
  
  const nombreClase = name.length >= 35 ? "h-14" : "h-8";
  const direccionCompleta = `${address}, ${municipality}`;

  return (
    <> 
        <a className="relative" href={`/centro-deportivo/${id}`}>
            <img className="h-56 mb-10 absolute rounded-bl-3xl rounded-br-3xl rounded-r-3xl object-cover" style={{width: '23rem'}} src={image} />
            <div className="relative mt-48 mb-12 w-96 rounded-tr-3xl">
            <div className="w-64 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
          {address.length >= 30 ? (
            <p className="pl-5 w-full font-n27 text-gray-300">{direccionCompleta}</p>
          ) : (
            <p className="pl-5 w-full font-n27 text-gray-300">{address},<br/>{municipality}</p>
          )}
        </div>
            <div className={`w-64 ${nombreClase} flex items-center absolute left-0 bottom-16 rounded-tr-3xl bg-white`}>
                <p className="absolute text-left pl-2 text-black font-n27">{name}</p>
            </div>
            </div>
            <button className="w-20 h-20 absolute rounded-3xl bg-primary flex items-center justify-center" style={{ right: '27px', top:'12.5rem' }}>
            <img src={flecha}/>
            </button>
        </a>
    </>
  )
}
