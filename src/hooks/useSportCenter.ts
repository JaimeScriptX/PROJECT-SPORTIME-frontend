import { sportimeApi } from "../api"
import { useAppSelector } from "../store/hook"


export const useSportCenter = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)

    const getSportCenterById = async(id:any) => {
        try {
            const {data} = await sportimeApi.get(`/sportcenter/${id}`)
            console.log(data)
            return data
        } catch (error) {
            window.location.href = '/404'
        }
    }   
    const getSportCenterByIdSport = async(id:any) => {
        const {data} = await sportimeApi.get(`/sportcenter/${id}/sport`)
        console.log(data)
        return data
    }   

    const getSportCenters = async() => {
        const {data} = await sportimeApi.get(`/sportcenter/`)
        console.log(data)
        return data
    }   

    return {
        // Propiedades
        status, user, errorMessage,

        // Metodos
        getSportCenterById, getSportCenterByIdSport, getSportCenters
    }

}
