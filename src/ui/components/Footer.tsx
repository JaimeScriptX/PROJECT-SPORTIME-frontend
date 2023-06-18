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
                    </ul>  
                    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target='blank'>
                        <img alt="Licencia de Creative Commons" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
                        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}
