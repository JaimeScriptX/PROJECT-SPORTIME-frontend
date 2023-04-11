import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { HomePage } from '../home'
import { EventPage } from '../events'


export const childSportimeRoutes = [
    { path: "inicio", element: <HomePage /> },
    { path: "evento", element: <EventPage/>},
]

export const SportimeRoutes:FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}