import { useEffect, useRef, useState } from "react";
import { Footer, Navbar } from "../../ui"
import { EventCard } from "../../sportime/components";
import { useEventStore } from "../../hooks/useEventStore";


interface initialState {
    created_events: {
      id: number;
      name: string;
      is_private: boolean;
      details: string | null;
      price: number;
      date: string;
      time: string;
      time_end: string;
      duration: string;
      number_players: number;
      sport_center_custom: string | null;
      fk_sports_id: {
        id: number;
        name: string;
        need_team: boolean;
        image: null;
      };
      fk_sportcenter_id: {
        id: number;
        fk_services_id: {
          id: number;
          type: string;
        };
        name: string;
        municipality: string;
        address: string;
        image: null;
        phone: string;
      };
      fk_difficulty_id: {
        id: number;
        type: string;
      };
      fk_sex_id: {
        id: number;
        gender: string;
      };
      fk_person_id: {
        id: number;
        name_and_lastname: string;
        fk_teamcolor_id: {
          id: number;
          team_a: string;
          team_b: string;
        };
      };
      event_players: {
        event_players_A: Array<{
          fk_person_id: number;
          image_profile: null;
        }>;
        event_players_B: Array<{
          fk_person_id: number;
          image_profile: null;
        }>;
      };
      players_registered: number;
      missing_players: number;
    }[];
    participating_events: any[]; // Puedes ajustar el tipo según corresponda
  }


export const DashboardPage = () => {

    const [eventsCreated, setEventsCreated] = useState([])
    const [eventsJoin, setEventsJoin] = useState([])
    const {getEventsPersona, user} = useEventStore()
    const eventListRefCreated = useRef<HTMLDivElement>(null);
    const eventListRefJoin = useRef<HTMLDivElement>(null);
      
    useEffect(() => {
        const eventPromise = async () => {
          const data = await getEventsPersona(user.uuid);
          const { created_events, participating_events } = data;
          setEventsCreated(created_events);
          setEventsJoin(participating_events);
          console.log(eventsJoin)
        };
    
        eventPromise();
      }, [user.uuid]);

    const scrollToLeftCreated = () => {
        if (eventListRefCreated.current) {
          eventListRefCreated.current.scrollLeft -= 150;
        }
    };

    const scrollToLeftJoin = () => {
        if (eventListRefJoin.current) {
          eventListRefJoin.current.scrollLeft -= 150;
        }
    };

    const scrollToRightCreated = () => {
        if (eventListRefCreated.current) {
          eventListRefCreated.current.scrollLeft += 150;
        }
    };

    const scrollToRightJoin = () => {
        if (eventListRefJoin.current) {
          eventListRefJoin.current.scrollLeft += 150;
        }
    };

  return (
    <>
        <Navbar />
        <div className="bg-fondo pb-96 lg:pb-10" >
            <div className="px-2 grid grid-flow-row  lg:grid-flow-col w-full ">
                <h1 className="text-6xl ml-2 mt-3 max-sm:text-5xl text-white font-n27 ">Hola, {user.name}</h1>
                <div className="mt-5 mb-5 lg:mr-7 mr-2 ml-2 bg-white rounded-2xl">
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
            <hr className="mx-5 opacity-5 pb-5"/>
            <div className="bg-white mt-15  mx-5 rounded-2xl">
                <h1 className="md:pl-16 pt-4 pl-5 text-2xl font-n27 text-black lg:text-4xl">Mis eventos</h1>
                {eventsCreated.length > 0 &&
                <div className="relative pt-5">
                    <div className="scrollbar-hide flex w-full md:pl-32 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" ref={eventListRefCreated} style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                    {eventsCreated.map((event:any) =>
                   <EventCard id={event.id} sport={event.fk_sports_id.name} gender={event.fk_sex_id.gender} level={event.fk_difficulty_id.type} players={event.number_players} full={event.number_players} missing_players={event.missing_players} players_registered={event.players_registered} time={event.time} date={event.date} name={event.name} sportCenter={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
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
                {eventsCreated.length === 0 && 
                  <div className="flex justify-center py-12">
                      <h1 className="lg:text-4xl text-2xl text-center font-n27">No has creado aún ningún evento</h1>
                  </div>
                }
            </div>  
            <div className="bg-white mt-10 mx-5 rounded-2xl">
                <h1 className="md:pl-16 pt-4 pl-5 text-2xl font-n27 text-black lg:text-4xl">Eventos inscritos</h1>
                {eventsJoin.length > 0 &&
                <div className="relative pb-1">
                    <div className="scrollbar-hide flex w-full md:pl-28 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" ref={eventListRefJoin} style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                    {eventsJoin.map((event:any) =>
                    <EventCard id={event.id} sport={event.fk_sports_id.name} gender={event.fk_sex_id.gender} level={event.fk_difficulty_id.type} players={event.number_players} full={event.number_players} missing_players={event.missing_players} players_registered={event.players_registered} time={event.time} date={event.date} name={event.name} sportCenter={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
                    )}
                    </div>
                    <button
                        className="absolute top-4/4 top-44  transform -translate-y-1/2 left-5 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center shadow-md transition duration-300 font-n27 "
                        onClick={scrollToLeftJoin}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute top-4/4 top-44 transform -translate-y-1/2 right-2 text-black text-6xl hover:opacity-75 rounded-full h-12 w-12 flex items-center justify-center  transition duration-300 font-n27"
                        onClick={scrollToRightJoin}
                    >
                        &gt;
                    </button>
                </div>
                }
                {eventsJoin.length === 0 && 
                <div className="flex justify-center py-12">
                  <h1 className="lg:text-4xl text-2xl text-center font-n27">Todavía no te has unido a ningún evento</h1>
                </div>
                }
            </div>  
        </div>
        <Footer/>
    </>
  )
}
