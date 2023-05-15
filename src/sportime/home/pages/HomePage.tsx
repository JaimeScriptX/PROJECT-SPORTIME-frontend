
import { SearchHome } from "../components"
import '../../../assets/css/home.css'
import Futbol from '../../../assets/images/Futbol.svg'
import Baloncesto from '../../../assets/images/Baloncesto.svg'
import Tenis from '../../../assets/images/Tenis.svg'
import FutbolSala from '../../../assets/images/FutbolSala.svg'
import Padel from '../../../assets/images/Padel.svg'
import flecha from '../../../assets/images/Arrow.svg'
import sportime from '../../../assets/images/logo.svg'


import { SearchMobile } from "../../../ui/components/SearchMobile"
import { CircularProgress } from "../../sportsCenter/components/CircularProgress"
import { useEffect, useRef, useState } from "react"
import { NavbarHome } from "../components/NavbarHome"
import { EventCard } from "../../components"
import { useEventStore } from "../../../hooks/useEventStore"
import { NavbarBottom } from "../components/NavbarBottom"


interface initialState {
  id: number,
  name: string,
  is_private: boolean,
  details: string,
  price: number,
  date: {
      date: string,
  },
  time: {
      date: string,
  },
  duration: {
      date: string,
  },
  number_players: number,
  sport_center_custom: string,
  fk_sportcenter_id:{
    id: number,
    fk_services_id: {
        id: number,
        type: string
    },
    name:string,
    municipality: string,
    address: string,
    image: null,
    phone: string
  },
  fk_sports_id: {
      id: number,
      name: string,
      need_team: boolean,
      image: null
  },
  fk_difficulty_id: {
      id: number,
      type: string
  },
  fk_sex_id: {
      id: number,
      gender: string
  },
  fk_person_id: {
      id: number,
      image_profile: null,
      name: string,
      last_name: string,
      birthday: {
          date: string,
      },
      weight: number,
      geight: number,
      nationality: string,
      fk_sex_id: {
          id: number,
          gender: string
      },
      fk_teamcolor_id: {
          id: number,
          team_a: string,
          team_b: string
      }
  },
}

const formatTime = (dateString:any) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const formatearFecha = (fecha:string) => {
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate();
  const mes = fechaObj.getMonth() + 1;
  const anio = fechaObj.getFullYear();
  return `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${anio}`;
}

