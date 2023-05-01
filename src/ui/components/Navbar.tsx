import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.svg'
import logoMovil from '../../assets/images/iconologo.webp'
import { Search } from './Search';
import { SearchMobile } from './SearchMobile';
import { Link, NavLink } from 'react-router-dom';
import { ModalCrearEvento } from './ModalCrearEvento';
import { useAuthStore } from '../../hooks/useAuthStore';
export const Navbar = () => {
  const {status} = useAuthStore()
  const [showSearchD, setShowSearchD] = useState(false);
  const [showSearchM, setShowSearchM] = useState(false);
  const [authenticated, setAuthenticated] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if(status === "not-authenticated"){
      setAuthenticated(false)
    }
    if(status === "authenticated"){
      setAuthenticated(true)
    }
  }, [status])
  

  const handleScroll = () => {
    const sectionDesktop = document.getElementById('my-section-desktop');
    const sectionMobile = document.getElementById('my-section-mobile');
    if (sectionDesktop) {
      if (sectionDesktop.getBoundingClientRect().top < 0) {
        setShowSearchD(true);
      } else {
        setShowSearchD(false);
      }
    }

    if (sectionMobile) {
      if (sectionMobile.getBoundingClientRect().top < 0) {
        setShowSearchM(true);
      } else {
        setShowSearchM(false);
      }
    }
  };

  window.addEventListener('scroll', handleScroll);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () =>{ console.log(isMenuOpen)
  setIsMenuOpen(!isMenuOpen);
  }

  const [menuOpenDes, setMenuOpenDes] = useState(false);

  const handleMenuToggleDes = () => {
    setMenuOpenDes(!menuOpenDes);
  };
  const [menuOpenMob, setMenuOpenMob] = useState(false);

  const handleMenuToggleMob = () => {
    setMenuOpenMob(!menuOpenMob);
  };

  return (
    <>
        <nav className="sticky top-0 z-50 lg:px-4 lg:py-4 flex justify-between items-center bg-portada">
          <a className="max-lg:hidden  text-1xl font-bold leading-none pl-5" href="/">
            <img src={logo} width={'155'}/>
          </a>
          <a className="lg:hidden text-1xl font-bold leading-none" href="/">
            <img src={logoMovil} width={'80'}/>
          </a>

          {showSearchD && (
          <div className="hidden lg:inline-block relative ml-auto transform -translate-y-1/1 ">
            <Search />
          </div>
          )}
          {showSearchM && (
          <div className="lg:hidden pl-2 w-full relative py-2">
            <SearchMobile />
          </div>
          )}

          {
            authenticated &&
            <Link to="/auth/login" className="hidden lg:inline-block lg:ml-auto lg:mr-4 py-2 px-6 bg-primary hover:bg-gray-100 text-md text-gray-900 font-bold rounded-xl transition duration-200 mt-4 lg:mt-0">
            Ingresar
          </Link>
          }

          {
            !authenticated && 
            <div className='lg:ml-auto flex justify-center pr-5'>
                <div className=" relative lg:inline-block lg:mr-3 ">
                <button className="hidden lg:flex items-center justify-center font-n27 px-3 py-2 space-x-2 text-md tracking-wide transition-colors duration-200 transform  bg-primary rounded-md dark:bg-primary dark:hover:bg-lime-500 dark:focus:bg-primary  focus:outline-none  focus:ring-opacity-50"
                onClick={handleMenuToggleDes}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>

                    <span>Crear evento</span>
                </button>
                {menuOpenDes && (
        <div className="absolute top-0 right-0 mt-14 py-2 w-96 bg-white rounded-lg shadow-xl z-10">
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
            href="#"
            className="block py-2 px-2 text-gray-800 hover:bg-primary"
          >
            <div className="flex items-center">
              <img src={''} alt={''} className="h-12 mx-2 rounded-sm" />
              <div>
                <div className="font-medium">Ya tengo decidido dónde voy a jugar</div>
                <div className="text-sm text-gray-500">Disputa un encuentro deportivo en una instalación o centro deportivo que no se encuentra entre las alternativas disponibles en SPORTIME.</div>
              </div>
            </div>
          </a>
        </div>
      )}
                      {isOpen && (
                        <ModalCrearEvento onClose={closeModal}/>
                      )}
                </div>
              <Link className='hidden lg:inline-block' to={'/auth/profile'}>
                  <img src="https://picsum.photos/40" className="rounded-full" alt="Profile 03" />
              </Link>
            </div>
          }
        </nav>
        <section
  className="lg:hidden block fixed bottom-0 inset-x-0 z-50 shadow-lg text-primary bg-gray-700 dark:bg-dark backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 dark:text-gray-400 border-t-2 border-royal/20">
  <div id="tabs" className="flex justify-between">
    <Link to={'/'}
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-primary hover:text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="tab block text-xs">Inicio</span>
    </Link>
    <button
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-primary hover:text-black"
      onClick={handleMenuToggleMob}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <span className="tab block text-xs">Crear evento</span>
    </button>
    {menuOpenMob && (
        <div className="absolute bottom-20 sm:left-64 left-12 py-2 w-96 bg-white rounded-lg shadow-xl z-10">
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
            href="#"
            className="block py-2 px-2 text-gray-800 hover:bg-primary"
          >
            <div className="flex items-center">
              <img src={''} alt={''} className="h-12 mx-2 rounded-sm" />
              <div>
                <div className="font-medium">Ya tengo decidido dónde voy a jugar</div>
                <div className="text-sm text-gray-500">Disputa un encuentro deportivo en una instalación o centro deportivo que no se encuentra entre las alternativas disponibles en SPORTIME.</div>
              </div>
            </div>
          </a>
        </div>
      )}
    <Link to={'/auth/profile'}
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-primary hover:text-black"
>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span className="tab block text-xs">Perfil</span>
    </Link>
  </div>
</section>
    </>
  )
}
