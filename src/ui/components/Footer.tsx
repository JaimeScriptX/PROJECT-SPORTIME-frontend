import sportime from '../../assets/images/logo.svg'

export const Footer = () => {
  return (
    <footer className=" max-lg:hidden bg-footer w-full p-6">
        <div className="bg-portada pb-5  mx-4">
            <div className="max-w-screen-xl pt-4 mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center text-teal-300 sm:justify-start">
                        <img className="text-center" src={sportime} width="150" height="80" />
                    </div>
                    <ul className=" flex lg:mx-auto max-sm:pt-5 sm:justify-start justify-center max-sm:gap-2 items-center lg:w-auto lg:space-x-6">
                            <li><a className="text-sm text-gray-400 hover:text-gray-500" href="/">Inicio</a></li>
                            <li className="text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </li>
                            <li><a className="text-sm text-gray-400 font-bold" href="#">Eventos</a></li>
                            <li className="text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </li>
                            <li><a className="text-sm text-gray-400 hover:text-gray-500" href="#">Centros deportivos</a></li>
                    </ul>  
                    <p className="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
                        Derechos reservados por IES JOSE PLANES
                    </p>
                </div>
            </div>
        </div>
    </footer>
  )
}
