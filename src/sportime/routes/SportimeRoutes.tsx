import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { HomePage } from '../home'
import { CreateEventCustomPage,CreateEventSportimePage, EventPage } from '../events'
import { SportCenter } from '../sportsCenter'


export const childSportimeRoutes = [
    { path: "inicio", element: <HomePage /> },
    { path: "evento", element: <EventPage/>},
    { path: "centro-deportivo", element: <SportCenter/>},
    { path: "crear-evento-sportime", element: <CreateEventSportimePage/>},
    { path: "crear-evento-custom", element: <CreateEventCustomPage/>},
]

export const SportimeRoutes:FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}