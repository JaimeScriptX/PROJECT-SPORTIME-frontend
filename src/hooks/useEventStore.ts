import { sportimeApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout} from "../store"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { useNavigate } from 'react-router-dom';

export const useEventStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const startCreateCustom = async({name,is_private,details,price,date,time,duration,number_players,fk_sport, fk_difficulty, fk_sex, fk_person, fk_teamcolor}:{
        name:string,is_private:boolean,details:string,price:number,date:string,time:string,duration:string,number_players:number,fk_sport:object, fk_difficulty:object, fk_sex:object, 
        fk_person:string, fk_teamcolor:number}) => {
        console.log(name,is_private,details,price,date,time,duration,number_players,fk_sport, fk_difficulty, fk_sex, fk_person, fk_teamcolor)

        try {
            const {data} = await sportimeApi.post('/eventsCustom',{name,is_private,details,price,date,time,duration,number_players,fk_sport, fk_difficulty, fk_sex, fk_person, fk_teamcolor})
            console.log(data)
            // window.location.href = `/evento/${data.id}`;
        } catch (error) {
            console.log(error)
        }
    } 

    const startCreateSportime = async({name_and_lastname,username,email,password,phone }:{name_and_lastname:string, username:string, email:string, password:string, phone:string}) => {
        console.log({name_and_lastname,username,email,password,phone})
        
        dispatch(onChecking())
        try {
            const {data} = await sportimeApi.post('/register',{name_and_lastname,username,email,password,phone })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString())
            dispatch(onLogin({name:data.user.name_and_lastname, uuid: data.user.id}))
            navigate('/');
        } catch (error:any) {
            console.log(error)
            dispatch(onLogout(error.response.data.message ||"Error en el registro"))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100)
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
        const {data} = await sportimeApi.get(`/events/${id}`)
        console.log(data)
        return data
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

    return {
        // Propiedades
        status, user, errorMessage,

        // Metodos
        startCreateCustom, startCreateSportime, startJoinEvent, getEventById, getEvents, getEventsPersona
    }
}