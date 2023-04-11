import { useState } from "react";
import FutbolRegister from '../../assets/images/Fultbolreunidos.png'
import Logo from '../../assets/images/logo.svg'
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e:any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Do something with name, email, password, and confirmPassword
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
  <div className="md:col-span-2 lg:col-span-1 min-h-screen bg-fondo flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <Link to={'/'}><img src={Logo} width={'175'} className='absolute top-40 transform translate-y-[-8em] max-sm:translate-x-5'/></Link>
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl text-white font-n27">
        ¡Únete ahora!
      </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-12 pb-5 ">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Nombre y apellidos
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              placeholder="Ingrese su nombre y apellidos"
              required
              value={name}
              onChange={(event) => setEmail(event.target.value)}
              className="appearance-none block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary  focus:border-primary sm:text-sm dark:bg-fondo"
            />
          </div>
        </div>

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

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Contraseña
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ingrese su contraseña"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="appearance-none block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-fondo"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Teléfono
          </label>
          <div className="mt-1 flex items-center justify-center w-full">
            <div className="relative inline-flex w-full">
              <select
                className="w-24 px-2 py-2 mr-1 border text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-fondo"
                name="prefix"
                id="prefix"
              >
              <option value="+34">+34</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+33">+33</option>
              </select>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Ingrese su número de teléfono"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="flex-1 w-full px-4 py-2 border text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-fondo"
              />
            </div>
          </div>
        </div>

        <div className="text-xl text-center bg-primary font-inter font-bold p-3 rounded-lg">
          <button type="submit">Crear cuenta</button>
        </div>
      </form>
    </div>
    <div className="absolute bottom-11 left-1/4 max-lg:left-1/3 max-md:left-1/2 max-sm:left-1/2 transform -translate-x-1/2 text-center text-white lg:-ml-40 max-sm:bottom-4" style={{ whiteSpace: "nowrap" }}>
  <p>¿No eres nuevo en SPORTIME? <a href="/auth/login" className="font-medium text-primary hover:text-lime-600">
              Iniciar sesión
        </a></p>
</div>


  </div>
  <div className="md:col-span-1 lg:col-span-2 bg-cover" style={{ backgroundImage: `url(${FutbolRegister})` }}></div>
</div>
  );
};
