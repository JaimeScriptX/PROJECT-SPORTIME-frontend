import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoginPage, RegisterPage, ResetPasswordPage } from '../pages'
import { ProfilePage } from '../pages/ProfilePage'
import { useSelector } from 'react-redux'
import { useAuthStore } from '../../hooks/useAuthStore'

export const childhAuthRoutes = [
  { path: 'login', element: <LoginPage /> },
  { path: 'register', element: <RegisterPage /> },
  { path: 'reset-password', element: <ResetPasswordPage />},
  { path: 'mi-perfil', element: <ProfilePage />},
  {
    path: "/auth/*",
    element: <Navigate to={"/auth/login"} />,
  },
]

export const AuthRoutes:FC = () => {

  return (
    <>
      <Outlet />
    </>
  )
}