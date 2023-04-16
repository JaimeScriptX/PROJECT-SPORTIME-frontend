import { useState } from 'react'
import logo from '../../assets/images/logo.svg'
import { Search } from './Search';
import { SearchMobile } from './SearchMobile';
import { Link } from 'react-router-dom';
export const Navbar = () => {

  const [showSearchD, setShowSearchD] = useState(false);
  const [showSearchM, setShowSearchM] = useState(false);

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

  return (
    <>
        <nav className="sticky top-0 z-50 relative px-4 py-4 flex justify-between items-center bg-portada flex-wrap">
          <a className="text-1xl font-bold leading-none" href="/">
            <img src={logo} width={'155'}/>
          </a>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center text-primary p-3" onClick={toggleMenu}>
              <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          {showSearchD && (
          <div className="hidden lg:inline-block relative ml-auto transform -translate-y-1/1 -translate-x-6">
            <Search />
          </div>
          )}
          {showSearchM && (
          <div className=" lg:hidden relative w-full mt-2">
            <SearchMobile />
          </div>
          )}
          
          <Link to="/auth/login" className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-primary hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200 mt-4 lg:mt-0">
            Ingresar
          </Link>
          <button disabled>
                                <img src="https://picsum.photos/40" className="rounded-full" alt="Profile 03" />
                            </button>
        </nav>
        <div className={`navbar-menu relative z-50 ${isMenuOpen ? 'block' : 'hidden'} flex`}>
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-zinc-900 border-r overflow-y-auto">
                <div className="flex items-center mb-8">
                    <a className="mr-auto text-3xl font-bold leading-none" href="inicio">
                        <img src={logo} width={'175'} />
                    </a>
                    <button className="navbar-close" onClick={toggleMenu}>
                        <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <ul>
                        <li className="mb-1">
                            <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Home</a>
                        </li>
                        <li className="mb-1">
                            <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">About Us</a>
                        </li>
                        <li className="mb-1">
                            <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Services</a>
                        </li>
                        <li className="mb-1">
                            <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Pricing</a>
                        </li>
                        <li className="mb-1">
                            <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="mt-auto">
                    <div className="pt-6">
                    <Link to="auth/login" className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-black font-semibold bg-primary hover:bg-lime-600  rounded-xl">
                      Ingresar
                    </Link>
                    </div>
                    <p className="my-4 text-xs text-center text-gray-400">
                        <span>Copyright © 2023</span>
                    </p>
                </div>
            </nav>
        </div>
    </>
  )
}
