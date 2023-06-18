
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { usePersonStore } from '../../hooks/usePersonStore'

interface Favorite {
  id: number;
  fk_sport_id: number;
  // otras propiedades relevantes
}

export const ModalFavoriteSport = ({onClose}:{onClose:any}) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [sports, setSports] = useState([])
  const [favorites, setFavorites] = useState([])
  const {getFavoritesSports, addFavorite, deleteFavorite, getSports, user} = usePersonStore()

  const sportPromise = async () => {
    await getFavoritesSports(user.uuid).then((data) => {
      setFavorites(data || []);
    })
    await getSports().then((data) => {
      setSports(data)
    })
  }

  useEffect(() => {
    sportPromise()
    setHeartClicked(false)
  }, [user.uuid, heartClicked])
  
  const handleClick = async (sport: any) => {
    console.log(sport);
    const isFavorite = favorites.some((favorite: any) => favorite.fk_sport_id === sport.id);
  
    if (isFavorite) {
      // If the sport is already in favorites, remove it
      const favoriteToRemove:any = favorites.find((favorite: any) => favorite.fk_sport_id === sport.id);
      if (favoriteToRemove) {
        await deleteFavorite({favorite_id: favoriteToRemove.id});
        setHeartClicked(true);
      }
    } else {
      // If the sport is not in favorites, add it
      if (sport.id) { // Check if sport.id is defined
        await addFavorite({ fk_person_id: user.uuid, fk_sport_id: sport.id });
        setHeartClicked(true);
      }
    }
  };
  
  
  
    const handleOverlayClick = (event:any) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
    };

    return (
        <>
            <div
              className="fixed inset-0 z-50 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0 "
              >
                <div
                  className="fixed inset-0 transition-opacity bg-fondo bg-opacity-60"
                  aria-hidden="true"
                  onClick={handleOverlayClick}
                ></div>
    
                <div
                  className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-fondo rounded-lg shadow-xl 2xl:max-w-2xl"
                >
    
                  <div className="flex items-center justify-between space-x-4">
                    <h1 className="text-2xl font-medium text-primary">
                      Editar mis deportes favoritos
                    </h1>
                    <button
                      className="text-white focus:outline-none hover:text-gray-700"
                      onClick={onClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <hr className="opacity-5 mt-2"/>
                  <div className="scrollbar-hide flex w-full pt-5 snap-x snap-mandatory scroll-px-10 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                    {sports.map((sport: any, index: number) => {
                      const isFavorite = favorites.some((favorite: any) => favorite.fk_sport_id === sport.id);

                      return (
                        <div key={index} className="image-container" style={{ position: 'relative' }}>
                          <img src={sport.image} width={'375'} alt={sport.name} />
                          <button className=" absolute top-0 right-0" onClick={() => handleClick(sport)}>
                            {isFavorite ? (
                              <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#9cf21a" }} />
                            ) : (
                              <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#ffffff", backgroundColor: "" }} />

                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>


                    <button className="bg-white px-4 py-2 mt-10 rounded-md hover:bg-gray-500 mr-2" onClick={handleOverlayClick}>
                        Salir
                    </button>
                </div>
            </div>
        </div>
        </>
      )
}
