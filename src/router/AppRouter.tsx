
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FC, useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { HomePage } from "../sportime/home";
import { CreateEventCustomPage, CreateEventSportimePage, EventPage } from "../sportime/events";
import { SportCenter } from "../sportime/sportsCenter";
import { LoginPage, RegisterPage, ResetPasswordPage } from "../auth";
import { ProfilePage } from "../auth/pages/ProfilePage";
import { DashboardPage } from "../auth/pages/DashboardPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProfileByUsernamePage } from "../sportime/profile";
import { SearchPage } from "../sportime/search";
import { ErrorPage } from "../sportime/errors/pages/ErrorPage";


export const AppRouter:FC = () => {
  
  const {status,checkAuthToken} = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])
  

  if(status === 'checking'){
    return null
  }


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='evento/:id' element={<EventPage />} />
        <Route path='perfil/:username' element={<ProfileByUsernamePage />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='centro-deportivo/:id' element={<SportCenter />} />
        <Route element={<ProtectedRoute isAllowed={status == "authenticated"} redirectTo="iniciar-sesion"/>}>
          <Route path='crear-evento-sportime' element={<CreateEventSportimePage />} />
          <Route path='crear-evento-personalizado' element={<CreateEventCustomPage />} />
          <Route path='perfil' element={<ProfilePage />} />
          <Route path='dashboard' element={<DashboardPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={status === "not-authenticated"} redirectTo="/"/>}>
          <Route path='iniciar-sesion' element={<LoginPage />} />
          <Route path='registro' element={<RegisterPage />} />
          <Route path='restablecer-contraseña' element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter