import { sportimeApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout} from "../store"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { useNavigate } from 'react-router-dom';

export const useEventStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const startCreateCustom = async({name,is_private,details,price,date,time,duration,number_players,fk_sport, fk_difficulty, fk_sex, fk_person, fk_teamcolor, fk_teamcolor_two, sport_center_custom}:{
        name:string,is_private:boolean,details:string,price:number,date:Date,time:string,duration:string,number_players:number,fk_sport:object, fk_difficulty:object, fk_sex:object, 
        fk_person:string, fk_teamcolor:string, fk_teamcolor_two:string,sport_center_custom:string}) => {
        console.log(name,is_private,details,price,date,time,duration,number_players,fk_sport, fk_difficulty, fk_sex, fk_person, fk_teamcolor, fk_teamcolor_two, sport_center_custom)

        try {
            const {data} = await sportimeApi.post('/eventsCustom',{name,is_private,details,price,date,time,duration,number_players,fk_sport, fk_difficulty, fk_sex, fk_person, fk_teamcolor, fk_teamcolor_two, sport_center_custom})
            console.log(data)
            window.location.href = `/evento/${data.id}`;
        } catch (error) {
            console.log(error)
        }
    } 

    const startJoinEvent = async({fk_event_id, fk_person_id, team}:{
        fk_event_id:number, fk_person_id:string, team:number}) => {
        try {
            const {data} = await sportimeApi.post('/eventPlayers',{fk_event_id, fk_person_id, team})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    } 


    const getEventById = async(id:any) => {
        try {
        const {data} = await sportimeApi.get(`/events/${id}`)
        console.log(data)
        return data
        } catch (error) {
            // window.location.href = '/404'
        }
    }   

    const getEvents = async() => {
        const {data} = await sportimeApi.get(`/events`)
        console.log(data)
        return data
    }   

    const getEventsPersona= async(id:any) => {
        const {data} = await sportimeApi.get(`/eventsPersona/${id}`)
        console.log(data)
        return data
    }   

    const deleteEventsPlayer = async({person_id, event_id}:{person_id:string, event_id:number}) => {
        const {data} = await sportimeApi.delete(`/eventPlayers`, 
        {
            params: { person_id, event_id }
          });
        console.log(data)
        return data
    }   

    const canceledEvent = async({event_id}:{event_id:string}) => {
        const {data} = await sportimeApi.delete(`/reservedTime/${event_id}`)
        console.log(data)
        window.location.href = `/evento/${event_id}`
    }

    const changeResult = async({event_id, team_a, team_b }:{event_id:string, team_a:any, team_b:any}) => {
        const {data} = await sportimeApi.put(`/eventsResults/${event_id}`,{ team_a, team_b });
        console.log(data)
        return data
    }
    
    const addReason = async({id, cancellationReason }:{id:any, cancellationReason:any}) => {
        console.log(cancellationReason)
        const {data} = await sportimeApi.put(`/cancellationReason`,
        { id, cancellationReason });
        console.log(data)
        return data
    }

    const getEventsHome = async() => {
        const {data} = await sportimeApi.get(`/homeEvents`)
        console.log(data)
        return data
    }



    return {
        // Propiedades
        status, user, errorMessage,

        // Metodos
        startCreateCustom, startJoinEvent, getEventById, addReason, getEvents, getEventsPersona, deleteEventsPlayer, canceledEvent, getEventsHome, changeResult
    }
}