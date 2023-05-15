
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FC, useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { HomePage } from "../sportime/home";
import { CreateEventCustomPage, CreateEventSportimePage, EventPage } from "../sportime/events";
import { SportCenter } from "../sportime/sportsCenter";
import { LoginPage, RegisterPage, ResetPasswordPage } from "../auth";
import { ProfilePage } from "../auth/pages/ProfilePage";
import { DashboardPage } from "../auth/pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  { 
    path: "evento/:id", 
    element: <EventPage />
  },
  { 
    path: "centro-deportivo", 
    element: <SportCenter />
  },
  { 
    path: "crear-evento-sportime", 
    element: <CreateEventSportimePage />
  },
  { 
    path: "crear-evento-custom", 
    element: <CreateEventCustomPage />
  },
  { 
    path: 'iniciar-sesion', 
    element: <LoginPage /> 
  },
  { 
    path: 'registro', 
    element: <RegisterPage /> 
  },
  { 
    path: 'restablecer-contraseña', 
    element: <ResetPasswordPage />
  },
  { 
    path: 'perfil', 
    element: <ProfilePage />
  },
  { 
    path: 'dashboard', 
    element: <DashboardPage />
  },
]);

export const AppRouter:FC = () => {
  
  const {status,checkAuthToken} = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])
  

  if(status === 'checking'){

    return(
      <h3>Cargando...</h3>
    )
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}