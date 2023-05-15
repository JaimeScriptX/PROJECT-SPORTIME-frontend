import jwtDecode from 'jwt-decode';
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
            const decoded:any = jwtDecode(data.token)
            localStorage.setItem('token', data.token)
            const expirate = decoded.exp * 1000
            localStorage.setItem('expiration', expirate.toString())
            dispatch(onLogin({name:decoded.name_and_lastname,username:decoded.username,email:decoded.email, uuid: decoded.id}));
    
        } catch (error) {
            dispatch(onLogout('Creedenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    } 

    const startRegister = async({name_and_lastname,username,email,password,phone }:{name_and_lastname:string, username:string, email:string, password:string, phone:string}) => {
        console.log({name_and_lastname,username,email,password,phone})
        
        dispatch(onChecking())
        try {
            const {data} = await sportimeApi.post('/register',{name_and_lastname,username,email,password,phone })
            const decoded:any = jwtDecode(data.token)
            localStorage.setItem('expiration', decoded.exp)
            localStorage.setItem('token', data.token)
            dispatch(onLogin({name:data.user.name_and_lastname, uuid: data.user.id, tokenExpiration: decoded.exp}))
        } catch (error:any) {
            console.log(error)
            dispatch(onLogout(error.response.data.message ||"Error en el registro"))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100)
        }
    } 

    const checkAuthToken =() => {

        const token = localStorage.getItem('token')
        const tokenExpiration = localStorage.getItem('expiration')

        dispatch(onChecking())

        if (!token) return dispatch( onLogout(undefined) )

        if (token !== null && tokenExpiration) {
            const decoded: any = jwtDecode(token);
            const tokenExpirationTime =  parseInt(tokenExpiration) 
            const nowTime = Date.now(); // Obtener la fecha actual en milisegundos
            console.log(tokenExpirationTime)
            console.log(nowTime)
            if (tokenExpirationTime > nowTime) {
              // El token aún no ha expirado
              dispatch(onLogin({name:decoded.name_and_lastname,username:decoded.username,email:decoded.email, uuid: decoded.id}));
            } else {
              // El token ha expirado
              localStorage.removeItem('token')
              localStorage.removeItem('expiration')
              dispatch(onLogout(undefined));
            }
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