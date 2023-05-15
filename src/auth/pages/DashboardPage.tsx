import { useEffect, useRef, useState } from "react";
import { Footer, Navbar } from "../../ui"
import { EventCard } from "../../sportime/components";
import { useEventStore } from "../../hooks/useEventStore";

interface initialState {
    events_joined_by_person: [
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
        event_players: {
            event_players_A: [],
            event_players_B: []
        },
        players_registered: number,
        missing_players: number
    ]
}


export const DashboardPage = () => {

    const [eventsCreated, setEventsCreated] = useState<Array<initialState>>(Array)
    const [eventsJoin, setEventsJoin] = useState<Array<initialState>>(Array)
    const {getEventsPersona, user} = useEventStore()
    const eventListRef = useRef<HTMLDivElement>(null);
      
    const eventPromise = async () => {
        await getEventsPersona(1).then((data) => {
                setEventsJoin(data.events_joined_by_person)
                setEventsCreated(data.events_created_by_person)
              }
        )}
    
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
        <Navbar />
        <div className="bg-fondo h-screen" >
            <div className="px-2 grid grid-flow-col w-full ">
                <h1 className="text-6xl ml-7 mt-3 max-sm:text-5xl text-white font-n27 ">Hola {user.name}</h1>
                <div className="mt-5 mb-5 mr-7 bg-white rounded-2xl ">
                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                        <div className="text-center md:border-r">
                            <h6 className="text-xl font-bold lg:text-xl xl:text-xl">14</h6>
                            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                            Partidos
                            </p>
                        </div>
                        <div className="text-center md:border-r">
                            <h6 className="text-xl font-bold lg:text-xl xl:text-xl">7</h6>
                            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                            Victorias
                            </p>
                        </div>
                        <div className="text-center md:border-r">
                            <h6 className="text-xl font-bold lg:text-xl xl:text-xl">7</h6>
                            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                            Derrotas
                            </p>
                        </div>
                        <div className="text-center">
                            <h6 className="text-xl font-bold lg:text-xl xl:text-xl">50%</h6>
                            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                            Ratio
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-10 mx-10 rounded-2xl">
                <h1 className="md:pl-16 pt-4 pl-5 text-2xl font-n27 text-black lg:text-4xl">Mis eventos</h1>
                <div className="relative pb-12">
                    <div className="scrollbar-hide flex w-full md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" ref={eventListRef}>
                    {/* {events?.events_created_by_person.map((event:any) =>
                    <EventCard id={event.id} deporte={event.fk_sports_id.name} genero={event.fk_sex_id.gender} nivel={event.fk_difficulty_id.type} jugadores={event.number_players} total={event.missing_players} plazas={event.players_registered} hora={event.time.date} fecha={event.date.date} nombre={event.name} centroDeportivo={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
                    )} */}
                    </div>
                    <button
                        className="absolute top-4/4 top-34  transform -translate-y-1/2 left-10 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center  transition duration-300 font-n27 "
                        onClick={scrollToLeft}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute top-4/4 top-34 transform -translate-y-1/2 right-2 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center  transition duration-300 font-n27"
                        onClick={scrollToRight}
                    >
                        &gt;
                    </button>
                </div>
            </div>  
            <div className="bg-white mt-10 mx-10 rounded-2xl">
                <h1 className="md:pl-16 pt-4 pl-5 text-2xl font-n27 text-black lg:text-4xl">Eventos a los que me uní</h1>
                <div className="relative pb-1">
                    <div className="scrollbar-hide flex w-full md:pl-28 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" ref={eventListRef}>
                    {eventsJoin.map((event:any) =>
                    <EventCard id={event.id} deporte={event.fk_sports_id.name} genero={event.fk_sex_id.gender} nivel={event.fk_difficulty_id.type} jugadores={event.number_players} total={event.missing_players} plazas={event.players_registered} hora={event.time.date} fecha={event.date.date} nombre={event.name} centroDeportivo={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
                    )}
                    </div>
                    <button
                        className="absolute top-4/4 top-44  transform -translate-y-1/2 left-5 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center shadow-md transition duration-300 font-n27 "
                        onClick={scrollToLeft}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute top-4/4 top-44 transform -translate-y-1/2 right-2 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center  transition duration-300 font-n27"
                        onClick={scrollToRight}
                    >
                        &gt;
                    </button>
                </div>
            </div>  
        </div>
        <Footer/>
    </>
  )
}
