import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.svg'

export const NavbarBottom = () => {

    const navigate = useNavigate()
    const {status, user, startLogout} = useAuthStore()

    const [menuOpenMob, setMenuOpenMob] = useState(false);
    const [menuOpenMobPer, setMenuOpenMobPer] = useState(false)

    const ref = useRef<HTMLDivElement>(null);

    const handleMenuToggleMobPer = () => {
      if (status === "not-authenticated") {
        navigate('/iniciar-sesion');
      } else {
        setMenuOpenMobPer(!menuOpenMobPer);
      }
      };
    
      const handleMenuToggleMob = () => {
        if (status === "not-authenticated") {
          navigate('/iniciar-sesion');
        } else {
        setMenuOpenMob(!menuOpenMob);
        }
      };

      const handleLogout = () => {
        startLogout()
      }

      const handleClickOutside = (event:any) => {
        // Si el menú está abierto y el usuario hizo clic fuera de él, cierra el menú
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setMenuOpenMob(false);
          setMenuOpenMobPer(false);
        }
      };
    
      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setMenuOpenMob(false);
            setMenuOpenMobPer(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
  return (
    <section
    className="lg:hidden block fixed bottom-0 inset-x-0 z-50 shadow-lg text-primary bg-gray-700 dark:bg-dark backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 dark:text-gray-400 border-t-2 border-royal/20">
    <div id="tabs" className="flex justify-between">
      <Link to={'/'} 
        className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-primary hover:text-black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="tab block text-xs">Inicio</span>
      </Link>
      <button
        className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-primary hover:text-black"
        onClick={handleMenuToggleMob}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="tab block text-xs">Crear evento</span>
      </button>
      {menuOpenMob && (
          <div className="absolute bottom-20 py-2 w-96 bg-white rounded-lg left-1/2 transform -translate-x-1/2" ref={ref}>
            <a
              href="/crear-evento-sportime"
              className="block py-2 px-6 text-gray-800 hover:bg-primary"
            >
              <div className="flex items-center ">
                <div>
                  <div className="font-medium"><h1><img src={logo} alt={''} width={'122'} className="" />En un centro deportivo SPORTIME</h1></div>
                  <div className="text-sm text-gray-500">Selecciona el centro deportivo de SPORTIME en el que deseas jugar y anuncia tu partido para que cualquier jugador tenga la oportunidad de unirse.</div>
                </div>
              </div>
            </a>
            <hr className=''/>
            <a
              href="/crear-evento-personalizado"
              className="block py-2 px-2 text-gray-800 hover:bg-primary"
            >
              <div className="flex items-center">
                <img src={''} alt={''} className="h-12 mx-2 rounded-sm" />
                <div>
                  <div className="font-medium">En un centro deportivo personalizado</div>
                  <div className="text-sm text-gray-500">Disputa un encuentro deportivo en una instalación o centro deportivo que no se encuentra entre las alternativas disponibles en SPORTIME.</div>
                </div>
              </div>
            </a>
          </div>
        )}
            <a onClick={handleMenuToggleMobPer}
        className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-primary hover:text-black"
  >
      {user.image_profile ? (
        <img src={user.image_profile} alt="Profile Image" className="h-6 w-6 inline-block mb-1 rounded-full" />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )}

        <span className="tab block text-xs">Perfil</span>
      </a>
     {menuOpenMobPer && (
        <div className="absolute bottom-20 sm:right-12 right-2  w-56 bg-white rounded-lg shadow-xl z-10" style={{marginTop:'5.3rem'}} ref={ref}>
          <div className='flex items-center py-2'>
            <img src={user.image_profile} className="ml-2 w-10 h-10 rounded-full" alt="Profile 03" />
            <div className='pl-2'>
              <h2 className="text-base text-black font-bold">{user.name}</h2>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </div>
          <hr className=''/>
          <a
            href="/dashboard"
            className="block py-2 text-center text-gray-800 hover:bg-primary"
          >
            Panel de eventos
          </a>
          <hr className=''/>
          <a
            href="/perfil"
            className="block py-2 text-center text-gray-800 hover:bg-primary"
          >
            Ver perfil
          </a>
          <hr className=''/>
          <a
            onClick={handleLogout}
            className="block cursor-pointer py-2 pb-2.5 text-center text-gray-800 hover:bg-black hover:text-white hover:rounded-b-lg"
          >
            Cerrar sesión
          </a>
        </div>
      )}
    </div>
  </section>
  )
}
