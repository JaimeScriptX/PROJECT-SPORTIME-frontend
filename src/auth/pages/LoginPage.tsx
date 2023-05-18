import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg'
import PadelLogin from '../../assets/images/PadelLogin.jpg'
import Logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

export const LoginPage = () => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {startLogin, errorMessage} = useAuthStore()

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }    
  }, [errorMessage])

  const handleSubmit = async(event:any) => {
      event.preventDefault()
      await startLogin({ email:email, password:password})
  };

  return (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-1 min-h-screen bg-fondo flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link to={'/'}><img src={Logo} width={'175'} className='absolute top-40 transform translate-y-[-8em] max-sm:translate-x-5'/></Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-md md:pt-52 pt-24">
          <h2 className="mt-6 text-center text-3xl text-white font-n27">
            Bienvenid@ de nuevo!
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-12 pb-5 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Correo electrónico
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Ingrese su correo electrónico"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm font-n27"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Contraseña
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ingrese su contraseña"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm font-n27"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Recuérdame
                </label>
              </div>

              <div className="text-sm">
                <a href="/restablecer-contraseña" className="font-medium text-primary hover:text-lime-600">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
            </div>

            <div className="text-xl text-center bg-primary font-inter font-bold p-3 rounded-lg">
              <button type="submit">Iniciar sesión</button>
            </div>
            <div className="flex justify-center md:pt-52 pt-24" style={{ whiteSpace: "nowrap" }}>
              <p className='text-white'>¿Nuevo en SPORTIME? <a href="/registro" className="font-medium text-primary hover:text-lime-600">Crear cuenta</a></p>
            </div>
          </form>
        </div>



      </div>
      <div className="md:col-span-1 lg:col-span-2 bg-cover" style={{ backgroundImage: `url(${PadelLogin})` }}></div>
    </div>
  </>
  )
}
