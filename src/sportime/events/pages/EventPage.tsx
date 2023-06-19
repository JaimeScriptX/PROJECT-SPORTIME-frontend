import { Footer, Navbar } from '../../../ui'
import tenis from '../../../assets/images/tenis.webp'
import FutbolIcono from '../../../assets/images/IconoFutbol.svg'
import RelojIcono from '../../../assets/images/IconoReloj.svg'
import UbicacionIcono from '../../../assets/images/IconUbicacion.svg'
import EnviarUbicacionIcono from '../../../assets/images/IconoEnviarUbicacion.svg'
import sportCenterCustom from '../../../assets/images/centro-deportvo-personalizado.jpg'

import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from '../components/Map';
import { useEffect, useState } from 'react'
import { ModalInfo } from '../components/ModalInfo'
import { ModalElegir } from '../components/ModalElegir'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom'
import { useEventStore } from '../../../hooks/useEventStore'
import { useAuthStore } from '../../../hooks/useAuthStore'
import { ModalMarcador } from '../components/ModalMarcador'
import { usePersonStore } from '../../../hooks/usePersonStore'
import { ConditionalUser } from '../components/ConditionalUser'
import { ConditionalCreator } from '../components/ConditionalCreator'
import ShareButton from '../components/ShareButton'
import { ModalAddCause } from '../components/ModalAddCause'

interface initialState {
    id: number,
    name: string,
    is_private: boolean,
    details: string,
    price: number,
    date: string,
    time: string,
    cancellation_reason: string,
    time_end: string,
    duration:string,
    number_players: number,
    sport_center_custom: string,
    fk_teamcolor_id: {
      id: number, 
      colour: string, 
      image_shirt: string
    }
    fk_teamcolor_two_id:{
      id: number, 
      colour: string, 
      image_shirt: string
    },
    fk_sportcenter_id?: {
      id: number
      address: string
      destination: string
      image: string
      latitude: number
      longitude: number
      municipality: string
      name: string
      phone: string
    },
    fk_sports_id: {
        id: number,
        logo_event: string,
    },
    events_results: {
      team_a: number,
      team_b: number
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
      image_profile: string,
      name_and_lastname: string,
      fk_user_id: {
          username: string
      }
    },
    event_players_list: [
      {
        fk_person_id: number
      }
    ]
    event_players: {
          event_players_A: [],
          event_players_B: []
      },
    state: {
      id: number, 
      type: string,
      colour: string
    }
    players_registered: number,
    missing_players: number
}

interface initialPersonState {
  fk_sex_id: {
    id: number,
    gender: string
  },
}

