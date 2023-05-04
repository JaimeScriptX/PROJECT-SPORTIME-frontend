
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { FC, useEffect } from "react";
import { AuthRoutes, childhAuthRoutes, } from "../auth/routes/AuthRoutes";
import { SportimeRoutes, childSportimeRoutes } from "../sportime/routes/SportimeRoutes";
import { useAuthStore } from "../hooks/useAuthStore";

const router = createBrowserRouter([
  {
    path: '/*',
    element: <SportimeRoutes />,
    children: childSportimeRoutes
  },
  {
    path: '/',
    element: <Navigate to="/inicio" />
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
    children: childhAuthRoutes
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