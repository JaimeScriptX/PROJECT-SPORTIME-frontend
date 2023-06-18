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
            dispatch(onLogin({name:decoded.name_and_lastname,username:decoded.username,email:decoded.email, uuid: decoded.id, image_profile:decoded.image_profile}));
        } catch (error) {
            dispatch(onLogout('Asegúrate de que estás utilizando la dirección de correo electrónico o usuario, y la contraseña correctas.'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10000)
        }
    } 

    const startRegister = async({name_and_lastname,username,email,password,phone }:{name_and_lastname:string, username:string, email:string, password:string, phone:string}) => {
        console.log({name_and_lastname,username,email,password,phone})
        
        dispatch(onChecking())
        try {
            const {data} = await sportimeApi.post('/register',{name_and_lastname,username,email,password,phone })
            const decoded:any = jwtDecode(data.user.token)
            const expirate = decoded.exp * 1000
            localStorage.setItem('expiration', expirate.toString())
            localStorage.setItem('token', data.user.token)
            dispatch(onLogin({name:decoded.name_and_lastname,username:decoded.username,email:decoded.email, uuid: decoded.id, image_profile:decoded.image_profile}))
            localStorage.removeItem('nameValue');
            localStorage.removeItem('usernameValue');
            localStorage.removeItem('emailValue');
            localStorage.removeItem('passwordValue');
            localStorage.removeItem('phoneValue');
            window.location.href = '/';
        } catch (error:any) {
            dispatch(onLogout(error.response.data.message ||"Error en el registro"))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10000)
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
            if (tokenExpirationTime > nowTime) {
              // El token aún no ha expirado
              dispatch(onLogin({name:decoded.name_and_lastname,username:decoded.username,email:decoded.email, uuid: decoded.id, image_profile:decoded.image_profile}));
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