import { Footer, Navbar } from '../../../ui'
import tenis from '../../../assets/images/tenis.webp'
import FutbolIcono from '../../../assets/images/IconoFutbol.svg'
import RelojIcono from '../../../assets/images/IconoReloj.svg'
import UbicacionIcono from '../../../assets/images/IconUbicacion.svg'
import EnviarUbicacionIcono from '../../../assets/images/IconoEnviarUbicacion.svg'
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from '../components/Map';
import { useState } from 'react'
import { ModalInfo } from '../components/ModalInfo'
import { ModalElegir } from '../components/ModalElegir'
export const EventPage = () => {

  const handleDireccion = (event:any) => {
    event.preventDefault();
  // Cambiar estos valores para cambiar el destino
    const latitud =  38.12307365189082;
    const longitud = -1.2958321246706506;
    const destino = 'Pabellón municipal de deportes, Archena, Murcia';
    // Construir la cadena de texto utilizando el protocolo "geo:" y la latitud y longitud del destino, junto con el parámetro "q" para especificar la dirección, y "saddr" para la ubicación actual del usuario
    const geoLink = `geo:0,0?q=${encodeURIComponent(destino)}&saddr=${latitud},${longitud}`;
    const geoLinkApple =`https://maps.apple.com/place?ll=${latitud}%2C${longitud}`;
    // Verificar si la aplicación se está ejecutando en un dispositivo móvil
    
    if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
      window.open(geoLinkApple, '_blank');
    }
    
    if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Abrir la aplicación de mapas predeterminada en el dispositivo móvil y mostrar la ruta desde la ubicación actual del usuario hasta el destino personalizado
      window.location.href = geoLink;
    }
    else {
      // Abrir el mapa en una nueva ventana cuando la aplicación se esté ejecutando en un dispositivo de escritorio
      window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}&travelmode=driving`;
    }
  }

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalElegir, setShowModalElegir] = useState(false);

  const openModal = () => {
    setShowModalInfo(true);
  };

  const openModalElegir = () => {
    setShowModalElegir(true);
  };

  const closeModal = () => {
    setShowModalInfo(false);
  };

  const closeModalElegir = () => {
    setShowModalElegir(false);
  };


  return (
    <>
    <Navbar />
    <div className='relative w-full h-80'>
      <img src={'https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg'} className='absolute top-0 left-0 w-full h-full object-cover object-center' style={{ objectPosition: '20% 50%' }} />
    </div>
    <div className='bg-fondo rounded-t-3xl relative' style={{ marginTop: '-60px' }}>
      <div className='pl-5'>
        <div className="flex items-center justify-between py-3">
            <div>
              <h1 className="pt-5 text-white text-2xl font-n27">Ciudad deportiva “El Romeral”</h1>
              <h6 className="text-white">Jose David</h6>
            </div>
            <img src={FutbolIcono} className="pt-6 pr-5"/>
        </div>
        <hr className='mr-5 mt-2 opacity-5 pb-3'/>
        <div className='flex justify-center '>
          <button className='bg-primary text-black font-n27 text-xl p-2 rounded-3xl w-64' onClick={openModalElegir}>Unirse - 2,95€</button>
          {showModalElegir && (
        <ModalElegir onClose={closeModalElegir}/>
      )}
        </div>
        <hr className='mr-5 mt-3 opacity-5'/>
          <div className=" border-gray-200 py-5 pt-6">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
              <div className="text-center border-r pr-5">
                <h6 className="text-lg text-white font-bold lg:text-xl xl:text-xl">5 VS 5</h6>
                <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                    Jugadores
                </p>
              </div>
              <div className="text-center border-r pr-5 pl-2">
                <h6 className="text-lg font-bold text-white lg:text-xl xl:text-xl">Masculino</h6>
                <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                    Género
                </p>
              </div>
              <div className="text-center pl-2">
                <h6 className="text-lg font-bold lg:text-xl xl:text-xl text-white">Intermedia</h6>
                <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                    Dificultad 
                </p>
              </div>
            </div>
          </div>
        <hr className='mr-5 opacity-5 pb-3'/>
        <div className="flex items-center justify-start pb-3">
            <div>
            <h5 className='text-white font-n27'>
        Quedan <b>2</b> plazas libres.{' '}
        <a className='text-primary  cursor-pointer' onClick={openModal}>
          Ver equipos...
        </a>
      </h5>
      {/* Renderiza el componente Modal si showModal es verdadero */}
      {showModalInfo && (
        <ModalInfo onClose={closeModal}/>
      )}
            </div>
        </div>
        <hr className='mr-5 opacity-5 pb-3'/>
        <div className="flex items-center justify-start pb-2">
            <img src={RelojIcono} width={'60'} className="pr-3"/>
            <div>
              <h6 className="text-slate-200 font-n27">Abril 02, 2023</h6>
              <h6 className="text-white text-lg  font-n27">10:30-12:00 PM</h6>
            </div>
        </div>
        <div className="flex items-center justify-start pb-2">
            <img src={UbicacionIcono} width={'60'} className="pr-3"/>
            <div>
              <h6 className="text-slate-200 font-n27">Archena, Murcia</h6>
              <h6 className="text-white text-lg  font-n27">Pabellón municipal de deportes</h6>
            </div>
            <button
      className="flex items-center bg-transparent border-none focus:outline-none mr-5"
      style={{ backgroundImage: `url(${EnviarUbicacionIcono})`, backgroundSize: 'cover', width: '45px', height: '45px',  marginLeft: 'auto'  }}
      onClick={handleDireccion}
    />
        </div>
        <div className='pt-3 pb-2'>
          <h1 className='text-white text-lg font-n27'>Lugar</h1>
        </div>
        <Map />
      </div>
    </div>

    <Footer />
    </>
  )
}
