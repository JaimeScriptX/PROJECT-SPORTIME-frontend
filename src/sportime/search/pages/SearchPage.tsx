import { useLocation } from "react-router-dom";
import { Footer, Navbar } from "../../../ui";
import { EventCard } from "../../components";
import { useEffect, useState } from "react";

export const SearchPage = () => {
    const [events, setEvents] = useState([])
    const [sportCenters, setSportCenters] = useState([])
    const location = useLocation();
    const searchData = location.state?.searchData;

    useEffect(() => {
        setEvents(searchData.events)
        setSportCenters(searchData.sport_centers)
        console.log(events, sportCenters)
    }, [searchData])
    

    console.log(searchData.events)
  return (
    <>
      <Navbar />
      <div className="bg-fondo flex flex-col">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl text-white max-md:pl-5 font-n27">Resultados de la búsqueda</h1>
          <hr className="mb-4 max-md:mx-5 "/>
          <h2 className="text-white font-n27 max-md:pl-5 text-2xl">Eventos:</h2>
          {events.length > 0 &&
            <div className="scrollbar-hide flex w-full md:pl-22 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}> 
                {events.map((event:any) =>
                    <EventCard id={event.id} sport={event.fk_sports_id.name} gender={event.fk_sex_id.gender} level={event.fk_difficulty_id.type} players={event.number_players} full={event.number_players} missing_players={event.missing_players} players_registered={event.players_registered} time={event.time} date={event.date} name={event.name} sportCenter={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
                )}
            </div>
          }
          {events.length === 0 && 
            <div className="flex justify-center py-36 lg:py-28">
                <h1 className="lg:text-4xl text-2xl text-center font-n27 text-white">No se ha encontrado ningún evento</h1>
            </div>
          }
          <h2 className="text-white font-n27 max-md:pl-5 text-2xl ">Centros deportivos:</h2>
          {sportCenters.length > 0 &&
             <div className="scrollbar-hide flex w-full md:pl-22 pl-5 pt-5 snap-x snap-mandatory scroll-px-10 lg:gap-14 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}> 
                {events.map((event:any) =>
                <EventCard id={event.id} sport={event.fk_sports_id.name} gender={event.fk_sex_id.gender} level={event.fk_difficulty_id.type} players={event.number_players} full={event.number_players} missing_players={event.missing_players} players_registered={event.players_registered} time={event.time} date={event.date} name={event.name} sportCenter={event.fk_sportcenter_id?.name === undefined ? event.sport_center_custom : event.fk_sportcenter_id?.name}/>
                )}
            </div>
          }
          {sportCenters.length === 0 && 
            <div className="flex justify-center py-36 lg:py-28">
                <h1 className="lg:text-4xl text-2xl text-center font-n27 text-white">No se ha encontrado ningún centro deportivo</h1>
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
};
