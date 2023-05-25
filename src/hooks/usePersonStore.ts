import { sportimeApi } from '../api'
import { useAppSelector } from "../store/hook"

export const usePersonStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)

    const UpdatePersonById = async({id, image_profile, image_banner, name_and_lastname, nationality, city, birthday, height, weight, fk_sex, fk_user}:{id:string, image_banner:null, image_profile: File | null , name_and_lastname:string, city:string, birthday: Date | null, nationality:string, height:number, weight:number, fk_sex:any, fk_user:any }) => {
        const {data} = await sportimeApi.put(`/persons/${id}`, {id, image_profile, image_banner,name_and_lastname, nationality, city, birthday, height, weight, fk_sex, fk_user} )
        console.log(data)
        return data
    }   
    
    const getPersonByUsername = async(username:any) => {
        const {data} = await sportimeApi.get(`/personsByName/${username}`)
        console.log(data)
        return data
    }  

    const getPersonById = async(id:any) => {
        const {data} = await sportimeApi.get(`/persons/${id}`)
        console.log(data)
        return data
    }   

    const getEvents = async() => {
        const {data} = await sportimeApi.get(`/eventsCustom/`)
        console.log(data)
        return data
    }   

    return {
        // Propiedades
        status, user, errorMessage,

        // Metodos
        getPersonById,getPersonByUsername, getEvents, UpdatePersonById
    }
}