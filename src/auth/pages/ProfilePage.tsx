import { Footer, Navbar } from "../../ui"
import Futbol from '../../assets/images/Futbol.svg'
import Baloncesto from '../../assets/images/Baloncesto.svg'
import Tenis from '../../assets/images/Tenis.svg'
import FutbolSala from '../../assets/images/FutbolSala.svg'
import Padel from '../../assets/images/Padel.svg'
import Edit from '../../assets/images/IconoEdit.svg'
import { useEffect, useRef, useState } from "react"
import { useAuthStore } from "../../hooks/useAuthStore"
import { usePersonStore } from "../../hooks/usePersonStore"
import { ModalEditarPerfil } from "../components/ModalEditarPerfil"
import { EventCard } from "../../sportime/components"
import { ModalFavoriteSport } from "../components/ModalFavoriteSport"

interface initialState {
    id: number,
    image_profile: null,
    name_and_lastname: string,
    age: number,
    birthday: null
    weight: null,
    height: null,
    nationality: null,
    city: null,
    games_played: null,
    victories: null,
    defeat: null,
    ratio: null,
    image_banner: null,
    fk_sex_id: {
      id: number,
      gender: string
    },
    fk_user_id: {
      username: string
    }
}



export const ProfilePage = () => {

  const [PersonData, setPersonData] = useState<initialState | null>(null);
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const {user} = useAuthStore()
  const {getPersonById} = usePersonStore()
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenSport, setIsOpenSport] = useState(false);
  const eventListRefCreated = useRef<HTMLDivElement>(null);
  const eventListRefJoin = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsOpenProfile(false);
  };

  const profilePromise = async () => {
    await getPersonById(user.uuid).then((data) => {
      setPersonData(data);
      setFavorites(data.favorites.fav);
      setEvents(data.events);
    })
  }


  useEffect(() => {

    profilePromise()

  }, [user.uuid, isOpenProfile, closeModal])

  const scrollToLeftCreated = () => {
    if (eventListRefCreated.current) {
      eventListRefCreated.current.scrollLeft -= 150;
    }
};

