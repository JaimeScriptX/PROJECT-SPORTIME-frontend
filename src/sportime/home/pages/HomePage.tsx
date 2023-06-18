
import { SearchHome } from "../components"
import '../../../assets/css/home.css'
import Futbol from '../../../assets/images/Futbol.svg'
import Baloncesto from '../../../assets/images/Baloncesto.svg'
import Tenis from '../../../assets/images/Tenis.svg'
import FutbolSala from '../../../assets/images/FutbolSala.svg'
import Padel from '../../../assets/images/Padel.svg'
import flecha from '../../../assets/images/Arrow.svg'
import sportime from '../../../assets/images/logo.svg'
import portada from '../../../assets/images/Sportime.jpg'
import sportCenterCustom from '../../../assets/images/centro-deportvo-personalizado.jpg'

import { SearchMobile } from "../../../ui/components/SearchMobile"
import { useEffect, useRef, useState } from "react"
import { NavbarHome } from "../components/NavbarHome"
import { EventCard, SportCenterCard } from "../../components"
import { useEventStore } from "../../../hooks/useEventStore"
import { NavbarBottom } from "../components/NavbarBottom"
import { useNavigate } from "react-router-dom"
import { useSearchStore } from "../../../hooks/useSearchStore"
import { useSportCenter } from "../../../hooks/useSportCenter"


interface initialState {
  id: number,
  name: string,
  is_private: boolean,
  details: string,
  price: number,
  date:  string,
  time: string,
  time_end: string,
  duration:  string,
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
  players_registered: number,
  missing_players: number
}

interface initialStateSportCenter {
  id: number,
  name: string,
  municipality: string,
  address: string,
  image: string,
  phone: string,
  image_gallery1: string,
  image_gallery2: string,
  image_gallery3: string,
  image_gallery4: string,
  latitude: null,
  longitude: null,
  destination: null,
  services: [],
  sport: [
      {
          id: number,
          name: string,
          image: string,
          logo_sportcenter: string
      }
  ]
}
export const HomePage = () => {
  const { getSearch } = useSearchStore();
  const {getEventsHome} = useEventStore()
  const {getSportCenters} = useSportCenter()
  const history = useNavigate();

  const [events, setEvents] = useState<Array<initialState>>(Array)
  const [sportCenters, setSportCenters] = useState<Array<initialStateSportCenter>>(Array)
  const eventListRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("")

  const eventPromise = async () => {
    await getEventsHome().then((data) => {
      setEvents(data);
    })}

  const sportCenterPromise = async () => {
    await getSportCenters().then((data) => {
      setSportCenters(data);
    })}

  useEffect(() => {
    eventPromise()
    sportCenterPromise()
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

  const handleSearch = (search:string) => {
    setSearch(search)
  };

  const hanleSearchSport = async (name: string) => {
    const sport = name
    try {
      const searchData = await getSearch({search: undefined, date:undefined, sport, time:undefined});
      history("/search", { state: { searchData, sport } });
    } catch (error) {
      console.error(error);
      // Manejar el error de búsqueda
    }
  }

  return (
    <>
        <NavbarHome />
        <NavbarBottom />
        <div className="bg-portada flex flex-col sm:flex-row items-center py-10 pb-20">
          <div className="w-full lg:w-3/4">
            <div className="mx-4 lg:mx-20 mb-8">
              <div className="ml-4 sm:ml-35 mr-4 sm:mr-20">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white font-inter mb-8">Encuentra y crea eventos <br />deportivos en comunidad, <br />¡únete ahora!</h1>
                <h5 className="text-xl sm:text-2xl text-white mr-8 sm:mr-95 font-n27 sm:w-3/4 ">¿Te apasiona el deporte y quieres conectar con otros apasionados como tú? Únete a nuestra comunidad en línea y descubre cómo puedes crear y participar en actividades deportivas en tu zona.</h5>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/4 relative flex justify-center items-center sm:ml-0">
            <p className="text-9xl lg:text-10xl leading-none font-gries bg-clip-text text-transparent" style={{backgroundImage: `url(${portada})`, backgroundPosition: 'center', backgroundSize: '900px'}}>
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

        </div>
        <div className="bg-fondo pattern" style={{ position: 'relative', zIndex: 1 }}>
        <section id="my-section-desktop" className="relative left-2/4 transform -translate-x-1/2 -translate-y-1/2 hidden lg:inline-block">
          <SearchHome />
        </section>
        </div>
        <section id="my-section-mobile" className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:hidden w-full px-5">
          <SearchMobile filter={false} searchN={handleSearch} />
        </section>
        <section className="bg-fondo pattern">
          <h1 className="lg:pt-0 pt-20 md:pl-28 pl-10 text-4xl font-n27 text-white lg:text-5xl">Próximos eventos</h1>
          <div className="relative pb-12">
             <div className="scrollbar-hide flex w-full md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" ref={eventListRef}  style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                {events.map((event:any, index:any) =>
                  <div key={index}>
                    <EventCard id={event.id} image={event.fk_sportcenter_id?.image || `${sportCenterCustom}`} sport={event.fk_sports_id.name} gender={event.fk_sex_id.gender} level={event.fk_difficulty_id.type} players={event.number_players} full={event.number_players} missing_players={event.missing_players} players_registered={event.players_registered} time={event.time} date={event.date} name={event.name} sportCenter={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
                  </div>
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
              <div className="scrollbar-hide flex md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                <img className="cursor-pointer" src={Futbol} width={'355'} onClick={() => hanleSearchSport("futbol")} />
                <img className="cursor-pointer" src={Baloncesto} width={'355'} onClick={() => hanleSearchSport("baloncesto")} />
                <img className="cursor-pointer" src={Tenis} width={'355'} onClick={() => hanleSearchSport("tenis")} />
                <img className="cursor-pointer" src={FutbolSala} width={'355'} onClick={() => hanleSearchSport("futbol sala")} />
                <img className="cursor-pointer" src={Padel} width={'355'} onClick={() => hanleSearchSport("padel")} />     
              </div>
            </div>
        </section>
        <section className="bg-fondo pattern pb-5">
          <h1 className="pt-14 md:pl-28 pl-10 text-4xl font-n27 text-white lg:text-5xl">Los centros deportivos asociados a SPORTIME</h1>
            <div className="relative pb-20">
                <div className="scrollbar-hide flex w-full md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                    {sportCenters.map((sportCenter:any, index:any) => (
                      <div key={index}>
                        <SportCenterCard id={sportCenter.id} image={sportCenter.image} address={sportCenter.address} municipality={sportCenter.municipality} name={sportCenter.name}  />
                      </div>
                    ))}
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
              <a href="/registro" className="bg-tkb border text-sm text-white py-3 px-7 rounded-full hover:bg-primary hover:text-black hover:border-black">
              Únete a la comunidad
              </a>
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

                  <p className="mt-4 text-sm lg:mt-0">
                  <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target='blank'>
                        <img alt="Licencia de Creative Commons" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
                        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" />
                    </a>
                  </p>
                </div>
              </div>
            </footer>
        </section>
    </>
    
  )
}
