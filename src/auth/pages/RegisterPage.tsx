import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FutbolRegister from "../../assets/images/Fultbolreunidos.png";
import Logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import Swal from "sweetalert2";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { startRegister, errorMessage } = useAuthStore();
  const { register, handleSubmit, setValue,  formState: { errors } } = useForm();

  const onSubmit = (data:any) => {
    localStorage.setItem("nameValue", data.name);
    localStorage.setItem("usernameValue", data.username);
    localStorage.setItem("emailValue", data.email);
    localStorage.setItem("passwordValue", data.password);
    localStorage.setItem("phoneValue", data.phone);
    startRegister({
      name_and_lastname: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });
  };

  useEffect(() => {
    setValue("name", localStorage.getItem("nameValue") || "");
    setValue("username", localStorage.getItem("usernameValue") || "");
    setValue("email", localStorage.getItem("emailValue") || "");
    setValue("password", localStorage.getItem("passwordValue") || "");
    setValue("phone", localStorage.getItem("phoneValue") || "");
    if (errorMessage !== undefined) {
      Swal.fire("Error en el registro", errorMessage, "error");
    }
  }, [errorMessage, setValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-1 min-h-screen bg-fondo flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Link to={"/"}>
          <img
            src={Logo}
            width={"175"}
            className="absolute top-40 transform translate-y-[-8em] max-sm:translate-x-5"
          />
        </Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-md md:pt-32 pt-20">
          <h2 className="mt-6 text-center text-3xl text-white font-n27">
            ¡Únete ahora!
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-12 pb-5 ">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Nombre y apellidos
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="name"
                  autoComplete="name"
                  placeholder="Ingrese su nombre y apellidos"
                  required
                  {...register("name", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Por favor ingrese un nombre y apellidos válidos.",
                    },
                    minLength: {
                      value: 2,
                      message: "El nombre y apellidos deben tener al menos 2 caracteres.",
                    },
                  })}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm font-n27"
                />
                {errors.name && (
                  <span className="text-error">
                    {errors.name.type === "required" && (
                      <figure>
                        <figcaption>Este campo es obligatorio</figcaption>
                      </figure>
                    )}
                    {errors.name.type === "pattern" && (
                      <figure>
                        <figcaption>Por favor ingrese un nombre y apellidos válidos.</figcaption>
                      </figure>
                    )}
                    {errors.name.type === "minLength" && (
                      <figure>
                        <figcaption>El nombre y apellidos deben tener al menos 2 caracteres.</figcaption>
                      </figure>
                    )}
                  </span>
                )}

              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Nombre de usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="name"
                  autoComplete="username"
                  placeholder="Ingrese su nombre de usuario"
                  required
                  {...register("username", { required: true, minLength: 3, maxLength: 20 })}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm font-n27"
                />
                {errors.username && <span className="text-error">El nombre de usuario debe tener entre 3 y 20 caracteres.</span>}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Correo electrónico
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Ingrese su correo electrónico"
                  required
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
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
                {errors.email && <span className="text-error">Por favor ingrese un correo electrónico válido.</span>}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Ingrese su contraseña"
                  required
                  {...register("password", { required: true, minLength: 6 })}
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
                {errors.password && <span className="text-error">La contraseña debe tener al menos 6 caracteres.</span>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Teléfono
              </label>
              <div className="mt-1 flex items-center justify-center w-full">
                <div className="relative inline-flex w-full">
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Ingrese su número de teléfono"
                    required
                    {...register("phone", {
                      required: true,
                      pattern: {
                        value: /^\d{1,9}$/,
                        message: "Por favor ingrese un número de teléfono válido.",
                      },
                      minLength: {
                        value: 9,
                        message: "El número de teléfono debe tener exactamente 9 dígitos.",
                      },
                      maxLength: {
                        value: 9,
                        message: "El número de teléfono debe tener máximo 9 dígitos.",
                      },
                    })}
                    className="flex-1 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm font-n27"
                  />
                </div>
              </div>
              {errors.phone && (
                <span className="text-error">
                  {errors.phone.type === "required" && "Este campo es obligatorio"}
                  {errors.phone.type === "pattern" && "Por favor ingrese un número de teléfono válido."}
                  {errors.phone.type === "minLength" && "El número de teléfono debe tener exactamente 9 dígitos."}
                  {errors.phone.type === "maxLength" && "El número de teléfono debe tener máximo 9 dígitos."}
                </span>
              )}
            </div>


            <div className="text-xl text-center bg-primary font-inter font-bold p-3 rounded-lg">
              <button type="submit">Crear cuenta</button>
            </div>
            <div
              className="flex justify-center md:pt-30 pt-20"
              style={{ whiteSpace: "nowrap" }}
            >
              <p className="text-white">
                ¿No eres nuevo en SPORTIME?{" "}
                <a
                  href="/iniciar-sesion"
                  className="font-medium text-primary hover:text-lime-600"
                >
                  Iniciar sesión
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div
        className="md:col-span-1 lg:col-span-2 bg-cover"
        style={{ backgroundImage: `url(${FutbolRegister})` }}
      ></div>
    </div>
  );
};

export default RegisterPage;
