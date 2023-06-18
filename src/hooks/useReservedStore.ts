import { sportimeApi } from "../api"
import { useAppSelector } from "../store/hook"


export const useReservedStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)

    const getSportCenterByIdSport = async(id:any) => {
        const {data} = await sportimeApi.get(`/sportcenter/${id}/sport`)
        console.log(data)
        return data
    }   

    const getHours = async({sporCenter_id, date, sport}:{sporCenter_id:any, date:any, sport:any}) => {
        console.log(sporCenter_id, date, sport)
        const {data} = await sportimeApi.get(`/reservedTime/${sporCenter_id}/${date}/${sport}`)
        console.log(data)
        return data
    }   

    const createReservedAndEvent = async({name, details, price, is_private, number_players, fk_difficulty, fk_person, fk_sex, fk_sport, fk_teamcolor, fk_teamcolor_two, sportCenter, fk_sportcenter, 
        date, start, end}:{name:string,is_private:boolean,details:string,price:number, date:any, sportCenter:any, number_players:number,fk_sport:object, fk_difficulty:object, fk_sex:object, fk_sportcenter:any,
        fk_person:string, fk_teamcolor:string, fk_teamcolor_two:string, start:any, end:any}) => {
        const {data} = await sportimeApi.post(`/reservedTime`, {name, details, price, is_private, number_players, fk_difficulty, fk_person, fk_sex, fk_sport, fk_teamcolor, fk_teamcolor_two, sportCenter, fk_sportcenter, date,
            start, end} )
        console.log(data.events.id)
        window.location.href = `/evento/${data.events.id}`;
    }   

    return {
        // Propiedades
        status, user, errorMessage,

        // Metodos
        getSportCenterByIdSport, getHours, createReservedAndEvent
    }

}
