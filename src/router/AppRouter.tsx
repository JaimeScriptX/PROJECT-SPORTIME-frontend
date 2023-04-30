
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { FC } from "react";
import { AuthRoutes, childhAuthRoutes, } from "../auth/routes/AuthRoutes";
import { SportimeRoutes, childSportimeRoutes } from "../sportime/routes/SportimeRoutes";


const getRoutes = [
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
    ];

export const AppRouter:FC = () => {
  
  return (
    <>
      <RouterProvider router={createBrowserRouter(getRoutes)} />
    </>
  )
}