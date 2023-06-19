import React, { useState } from 'react'

export const ModalAddCause = ({onClose, handleAddCause, cancellation_reason}:{onClose:any, handleAddCause:any, cancellation_reason:any}) => {

    const [causeText, setCauseText] = useState('' || cancellation_reason);

    const handleOverlayClick = (event:any) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };

    const handleAddCauseEvent= () => {
        handleAddCause({cancellationReason:causeText})
        onClose();
    }

  return (
    <>
         <div
        className='fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75'
        onClick={onClose}
      ></div>
      <div className='fixed z-20 inset-0 flex items-center justify-center' onClick={handleOverlayClick}>
        <div className='bg-portada rounded-lg overflow-hidden shadow-xl max-w-lg mx-5'>
          <div className='text-center py-4 text-white text-xl'><h1>Añadir causa</h1></div>
            <div className="flex justify-center gap-4 lg:gap-8 bg-footer px-5 py-8">
                <textarea className='p-2 w-96' onChange={(e) => setCauseText(e.target.value)} value={causeText} placeholder='Me ha surgido un problema'/>
            </div>
            <div className='px-6 py-4 pt-4 bg-fondo text-center'>
            <button className='bg-primary hover:bg-lime-500  text-black font-bold py-2 mr-2 px-4 rounded' onClick={onClose}>
              Cerrar
            </button>
            <button className='bg-primary hover:bg-lime-500  text-black font-bold py-2  px-4 rounded' onClick={handleAddCauseEvent}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
