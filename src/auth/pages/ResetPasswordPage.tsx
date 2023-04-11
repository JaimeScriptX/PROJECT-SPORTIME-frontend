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
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-12 pb-5 ">
      <h2 className="mt-6 text-3xl text-white font-n27">
        He olvidado mi contraseña
      </h2>
      <p className='text-white'>Dinos el correo electrónico vinculado a tu cuenta y te enviaremos un enlace para recuperarla.</p>
    </div>

    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md mx-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Correo electrónico
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Ingrese su correo electrónico"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="appearance-none block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary  focus:border-primary sm:text-sm dark:bg-fondo"
            />
          </div>
        </div>

        <div className="text-xl text-center bg-primary font-inter font-bold p-3 rounded-lg">
          <button type="submit">Enviar correo</button>
        </div>
      </form>
    </div>
    <div className="absolute bottom-11 left-1/4 max-lg:left-1/3 max-md:left-1/2 max-sm:left-1/2 transform -translate-x-1/2 text-center text-white lg:-ml-40 max-sm:bottom-4" style={{ whiteSpace: "nowrap" }}>
  <p>¿Nuevo en SPORTIME? <a href="/auth/register" className="font-medium text-primary hover:text-lime-600">
              Crear cuenta
        </a></p>
</div>


  </div>
  <div className="md:col-span-1 lg:col-span-2 bg-cover" style={{ backgroundImage: `url(${BasketReset})` }}></div>
</div>
  )
}