export const HomePage = () => {

  const {getEvents} = useEventStore()
  const [events, setEvents] = useState<Array<initialState>>(Array)
  const eventListRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(8);
  const total = 10;

  const eventPromise = async () => {
    await getEvents().then((data) => {
      setEvents(data);
    })}

  useEffect(() => {

    eventPromise()

  }, [])
  
  const scrollToLeft = () => {
    if (eventListRef.current) {
      eventListRef.current.scrollLeft -= 150;
    }
  };

  const scrollToRight = () => {
    if (eventListRef.current) {
      eventListRef.current.scrollLeft += 150;
    }
  };

  return (
    <>
        <NavbarHome />
        <NavbarBottom />
        <section className="bg-portada flex flex-col sm:flex-row items-center py-10 pb-20">
          <div className="w-full sm:w-3/4">
            <div className="mx-4 sm:mx-20 mb-8">
              <div className="ml-4 sm:ml-35 mr-4 sm:mr-20">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-inter mb-8">Encuentra y crea eventos <br />deportivos en comunidad, <br />¡únete ahora!</h1>
                <h5 className="text-xl sm:text-2xl text-white mr-8 sm:mr-95 font-n27 sm:w-3/4 ">¿Te apasiona el deporte y quieres conectar con otros apasionados como tú? Únete a nuestra comunidad en línea y descubre cómo puedes crear y participar en actividades deportivas en tu zona.</h5>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/4 relative flex justify-center items-center sm:ml-0">
            <p className="text-10xl leading-none font-gries bg-clip-text text-transparent" style={{backgroundImage: `url('https://murciaplaza.com/public/Image/2023/4/RealMurcia-Cornell%C3%A0-F%C3%BAtbol27_forCrop.jpg')`}}>
              <span>
                <span>SP</span>
              </span>
              <br/>
              <span>
                <span>OR</span>
              </span>
              <br/>
              <span>
                <span>TI</span>
              </span>
              <br/>
              <span>
                <span>ME</span>
              </span>
            </p>
          </div>
        </section>
        <section id="my-section-desktop" className="absolute 2xl:left-2/4  align-middle transform -translate-x-1/2 -translate-y-1/2 hidden lg:inline-block">
          <SearchHome />
        </section>
        <section id="my-section-mobile" className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:hidden w-full px-5">
          <SearchMobile />
        </section>
        <section className="bg-fondo pattern">
          <h1 className="pt-20 md:pl-28 pl-10 text-4xl font-n27 text-white lg:text-5xl">Últimos eventos</h1>
          <div className="relative pb-12">
             <div className="scrollbar-hide flex w-full md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" ref={eventListRef}>
              {events.map((event:any) =>
               <EventCard id={event.id} deporte={event.fk_sports_id.name} genero={event.fk_sex_id.gender} nivel={event.fk_difficulty_id.type} jugadores={event.number_players} total={event.missing_players} plazas={event.players_registered} hora={formatTime(event.time.date)} fecha={formatearFecha(event.date.date)} nombre={event.name} centroDeportivo={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
              )}
              </div>
              <button
                className="absolute top-4/4 top-44  transform -translate-y-1/2  left-10 text-white text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center shadow-md transition duration-300 font-n27"
                onClick={scrollToLeft}
              >
                &lt;
              </button>
              <button
                className="absolute top-4/4 top-44 transform -translate-y-1/2 right-2 text-white text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center shadow-md transition duration-300 font-n27"
                onClick={scrollToRight}
              >
                &gt;
              </button>
           </div>
        </section>
        <section className="bg-fondo pattern2">
          <h1 className="pt-14 md:pl-28 pl-10 text-4xl font-n27 text-white lg:text-5xl">Buscar por deporte</h1>
            <div className="relative pb-20">
              <div className="scrollbar-hide flex w-full md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth">
                <img src={Futbol} width={'375'}/>
                <img src={Baloncesto} width={'375'}/>
                <img src={Tenis} width={'375'}/>
                <img src={FutbolSala} width={'375'}/>
                <img src={Padel} width={'375'} />         
              </div>
            </div>
        </section>
        <section className="bg-fondo pattern pb-5">
          <h1 className="pt-14 md:pl-28 pl-10 text-4xl font-n27 text-white lg:text-5xl">Los centros deportivos más buscados de Murcia</h1>
            <div className="relative pb-20">
                <div className="scrollbar-hide flex w-full md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth">

                    <a className="relative" href="/centro-deportivo">
                      <img className="h-56 mb-10 absolute rounded-bl-3xl rounded-br-3xl rounded-r-3xl object-cover" style={{width: '23rem'}} src="https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg" />
                      <div className="relative mt-48 mb-12 w-96 rounded-tr-3xl">
                        <div className="w-64 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
                          <p className="pl-5 w-full font-n27 text-gray-300">Av. del Río Segura, <br/>30600 Archena, Murcia</p>
                        </div>
                        <div className="w-64 h-8 flex items-center absolute left-0 top-0 rounded-tr-3xl bg-white">
                          <p className="absolute text-center pl-2 text-black font-n27">Ciudad deportiva “El Romeral”</p>
                        </div>
                      </div>
                      <button className="w-20 h-20 absolute rounded-3xl bg-primary flex items-center justify-center" style={{ right: '27px', top:'12.5rem' }}>
                        <img src={flecha}/>
                      </button>
                    </a>

                    <a className="relative" href="/centro-deportivo">
                      <img className="h-56 mb-10 absolute rounded-bl-3xl rounded-br-3xl rounded-r-3xl object-cover" style={{width: '23rem'}} src="https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg" />
                      <div className="relative mt-48 mb-12 w-96 rounded-tr-3xl">
                        <div className="w-64 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
                          <p className="pl-5 w-full font-n27 text-gray-300">Av. del Río Segura, <br/>30600 Archena, Murcia</p>
                        </div>
                        <div className="w-64 h-8 flex items-center absolute left-0 top-0 rounded-tr-3xl bg-white">
                          <p className="absolute text-center pl-2 text-black font-n27">Ciudad deportiva “El Romeral”</p>
                        </div>
                      </div>
                      <button className="w-20 h-20 absolute rounded-3xl bg-primary flex items-center justify-center" style={{ right: '27px', top:'12.5rem' }}>
                        <img src={flecha}/>
                      </button>
                    </a>

                    <a className="relative" href="/centro-deportivo">
                      <img className="h-56 mb-10 absolute rounded-bl-3xl rounded-br-3xl rounded-r-3xl object-cover" style={{width: '23rem'}} src="https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg" />
                      <div className="relative mt-48 mb-12 w-96 rounded-tr-3xl">
                        <div className="w-64 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
                          <p className="pl-5 w-full font-n27 text-gray-300">Av. del Río Segura, <br/>30600 Archena, Murcia</p>
                        </div>
                        <div className="w-64 h-8 flex items-center absolute left-0 top-0 rounded-tr-3xl bg-white">
                          <p className="absolute text-center pl-2 text-black font-n27">Ciudad deportiva “El Romeral”</p>
                        </div>
                      </div>
                      <button className="w-20 h-20 absolute rounded-3xl bg-primary flex items-center justify-center" style={{ right: '27px', top:'12.5rem' }}>
                        <img src={flecha}/>
                      </button>
                    </a>

                    <div className="relative">
                      <img className="h-56 mb-10 absolute rounded-bl-3xl rounded-br-3xl rounded-r-3xl object-cover" style={{width: '23rem'}} src="https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg" />
                      <div className="relative mt-48 mb-12 w-96 rounded-tr-3xl">
                        <div className="w-64 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
                          <p className="pl-5 w-full font-n27 text-gray-300">Av. del Río Segura, <br/>30600 Archena, Murcia</p>
                        </div>
                        <div className="w-64 h-8 flex items-center absolute left-0 top-0 rounded-tr-3xl bg-white">
                          <p className="absolute text-center pl-2 text-black font-n27">Ciudad deportiva “El Romeral”</p>
                        </div>
                      </div>
                      <button className="w-20 h-20 absolute rounded-3xl bg-primary flex items-center justify-center" style={{ right: '27px', top:'12.5rem' }}>
                        <img src={flecha}/>
                      </button>
                    </div>

                    <div className="relative">
                      <img className="h-56 mb-10 absolute rounded-bl-3xl rounded-br-3xl rounded-r-3xl object-cover" style={{width: '23rem'}} src="https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg" />
                      <div className="relative mt-48 mb-12 w-96 rounded-tr-3xl">
                        <div className="w-64 h-24 bg-card-secondary rounded-tr-3xl rounded-bl-3xl flex items-center justify-between flex-col py-10">
                          <p className="pl-5 w-full font-n27 text-gray-300">Av. del Río Segura, <br/>30600 Archena, Murcia</p>
                        </div>
                        <div className="w-64 h-8 flex items-center absolute left-0 top-0 rounded-tr-3xl bg-white">
                          <p className="absolute text-center pl-2 text-black font-n27">Ciudad deportiva “El Romeral”</p>
                        </div>
                      </div>
                      <button className="w-20 h-20 absolute rounded-3xl bg-primary flex items-center justify-center" style={{ right: '27px', top:'12.5rem' }}>
                        <img src={flecha}/>
                      </button>
                    </div>
                </div>
            </div>

            <section className="bg-portada mx-4">
              <div className="max-w-lg bg-portada px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center">
              <h1 className="text-3xl font-extrabold leading-10 tracking-tight text-left text-white text-center sm:leading-none md:text-6xl text-4xl lg:text-7xl">
              <span className="inline md:block">Haz deporte</span>
              <span className="mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block">
              {" "}
              con<span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300"> nosotros</span>{" "}
              </span>
              </h1>
              <div className="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 md:max-w-lg text-center lg:text-lg">
              <button className="bg-tkb border text-sm text-white py-3 px-7 rounded-full">
              Unete a la comunidad
              </button>
              </div>
              </div>
            </section>
            
            <hr className="text-white  mx-4" />

            <footer className="bg-portada pb-5  mx-4">
              <div className="max-w-screen-xl pt-4 mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="flex justify-center text-teal-300 sm:justify-start">
                    <img className="" src={sportime} width="150" height="80" />
                  </div>

                  <p className="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
                    Derechos reservados por IES JOSE PLANES
                  </p>
                </div>
              </div>
            </footer>
        </section>
    </>
    
  )
}
