import React from 'react'
import { Footer, Navbar } from '../../../ui'

export const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-96 lg:py-64 bg-portada">
        <div className="max-w-xl text-center lg:my-16">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-primary">Página no encontrada</p>
        </div>
      </div>
      <Footer />
    </>
  )
}
