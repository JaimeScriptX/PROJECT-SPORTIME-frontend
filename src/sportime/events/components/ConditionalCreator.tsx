

export const ConditionalCreator = ({ eventData, user, id, canceledEvent, openModalMarcador, openModalCause }:{ openModalCause:any, eventData: any, user: any, id: any, canceledEvent: any, openModalMarcador: any }) => {
    
    const isEventInProgressOrFinished = eventData?.state.type === "En curso" || eventData?.state.type === "Finalizado";
    const isEventCanceled= eventData?.state.type === "Cancelado" || eventData?.state.type === "Finalizado" ;

    return (
        <>
          {eventData?.fk_person_id?.id && eventData.fk_person_id.id === user.uuid && (
            <div>
              {(!isEventCanceled) &&
                <button className='bg-primary text-black font-n27 text-xl p-2 rounded-3xl w-64 mr-5' onClick={() => canceledEvent({event_id:id || ""})}>
                  Cancelar evento
                </button>
              }
              {isEventInProgressOrFinished && (
                <button className='bg-primary text-black font-n27 text-xl p-2 rounded-3xl w-64 mt-2 lg:mt-0' onClick={openModalMarcador}>
                Editar marcador
                </button>
                )}
            </div>
          )}
          {eventData?.state.type === "Cancelado" && eventData.fk_person_id.id === user.uuid && eventData.fk_sportcenter_id && (
            <div>
                <button className='bg-primary text-black font-n27 text-xl p-2 rounded-3xl w-64' onClick={openModalCause}>
                    Causa de cancelación
                </button>
            </div>
          )}
        </>
      );
}
