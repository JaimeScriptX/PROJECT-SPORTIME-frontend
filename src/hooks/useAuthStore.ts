import { sportimeApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout} from "../store"
import { useAppDispatch, useAppSelector } from "../store/hook"

export const useAuthStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const startLogin = async({email,password}:{email:string, password:string}) => {
        console.log({email, password})
        
        dispatch(onChecking())
        try {
            const {data} = await sportimeApi.post('/login_check',{email,password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString())
            dispatch(onLogin({name:data.name, uuid: data.uid}))
        } catch (error) {
            dispatch(onLogout('Asegúrate de que estás utilizando la dirección de correo electrónico o usuario, y la contraseña correctas.'))

        }
    } 

    const startRegister = async({name,email,password }:{name:string,email:string, password:string}) => {
        console.log({email, password})
        
        dispatch(onChecking())
        try {
            const {data} = await sportimeApi.post('/api/register',{name,email,password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString())
            dispatch(onLogin({name:data.name, uuid: data.uid}))
        } catch (error:any) {
            console.log(error)
            dispatch(onLogout(error.response.data?.msg || error.response.data?.errors.name.msg ||"Error en el registro"))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100)
        }
    } 

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token')
        if (!token) return dispatch( onLogout(undefined) )

        try {
            const {data} = await sportimeApi.get('auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString())
            dispatch(onLogin({name:data.name, uuid: data.uid}))
        } catch (error) {
            localStorage.clear()
            dispatch( onLogout(undefined) ) 
        }
    } 

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout(undefined))
    }


    return {
        // Propiedades
        status, user, errorMessage,

        // Metodos
        startLogin, startRegister, checkAuthToken, startLogout
    }
}