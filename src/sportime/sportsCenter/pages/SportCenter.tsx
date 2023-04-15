import { Footer, Navbar } from "../../../ui"
import PadelIcon from '../../../assets/images/PadelIcon.png'
import FutbolIcon from '../../../assets/images/iconFutbol.svg'
import BaloncestoIcon from '../../../assets/images/iconBaloncesto.svg'
import TenisIcon from '../../../assets/images/iconTenis.svg'
import FutbolSalaIcon from '../../../assets/images/iconFutbolSala.svg'
import ComollegarIcon from '../../../assets/images/iconComollegar.svg'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Map } from "../../events/components/Map"
import { useState } from "react"
import { CircularProgress } from "../components/CircularProgress"

export const SportCenter = () => {

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
            <div className='relaive absolute top-4 right-3 '>
                <button type="button" className=" px-2 py-2 rounded-full bg-white opacity-80 relative"  onClick={handleDireccion}>
                    <img src={ComollegarIcon} />
                </button>
            </div>
        </div>
        <div className="bg-footer">     
        <div className='bg-fondo rounded-t-3xl relative mx-36 max-md:mx-0' style={{ marginTop: '-60px' }}>
            <div className='pl-5'>
                <div className="flex items-center justify-between py-3">
                    <div>
                        <h1 className="pt-5 text-white text-2xl font-n27">Polideportivo municipal de Archena</h1>
                        <h6 className="text-white">Av. del Río Segura, 30600 Archena, Murcia</h6>
                    </div>
                    <button className="px-3 py-3 mr-6 max-md:mr-2 bg-primary rounded-3xl text-lg font-n27">Reservar</button>
                </div>
                <hr className='mr-5 mt-3 opacity-5'/>
                <h1 className="text-primary text-lg font-n27 pt-2">Información</h1>

                <p className="text-white pt-2 mr-2 xl:mr-96">El Polideportivo Municipal de Archena es un complejo deportivo situado en la ciudad de Archena, en la Región de Murcia, España. 
                Cuenta con una amplia variedad de instalaciones deportivas, incluyendo pistas de tenis, pádel, baloncesto, fútbol sala, voleibol, atletismo, piscinas cubiertas y descubiertas, y un gimnasio. Además, el polideportivo ofrece servicios de entrenamiento personalizado, clases colectivas y actividades para niños. 
                Es un espacio muy utilizado por los residentes de Archena y sus alrededores para la práctica de deportes y actividades físicas.</p>
                <hr className='mr-5 mt-3 opacity-5'/>
                <h1 className="text-lg text-primary text-lg font-n27 pt-2">Deportes disponibles</h1>
                <div className="flex flex-wrap mt-2 gap-2">
                    <span className="bg-primary text-black font-medium rounded-full py-1 px-3 mr-2 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={FutbolIcon}width={'25px'} className="mr-2"/><h1>Fútbol</h1>
                    </span>
                    <span className="bg-primary text-black font-medium rounded-full py-1 px-3 mr-2 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={TenisIcon} width={'25px'} className="mr-2"/><h1>Tenis</h1>
                    </span>
                    <span className="bg-primary text-black font-medium rounded-full py-1 px-5 mr-2 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={PadelIcon} width={'25px'} className="mr-2"/><h1>Padel</h1>
                    </span>
                    <span className="bg-primary text-black font-medium rounded-full py-1 px-3 mr-2 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={FutbolSalaIcon} width={'25px'} className="mr-2"/><h1>Fútbol Sala</h1>
                    </span>
                    <span className="bg-primary text-black font-medium rounded-full py-1 px-3 mr-2 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={BaloncestoIcon} width={'25px'} className="mr-2"/><h1>Baloncesto</h1>
                    </span>
                </div>
                <hr className='mr-5 mt-3 opacity-5'/>
                <h1 className="text-primary text-lg font-n27 pt-2 pb-2">Galería</h1>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="mr-5"
                    containerClass=""
                    dotListClass=""
                    draggable
                    autoPlay
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 1
                        },
                        mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1
                        },
                        tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 1
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable 
                    >
                    <img
                        src="https://laguiaw.com/upload/servicios_91625_1260375474.jpg"
                        style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%',
                        objectFit: 'cover',
                        maxHeight: '500px'
                        }}
                    />
                    <img
                        src="https://laguiaw.com/upload/servicios_91625_1260375469.jpg"
                        style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%',
                        objectFit: 'cover',
                        maxHeight: '500px'
                        }}
                    />
                    <img
                        src="https://www.archena.es/images/2018/08/10/38790767_1037417243094471_4226241303798611968_n.jpg"
                        style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%',
                        objectFit: 'cover',
                        maxHeight: '500px'
                        }}
                    />
                </Carousel>
                <hr className='mr-5 mt-3 opacity-5'/>
                <h1 className='text-primary text-lg font-n27 pt-2 pb-2'>Lugar</h1>
                <Map />
            </div>    
        </div>
        </div>  
        <Footer />
    </> 
  )
}
