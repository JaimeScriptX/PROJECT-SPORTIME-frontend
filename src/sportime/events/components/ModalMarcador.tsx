import React, { useState } from 'react'
import { useEventStore } from '../../../hooks/useEventStore'

export const ModalMarcador = ({ onClose, team_a, team_b, event_id }: { onClose: any, team_a: any, team_b: any, event_id: any }) => {

  const [team_A_result, setTeam_A_result] = useState(0 || team_a)
  const [team_B_result, setTeam_B_result] = useState(0 || team_b)

  const { changeResult } = useEventStore()

  const handleOverlayClick = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleChangeResult = async () => {
    console.log( team_A_result, team_B_result, event_id)
    await changeResult({ team_a:team_A_result, team_b:team_B_result, event_id })
    onClose()
  }

  const handleTeamAResultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam_A_result(parseInt(event.target.value));
  };

  const handleTeamBResultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam_B_result(parseInt(event.target.value));
  };

  return (
    <>
      <div
        className='fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75'
        onClick={onClose}
      ></div>
      <div className='fixed z-20 inset-0 flex items-center justify-center' onClick={handleOverlayClick}>
        <div className='bg-portada rounded-lg overflow-hidden shadow-xl max-w-lg mx-5'>
          <div className='text-center py-4 text-white text-xl'><h1>Marcador</h1></div>
          <div className="flex justify-center gap-4 lg:gap-8 bg-footer px-5 py-7">
            <div className="text-center  pr-5">
              <h6 className="text-lg text-white pb-5 font-bold lg:text-xl xl:text-xl">Equipo A</h6>
              <input
                type="number"
                min={0}
                value={team_A_result}
                maxLength={1}
                name="name"
                required
                className="block w-20 font-n27 px-3 py-2 mt-2 text-white bg-footer placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none "
                onChange={handleTeamAResultChange}
              />
            </div>
            <h1 className='text-primary text-5xl font-n27 pr-5 pt-4'>-</h1>
            <div className="text-center pr-2 ">
              <h6 className="text-lg font-bold text-white pb-5 lg:text-xl xl:text-xl">Equipo B</h6>
              <input
                type="number"
                min={0}
                value={team_B_result}
                maxLength={1}
                name="name"
                required
                className="block w-20 font-n27 px-3 py-2 mt-2 text-white bg-footer placeholder-gray-400 border-b-2 border-gray-200  focus:border-primary focus:outline-none "
                onChange={handleTeamBResultChange}
              />
            </div>
          </div>
          <div className='px-6 py-4 pt-4 bg-fondo text-center'>
            <button className='bg-primary hover:bg-lime-500  text-black font-bold py-2 mr-2 px-4 rounded' onClick={onClose}>
              Cerrar
            </button>
            <button className='bg-primary hover:bg-lime-500  text-black font-bold py-2  px-4 rounded' onClick={handleChangeResult}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
