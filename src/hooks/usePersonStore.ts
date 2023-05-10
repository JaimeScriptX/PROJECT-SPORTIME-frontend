import { sportimeApi } from '../api'
import { useAppSelector } from "../store/hook"

export const usePersonStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)

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
        getPersonById, getEvents
    }
}