const scrollToRightCreated = () => {
  if (eventListRefCreated.current) {
    eventListRefCreated.current.scrollLeft += 150;
  }
};

  return (
    <>
    <Navbar />
    <div className="bg-fondo py-5 pb-6">
        <div>
          <h1 className="text-white text-4xl pl-5 pb-2">Perfil</h1>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mx-5">
            <div className="relative py-7">
                <div
                    className="absolute inset-0 bg-portada"
                ></div>
                <div className="relative">
                    <img
                    className="w-20 h-20 rounded-full mx-5 top-16 relative z-10 border-4 border-white"
                    src={PersonData?.image_profile || ""}
                    alt="Profile"
                    />
                </div>
            </div>
            <div className="mt-12 pl-6">
              <div className="absolute right-12 pt-1">
                <button onClick={() => setIsOpenProfile(!isOpenProfile)}>
                  <img src={Edit} width={'40'}/>
                </button>
                {isOpenProfile && (
                  <ModalEditarPerfil name_lastname={PersonData?.name_and_lastname || ""} birthday={PersonData?.birthday || ""} photo_profile={PersonData?.image_profile || ""} height={PersonData?.height || 0}
                  weight={PersonData?.weight || 0} sex={PersonData?.fk_sex_id?.gender || ""} nacionality={PersonData?.nationality || ""} location={PersonData?.city || ""} onClose={closeModal}/>
                )}
              </div>
              <h2 className="text-xl font-medium text-gray-800">{PersonData?.name_and_lastname}</h2> 
              <h2 className="text-sm text-gray-700">@{PersonData?.fk_user_id.username}</h2> 
              { PersonData?.nationality &&
                <p className="text-gray-500 text-sm">Nacionalidad: {PersonData?.nationality}</p>
              }
              { PersonData?.city &&
                <p className="text-gray-500 text-sm">Ciudad: {PersonData?.city}</p>
              }
              { PersonData?.age != null && PersonData.age > 0 && (
                <p className="text-gray-500 text-sm pt-2">Edad: {PersonData?.age} años</p>
              )}
              {PersonData?.height != null && PersonData.height > 0 && (
                <p className="text-gray-500 text-sm">
                  Estatura: {PersonData.height} cm
                </p>
              )}
              {PersonData?.weight != null && PersonData.weight > 0 && (
                <p className="text-gray-500 text-sm">Peso: {PersonData?.weight}kg</p>
              )}
              { PersonData?.fk_sex_id?.gender &&
                <p className="text-gray-500 text-sm">Sexo: {PersonData?.fk_sex_id?.gender || ""}</p>
              }
            </div>
            <div className="border-t border-gray-200 mt-6 pt-6">
                <h3 className="text-lg font-n27 text-gray-800 pl-6">Estadisticas generales</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 pt-5">
                    <div className="text-center md:border-r">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">{PersonData?.games_played}</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Partidos
                    </p>
                    </div>
                    <div className="text-center md:border-r ">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">{PersonData?.victories}</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Victorias
                    </p>
                    </div>
                    <div className="text-center md:border-r">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">{PersonData?.defeat}</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Derrotas
                    </p>
                    </div>
                    <div className="text-center">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">{PersonData?.ratio}%</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Ratio
                    </p>
                    </div>
                </div>
            </div>
        </div>
        {/*
        <div className="bg-white shadow-md rounded-lg p-6 mt-5 mx-5">
            <h3 className="text-xl text-gray-800 font-n27">Skills</h3>
            <div className="flex flex-wrap mt-2">
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Fútbol
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Tenis
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Padel
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Fútbol Sala
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                Baloncesto
                </span>
            </div>
  </div>*/}
        <div className="bg-white shadow-md rounded-lg p-6 mt-5 mx-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl text-gray-800 font-n27">Mis deportes favoritos</h3>
            <div>
              <button onClick={() => setIsOpenSport(!isOpenSport)}>
                <img src={Edit} width={'40'} alt="Editar" />
              </button>
              {isOpenSport && (
                <ModalFavoriteSport
                  onClose={() => setIsOpenSport(false)}
                />
              )}
            </div>
          </div>
        <div className="scrollbar-hide flex w-full pt-5 snap-x snap-mandatory scroll-px-10 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}>
        {favorites.map((sport: any, index: number) => (
          <div key={index} className="image-container" style={{ position: 'relative' }}>
            <img src={sport.fk_sport.image} width={'175'} alt={sport.fk_sport.name} />
          </div>
        ))}

        </div>
      </div>

        <div className="bg-white shadow-md rounded-lg p-6 mt-5 mx-5">
            <h3 className="text-2xl text-gray-800 font-n27">Mis últimos eventos</h3>
            {events.length > 0 &&
                <div className="relative pt-5">
                    <div className="scrollbar-hide flex w-full md:pl-28 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" ref={eventListRefJoin} style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                    {events.map((event:any, index:any) =>
                    <div key={index}>
                      <EventCard id={event.id} image={event.fk_sportcenter_id?.image || "https://laguiaw.com/contenido/logotipos/91625_polideportivo_municipal_de_archena.jpg"} sport={event.fk_sports_id.name} gender={event.fk_sex_id.gender} level={event.fk_difficulty_id.type} players={event.number_players} full={event.number_players} missing_players={event.missing_players} players_registered={event.players_registered} time={event.time} date={event.date} name={event.name} sportCenter={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
                    </div>
                    )}
                    </div>
                    <button
                        className="absolute top-2/4 top-33  transform -translate-y-1/2 left-2 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center  transition duration-300 font-n27 "
                        onClick={scrollToLeftCreated}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute top-2/4 top-33 transform -translate-y-1/2 right-2 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center  transition duration-300 font-n27"
                        onClick={scrollToRightCreated}
                    >
                        &gt;
                    </button>
                </div>
                }
        </div>
    </div>
    

    <Footer />

    </>
  )
}
