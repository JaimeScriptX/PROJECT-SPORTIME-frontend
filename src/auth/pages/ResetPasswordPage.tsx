import { useState } from 'react';
import BasketReset from '../../assets/images/mariana-valenzuela-retas-nike.jpg'
import Logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

export const ResetPasswordPage = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(`Email: ${email}`);
  };

  return (
<div className="grid grid-cols-1 md:grid-cols-3">
  <div className="md:col-span-2 lg:col-span-1 min-h-screen bg-fondo flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <Link to={'/'}><img src={Logo} width={'175'} className='absolute top-40 transform translate-y-[-8em] max-sm:translate-x-5'/></Link>
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md mx-9 pb-5 md:pt-52 pt-24">
      <h2 className="text-3xl text-white font-n27">
        He olvidado mi contraseña
      </h2>
      <p className='text-white'>Dinos el correo electrónico vinculado a tu cuenta y te enviaremos un enlace para recuperarla.</p>
    </div>

    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md mx-10">
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
          </div>
        </div>

        <div className="text-xl text-center bg-primary font-inter font-bold p-3 rounded-lg">
          <button type="submit">Enviar correo</button>
        </div>
        <div className="flex justify-center md:pt-52 pt-24" style={{ whiteSpace: "nowrap" }}>
          <p className='text-white'>¿Te acuerdas de tu contraseña? <a href="/auth/login" className="font-medium text-primary hover:text-lime-600">
                      Crear cuenta
                </a></p>
        </div>
      </form>
    </div>
  </div>
  <div className="md:col-span-1 lg:col-span-2 bg-cover" style={{ backgroundImage: `url(${BasketReset})` }}></div>
</div>
  )
}
