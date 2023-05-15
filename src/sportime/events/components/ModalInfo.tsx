import iconofalta from '../../../assets/images/IconoFalta.svg'
import CamisetaNegra from '../../../assets/images/CamisetaNegra.svg'
import CamisetaBlanca from '../../../assets/images/CamisetaBlanca.svg'

interface ModalInfoProps {
    onClose: any;
    number_players: number;
  }

export const ModalInfo = ({onClose, number_players}: ModalInfoProps) => {

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
          <div className="flex justify-center gap-4 lg:gap-8 bg-footer px-5 py-8">
                <div className="text-center border-r pr-5">
                    <h6 className="text-lg text-white pb-5 font-bold lg:text-xl xl:text-xl">Equipo A</h6>
                    <div className="grid grid-cols-3 gap-5">
                    {Array.from({ length: number_players }).map((_, index) => (
                            <div key={index}>
                                <button disabled>
                                    <img src='https://picsum.photos/65' className='rounded-full' alt={`Profile ${index}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center pr-2 ">
                    <h6 className="text-lg font-bold text-white pb-5 lg:text-xl xl:text-xl">Equipo B</h6>
                    <div className="grid grid-cols-3 gap-5 pb-2">
                    {Array.from({ length: number_players }).map((_, index) => (
                            <div key={index}>
                                <button disabled>
                                    <img src='https://picsum.photos/65' className='rounded-full' alt={`Profile ${index}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='relative'>
                <div className='bg-primary absolute p-2 px-5 rounded-xl sm:top-[-1rem] sm:left-[5.5rem] max-sm:top-[-1rem] max-sm:left-[4.5rem]'>
                    <img src={CamisetaBlanca}/>
                </div>
            </div>
            <div className='relative'>
                <div className='bg-primary absolute p-2 px-5 rounded-xl sm:top-[-1rem] sm:right-[6rem] max-sm:top-[-1rem] max-sm:right-[5rem]'>
                    <img src={CamisetaNegra}/>
                </div>
            </div>
            <div className='px-6 py-4 pt-8 bg-fondo text-center'>
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
