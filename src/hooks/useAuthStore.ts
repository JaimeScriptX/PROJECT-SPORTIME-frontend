import { sportimeApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout} from "../store"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { useNavigate } from 'react-router-dom';

export const useAuthStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const startLogin = async({email,password}:{email:string, password:string}) => {
        console.log({email, password})
        
        dispatch(onChecking())
        try {
            const {data} = await sportimeApi.post('/login_check',{email,password})
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString())
            dispatch(onLogin({name:"prueba", uuid: "5"}))
            navigate('/');
        } catch (error) {
            console.log(error)
            dispatch(onLogout('Asegúrate de que estás utilizando la dirección de correo electrónico o usuario, y la contraseña correctas.'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100)
        }
    } 

    const startRegister = async({name_and_lastname,username,email,password,phone }:{name_and_lastname:string, username:string, email:string, password:string, phone:string}) => {
        console.log({name_and_lastname,username,email,password,phone})
        
        dispatch(onChecking())
        try {
            const {data} = await sportimeApi.post('/register',{name_and_lastname,username,email,password,phone})
            console.log(data)
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