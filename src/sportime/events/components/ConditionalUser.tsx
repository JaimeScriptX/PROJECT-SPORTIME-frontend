export const ConditionalUser = ({ eventData, user, personData, handleDeletePlayer, openModalElegir }: { eventData: any, user: any, personData: any, handleDeletePlayer: any, openModalElegir: any }) => {
  const isEventInProgressOrCompleted = eventData?.state.type === "Creado" || eventData?.state.type === "Completado";
  const isEventCanceled = eventData?.state.type === "Cancelado";
  const isEventInProgress = eventData?.state.type === "En curso";

  return (
    <>
      {!isEventCanceled && (
        <>
          {eventData?.event_players_list?.some((player: any) => player.fk_person_id === user.uuid) ? (
            <>
              {eventData?.fk_person_id?.id && eventData.fk_person_id.id !== user.uuid && isEventInProgressOrCompleted && (
                <button className='bg-primary text-black font-n27 text-xl p-2 rounded-3xl w-64 mr-2' onClick={handleDeletePlayer}>
                  Cancelar participación
                </button>
              )}
              {!isEventInProgress && eventData?.state.type === "Finalizado" && (
                <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>El partido ha terminado</h1>
              )}
              {isEventInProgress && (
                <h1 className='bg-white text-black font-n27 text-xl text-center  max-md:pt-5 p-2 rounded-3xl w-72 mr-2'>El partido está en curso</h1>
              )}
            </>
          ) : (
            <>
              {!user.uuid || personData?.fk_sex_id?.gender === "Mixto" || (personData?.fk_sex_id?.gender && eventData && personData?.fk_sex_id?.gender === eventData?.fk_sex_id?.gender) ? (
                <>
                  {eventData?.state.type === "Completado" ? (
                    <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>No hay plazas disponibles</h1>
                  ) : (
                    <>
                      {isEventInProgress ? (
                        <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>El partido está en curso</h1>
                      ) : (
                        <>
                          {eventData?.state.type === "Finalizado" ? (
                            <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>El partido ha terminado</h1>
                          ) : (
                            <>
                              {isEventCanceled ? (
                                <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>El partido ha sido cancelado</h1>
                              ) : (
                                <button className='bg-primary text-black font-n27 text-xl p-2 rounded-3xl w-64 mr-2' onClick={openModalElegir}>
                                  Unirse - {eventData?.price === 0 ? "Gratis" : `${eventData?.price}€`}
                                </button>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {personData?.fk_sex_id?.gender ? (
                    <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>No cumples con los criterios de género establecidos.</h1>
                  ) : (
                    <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>Debes elegir un género.</h1>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      {isEventCanceled && !eventData?.fk_sportcenter_id?.id && (
        <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>El partido ha sido cancelado</h1>
      )}
      {eventData?.fk_sportcenter_id?.id && isEventCanceled && eventData.fk_person_id.id !== user.uuid && (
        <h1 className='bg-white text-black font-n27 text-lg text-center p-2 rounded-3xl w-72 mr-2'>Causa de la cancelación: </h1>
      )}
    </>
  );
};
