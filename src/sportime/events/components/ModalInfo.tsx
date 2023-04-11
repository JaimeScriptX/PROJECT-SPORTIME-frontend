import iconofalta from '../../../assets/images/IconoFalta.svg'

export const ModalInfo = ({onClose}:{onClose:any}) => {

    const handleOverlayClick = (event:any) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };

  return (
    <>
         <div
        className='fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75'
        onClick={onClose}
      ></div>
      {/* Agrega el contenido del modal */}
      <div className='fixed z-20 inset-0 flex items-center justify-center' onClick={handleOverlayClick}>
        <div className='bg-portada rounded-lg overflow-hidden shadow-xl max-w-lg mx-5'>
          <div className='text-center py-4 text-white text-xl'><h1>Jugadores</h1></div>
            <div className="flex justify-center gap-4 lg:gap-8 bg-footer px-5 py-5">
                <div className="text-center border-r pr-5">
                    <h6 className="text-lg text-white pb-5 font-bold lg:text-xl xl:text-xl">Equipo A</h6>
                    <div className="grid grid-cols-3 gap-5">
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 01" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 02" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 03" />
                        </div>
                        <div>
                            <img src={iconofalta} className="rounded-full" alt="Profile 04" />
                        </div>
                        <div>
                            <img src={iconofalta} className="rounded-full" alt="Profile 05" />
                        </div>
                    </div>
                </div>
                <div className="text-center pr-2 ">
                    <h6 className="text-lg font-bold text-white pb-5 lg:text-xl xl:text-xl">Equipo B</h6>
                    <div className="grid grid-cols-3 gap-5 pb-2">
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 01" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 02" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 03" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 04" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/65" className="rounded-full" alt="Profile 05" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-6 py-4 bg-fondo text-center'>
                <button
                className='bg-primary hover:bg-lime-500  text-black font-bold py-2 px-4 rounded'
                onClick={onClose}
                >
                Cerrar
                </button>
            </div>
        </div>
      </div>
    </>
  )
}