export const EventPage = () => {

  const { id } = useParams();
  const {getEventById, deleteEventsPlayer,startJoinEvent, canceledEvent, addReason} = useEventStore()
  const navigate = useNavigate()
  const {status, user } = useAuthStore()
  const {getPersonById} = usePersonStore()

  const [eventData, setEventData] = useState<initialState | null>(null);
  const [personData, setPersonData] = useState<initialPersonState | null>(null);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalElegir, setShowModalElegir] = useState(false);
  const [showModalMarcador, setShowModalMarcador] = useState(false);
  const [deletePlayer, setDeletePlayer] = useState(false)
  const [joinPlayer, setJoinPlayer] = useState(false)
  const [showModalCause, setShowModalCause] = useState(false)

  const eventPromise = async () => {
    await getEventById(id).then((data) => {
      setEventData(data);
    })
    await getPersonById(user.uuid).then((data) => {
      setPersonData(data)
    })
  }

  useEffect(() => {

    eventPromise()

  }, [id, showModalElegir, ConditionalUser, ConditionalCreator])

  const handleDeletePlayer = async() => {
    if(user.uuid && eventData?.id){
      await deleteEventsPlayer({person_id: user.uuid, event_id: eventData?.id })
      setDeletePlayer(true)
    }
  }

  const handleJoinEvent = async({team}:{team:number}) => {
    if(user.uuid && eventData?.id){
      await startJoinEvent({ fk_person_id:user.uuid, fk_event_id:eventData?.id, team })
      setJoinPlayer(true)
    }
  }
  
  const handleAddCause = async({cancellationReason}:{cancellationReason:string}) => {
    if(cancellationReason && eventData?.id){
      console.log(cancellationReason)
      await addReason({ cancellationReason, id:eventData?.id })
      setJoinPlayer(true)
    }
  }
  
  useEffect(() => {

    eventPromise()
    setDeletePlayer(false)
    setJoinPlayer(false)

  }, [deletePlayer, joinPlayer])
  

  const handleDireccion = (event:any) => {
    event.preventDefault();
  // Cambiar estos valores para cambiar el destino
    const latitud =  eventData?.fk_sportcenter_id?.latitude || null;
    const longitud =  eventData?.fk_sportcenter_id?.longitude || null;
    const destino = eventData?.fk_sportcenter_id?.destination || eventData?.sport_center_custom || "";
    // Construir la cadena de texto utilizando el protocolo "geo:" y la latitud y longitud del destino, junto con el parámetro "q" para especificar la dirección, y "saddr" para la ubicación actual del usuario
    const geoLink = `geo:0,0?q=${encodeURIComponent(destino)}&saddr=${latitud},${longitud}`;
    const geoLinkApple =`https://maps.apple.com/place?ll=${latitud}%2C${longitud}`;
    // Verificar si la aplicación se está ejecutando en un dispositivo móvil
    if (eventData && eventData.fk_sportcenter_id && eventData.fk_sportcenter_id.id) {
      
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.open(geoLinkApple, '_blank');
      }
    
      if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = geoLink;
      }

      window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}&travelmode=driving`;

    } else {
      window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}&travelmode=driving`;
    }    
  }  

  const onNavigateBack = () => {
    navigate(-1)
  }

  const openModal = () => {
    setShowModalInfo(true);
  };

  const openModalMarcador = () => {
    setShowModalMarcador(true);
  };

  const openModalCause = () => {
    setShowModalCause(true);
  };

  const openModalElegir = () => {
    if(status === "not-authenticated"){
      navigate('/iniciar-sesion')
    } else {
      setShowModalElegir(true);
    }
  };

  const closeModalInfo = () => {
    setShowModalInfo(false);
  };

  const closeModalElegir = () => {
    setShowModalElegir(false);
  };

  const closeModalMarcador = () => {
    setShowModalMarcador(false);
  };

  const closeModalCause = () => {
    setShowModalCause(false);
  };

  
  return (
    <>
    <Navbar />
    <div className='relative w-full h-80'>
      <img src={eventData?.fk_sportcenter_id?.image || sportCenterCustom} className='absolute top-0 left-0 w-full h-full object-cover object-center' style={{ objectPosition: '20% 50%' }} />
      <div className='absolute top-4 left-3 w-10 h-10 flex items-center justify-center bg-white opacity-80 cursor-pointer rounded-full' onClick={onNavigateBack}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='-5 -3 35 30' fill='none' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-arrow-left '>
          <path d='M19 12H5M12 19l-7-7 7-7' />
        </svg>
      </div>
      <div className='relaive absolute top-4 right-3 '>
      <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-lg shadow rounded-lg text-black bg-white opacity-80 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20 relative">
      <span hidden className={`bg-curso`}></span>
      <span hidden className={`bg-creado`}></span>
      <span hidden className={`bg-completado`}></span>
      <span hidden className={`bg-finalizado`}></span>
      <span hidden className={`bg-cancelado`}></span>
      { eventData?.state?.colour &&
        <span className="relative flex h-3 w-3 mr-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${eventData.state?.colour} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 bg-${eventData.state?.colour}`}></span>
      </span>
            }
        {eventData?.state?.type}

      </button>
      </div>
    </div>
    <div className="bg-footer">
    <div className={`bg-fondo rounded-t-3xl relative mx-36 max-md:mx-0 ${eventData?.fk_sportcenter_id !== null ? '' : 'h-screen'}`} style={{ marginTop: '-60px' }}>
        { (eventData?.state?.type === 'Finalizado' || eventData?.state?.type === 'En curso') && (
          <div className='absolute left-1/2 transform -translate-x-1/2 px-32 py-16' style={{ marginTop: '-110px' }}>
            <div className='fixed top-0 w-full pb-1 pt-0.5 flex justify-center gap-16 inset-x-0 bg-portada'>
              <h1 className='text-white font-n27'>Equipo A</h1>
              <h1 className='text-white font-n27'>Equipo B</h1>
            </div>
            <div className='fixed top-7 py-4 w-full flex justify-center gap-10 inset-x-0 bg-footer'>
              <h1 className='text-white text-5xl font-n27'>{eventData?.events_results.team_a}</h1>
              <h1 className='text-primary text-5xl font-n27'>-</h1>
              <h1 className='text-white text-5xl font-n27'>{eventData?.events_results.team_b}</h1>
            </div>
          </div>
        )}
        <div className='pl-5'>
          <div className="flex items-center justify-between py-3">
              <div>
                <h1 className="pt-5 text-white text-2xl font-n27">{eventData?.name} {eventData?.is_private === false ? <FontAwesomeIcon icon={faLockOpen} size="sm" style={{color: "#ffffff",}} /> :  <FontAwesomeIcon icon={faLock} size="sm" style={{color: "#ffffff",}} />}</h1>
                <h6 className="text-white flex">
                  <img src={eventData?.fk_person_id?.image_profile} className='w-7 h-7 rounded-full mr-1' />
                  <a href={`/perfil/${eventData?.fk_person_id?.fk_user_id?.username}`} target='_blank'>{eventData?.fk_person_id?.fk_user_id?.username|| ""}</a>
                </h6>
              </div>
              <img src={eventData?.fk_sports_id.logo_event} className="pt-6 pr-5"/>
          </div>
          <hr className='mr-5 mt-2 opacity-5 pb-3'/>
          <div className='flex justify-center'>
          <ConditionalUser eventData={eventData} user={user} personData={personData}  handleDeletePlayer={handleDeletePlayer} openModalElegir={openModalElegir} cancellation_reason={eventData?.cancellation_reason || ""} />
          {showModalElegir && (
            <ModalElegir handleJoinEvent={handleJoinEvent} number_players={eventData?.number_players} event_players_team_a={eventData?.event_players?.event_players_A} event_players_team_b={eventData?.event_players.event_players_B} team_a_shirt={eventData?.fk_teamcolor_id.image_shirt || null} team_b_shirt={eventData?.fk_teamcolor_two_id.image_shirt || null}  onClose={closeModalElegir}/>
          )}
          <ConditionalCreator eventData={eventData} user={user} id={id} canceledEvent={canceledEvent} openModalMarcador={openModalMarcador} openModalCause={openModalCause} />
          {showModalMarcador && (
            <ModalMarcador onClose={closeModalMarcador} team_a={eventData?.events_results?.team_a} team_b={eventData?.events_results?.team_b} event_id={eventData?.id}/>
          )}
          {showModalCause && (
            <ModalAddCause onClose={closeModalCause} handleAddCause={handleAddCause} cancellation_reason={eventData?.cancellation_reason || ""}/>
          )}
          </div>
          <hr className='mr-5 mt-3 opacity-5'/>
            <div className=" border-gray-200 py-5 pt-6">
              <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
                <div className="text-center border-r pr-5">
                  <h6 className="text-lg text-white font-bold lg:text-xl xl:text-xl">{eventData?.number_players} VS {eventData?.number_players}</h6>
                  <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                      Jugadores
                  </p>
                </div>
                <div className="text-center border-r pr-5 pl-2">
                  <h6 className="text-lg font-bold text-white lg:text-xl xl:text-xl">{eventData?.fk_sex_id?.gender}</h6>
                  <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                      Género
                  </p>
                </div>
                <div className="text-center pl-2">
                  <h6 className="text-lg font-bold lg:text-xl xl:text-xl text-white">{eventData?.fk_difficulty_id?.type}</h6>
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
          Quedan <b>{eventData?.missing_players}</b> plazas libres.{' '}
          <a className='text-primary  cursor-pointer' onClick={openModal}>
            Ver equipos...
          </a>
        </h5>
        {/* Renderiza el componente Modal si showModal es verdadero */}
        {showModalInfo && (
          <ModalInfo number_players={eventData?.number_players} team_a_shirt={eventData?.fk_teamcolor_id.image_shirt || null} team_b_shirt={eventData?.fk_teamcolor_two_id.image_shirt || null} event_players_team_a={eventData?.event_players?.event_players_A} event_players_team_b={eventData?.event_players.event_players_B}  onClose={closeModalInfo}/>
        )}
              </div>
          </div>
          { eventData?.details &&
          <div>
            <hr className='mr-5 opacity-5 pb-2'/>
            <h1 className='text-white text-base font-n27 mb-2'>Detalles</h1>
            <p className='text-white bg-footer p-2 mr-5 mb-2'>{eventData?.details}</p>
          </div>
          } 
          <hr className='mr-5 opacity-5 pb-3'/>
          <div className="flex items-center justify-start pb-2">
              <img src={RelojIcono} width={'60'} className="pr-3"/>
              <div>
                <h6 className="text-slate-200 font-n27">{eventData?.date}</h6>
                <h6 className="text-white text-lg  font-n27">{eventData?.time} - {eventData?.time_end} H</h6>
              </div>
              <ShareButton />
          </div>
          <div className="flex items-center justify-start pb-2">
              <img src={UbicacionIcono} width={'60'} className="pr-3"/>
              <div>
                <h6 className="text-slate-200 font-n27">{eventData?.fk_sportcenter_id?.municipality === undefined ? "" : `${eventData?.fk_sportcenter_id.municipality}`}</h6>
                <h6 className="text-white text-lg font-n27">{eventData?.fk_sportcenter_id?.name === undefined ? `${eventData?.sport_center_custom}` : `${eventData?.fk_sportcenter_id.name}` }</h6>
              </div>
              <button
                className="flex items-center bg-transparent border-none focus:outline-none mr-5"
                style={{ backgroundImage: `url(${EnviarUbicacionIcono})`, backgroundSize: 'cover', width: '45px', height: '45px',  marginLeft: 'auto'  }}
                onClick={handleDireccion}
              />
          </div>
          {eventData?.fk_sportcenter_id !== null && 
          <div>
          <div className='pt-3 pb-2'>
            <h1 className='text-white text-lg font-n27'>Lugar</h1>
          </div>
          <Map latitude={eventData?.fk_sportcenter_id?.latitude || 0} longitude={eventData?.fk_sportcenter_id?.longitude || 0}  />
          </div>}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
