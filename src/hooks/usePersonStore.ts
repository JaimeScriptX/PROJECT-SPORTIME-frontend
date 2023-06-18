import { sportimeApi } from '../api'
import { useAppSelector } from "../store/hook"

export const usePersonStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)

    const UpdatePersonById = async({id, image_profile, image_banner, name_and_lastname, nationality, city, birthday, height, weight, fk_sex, fk_user}:{id:string, image_banner:null, image_profile: string | null , name_and_lastname:string, city:string, birthday: Date | null, nationality:string, height:number, weight:number, fk_sex:any, fk_user:any}) => {
        const { data } = await sportimeApi.put(`/persons/${id}`, {image_profile, image_banner, name_and_lastname, nationality, city, birthday, height, weight, fk_sex, fk_user});
        localStorage.removeItem("token")
        localStorage.setItem("token", data.token_with_profile)
        window.location.href = '/perfil'
        return data;
    }   
    
    const getPersonByUsername = async(username:any) => {
        try {
            const {data} = await sportimeApi.get(`/personsByName/${username}`)
            console.log(data)
            return data
        } catch (error) {
            window.location.href = '/404'
        }

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

    const getLastEvents = async(id:any) => {
        const {data} = await sportimeApi.get(`/lastEventsPersona/${id}`)
        console.log(data)
        return data
    }   

    const getSports = async() => {
        const {data} = await sportimeApi.get(`/sport/`)
        console.log(data)
        return data
    }  
    const getFavoritesSports = async(id:any) => {
        const {data} = await sportimeApi.get(`/favorites/${id}`)
        console.log(data)
        return data
    }  

    const addFavorite = async({fk_person_id, fk_sport_id}:{fk_person_id:string, fk_sport_id:string}) => {
        const {data} = await sportimeApi.post(`/favorites`, {fk_person_id, fk_sport_id})
        console.log(data)
        return data
    }  

    const deleteFavorite = async({favorite_id}:{favorite_id:any}) => {
        const {data} = await sportimeApi.delete(`/favorites/${favorite_id}`)
        console.log(data)
        return data
    }  

    return {
        // Propiedades
        status, user, errorMessage,

        // Metodos
        getPersonById,getPersonByUsername, getEvents, UpdatePersonById, getLastEvents, getFavoritesSports, getSports, addFavorite, deleteFavorite
    }
}