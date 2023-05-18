import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import logo from '../../../assets/images/logo.svg'
import logoMovil from '../../../assets/images/iconologo.webp'
import { Search } from '../../../ui/components/Search';
import { SearchMobile } from '../../../ui/components/SearchMobile';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import Filter from '../../../assets/images/IconoFilter.svg'
import { FilterModal } from '../../../ui/components/FilterModal';

export const NavbarHome = () => {

  const {status, user, startLogout} = useAuthStore()
  
  const [showSearchD, setShowSearchD] = useState(false);
  const [showSearchM, setShowSearchM] = useState(false);
  const [authenticated, setAuthenticated] = useState(false)
  const [menuOpenDes, setMenuOpenDes] = useState(false);
  const [menuOpenDesPer, setMenuOpenDesPer] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [filters, setFilters] = useState({});
  const ref = useRef<HTMLDivElement>(null);

  const handleMenuToggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleLogout = () => {
    startLogout()
  }

  useEffect(() => {
    if(status === "not-authenticated"){
      setAuthenticated(false)
    }
    if(status === "authenticated"){
      setAuthenticated(true)
    }
  }, [status])

  const handleUpdateFilters = (newFilters:any) => {
    setFilters(newFilters);
  };

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

  const handleMenuToggleDes = () => {
    setMenuOpenDes(!menuOpenDes);
  };

  const handleMenuToggleDesPer = () => {
    setMenuOpenDesPer(!menuOpenDesPer);
  };
  
  const handleClickOutside = (event:any) => {
    // Si el menú está abierto y el usuario hizo clic fuera de él, cierra el menú
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setMenuOpenDesPer(false);
      setMenuOpenDes(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMenuOpenDesPer(false);
        setMenuOpenDes(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

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
          {showSearchM && (
          <button className="lg:hidden pl-2 pr-2 relative " onClick={handleMenuToggleFilter}>
            <img src={Filter} width={'65'}/>
          </button>
          )}

          {openFilter && <FilterModal closeModal={handleMenuToggleFilter} updateFilters={handleUpdateFilters} />}
          {
            !authenticated &&
            <Link to="/iniciar-sesion" className="hidden lg:inline-block lg:ml-auto lg:mr-5 py-2 px-6 bg-primary hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition duration-200 mt-4 lg:mt-0">
              Ingresar
            </Link>
          }
          {
            !!authenticated && 
            <div className='lg:ml-auto flex justify-center pr-5'>
                <div className=" relative lg:inline-block lg:mr-3 ">
                <button className="hidden lg:flex items-center justify-center font-n27 px-3 py-2 space-x-2 text-md tracking-wide transition-colors duration-200 transform  bg-primary rounded-md dark:bg-primary dark:hover:bg-lime-500 dark:focus:bg-primary  focus:outline-none  focus:ring-opacity-50"
                onClick={handleMenuToggleDes}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>

                    <span>Crear evento</span>
                </button>
                {menuOpenDes && (
        <div className="absolute top-0 right-0 mt-14 py-2 w-96 bg-white rounded-lg shadow-xl z-10" ref={ref}>
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
                </div>
                <button className='hidden lg:inline-block' onClick={handleMenuToggleDesPer}>
                  <img src="https://picsum.photos/40" className="rounded-full" alt="Profile 03" />
              </button>
                {menuOpenDesPer && (
                  <div className="absolute top-0 right-0 pt-1 w-52 mr-2 bg-white rounded-md shadow-xl z-10" style={{marginTop:'5.4rem'}} ref={ref}>
                    <div className='flex items-center py-2'>
                      <img src="https://picsum.photos/40" className="ml-2 rounded-full" alt="Profile 03" />
                      <div className='pl-2'>
                        <h2 className="text-base font-bold">{user.name}</h2>
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
                      className="block py-2 pb-2.5 text-center text-gray-800 hover:bg-black hover:text-white hover:rounded-b-lg"
                    >
                      Cerrar sesión
                    </a>
                  </div>
                )}
            </div>
          }
        </nav>

    </>
  )
}
