import { Footer, Navbar } from "../../../ui"
import Futbol from '../../../assets/images/Futbol.svg'
import Baloncesto from '../../../assets/images/Baloncesto.svg'
import Tenis from '../../../assets/images/Tenis.svg'
import FutbolSala from '../../../assets/images/FutbolSala.svg'
import Padel from '../../../assets/images/Padel.svg'
import Edit from '../../assets/images/IconoEdit.svg'
import { useEffect, useState } from "react"
import { useAuthStore } from "../../../hooks/useAuthStore"
import { usePersonStore } from "../../../hooks/usePersonStore"
import { useParams } from "react-router-dom"

interface initialState {
    id: number,
    image_profile: null,
    name_and_lastname: string,
    birthday: null
    weight: null,
    height: null,
    nationality: null,
    city: null,
    games_played: null,
    victories: null,
    defeat: null,
    ratio: null,
    image_banner: null,
    fk_sex_id: {
      id: number,
      gender: string
    },
    fk_user_id: {
      username: string
    }
}



export const ProfileByUsernamePage = () => {

  const { username } = useParams();

  const [PersonData, setPersonData] = useState<initialState | null>(null);
  const {getPersonByUsername} = usePersonStore()

  const profilePromise = async () => {
    await getPersonByUsername(username).then((data) => {
      setPersonData(data);
      console.log(data)
    })}

  useEffect(() => {
    console.log(username)
    profilePromise()

  }, [username])
    

  return (
    <>
    <Navbar />
    <div className="bg-fondo py-5 pb-6">
        <div className="bg-white shadow-md rounded-lg p-6 mx-5">
            <div className="relative py-7">
                <div
                    className="absolute inset-0 "
                    style={{ backgroundImage: "url(https://picsum.photos/800)" }}
                ></div>
                <div className="relative">
                    <img
                    className="w-20 h-20 rounded-full mx-5 top-16 relative z-10 border-4 border-white"
                    src={PersonData?.image_profile || ""}
                    alt="Profile"
                    />
                </div>
            </div>
            <div className="mt-12 pl-6">
              <h2 className="text-xl font-medium text-gray-800">{PersonData?.name_and_lastname}</h2> 
              <h2 className="text-sm text-gray-700">@{PersonData?.fk_user_id.username}</h2> 
              <p className="text-gray-500 text-sm">Nacionalidad: {PersonData?.nationality}</p>
              <p className="text-gray-500 text-sm">Ciudad: {PersonData?.city}</p>
              <p className="text-gray-500 text-sm pt-2">Edad: 25 años</p>
              <p className="text-gray-500 text-sm">Estatura: {PersonData?.height} cm</p>
              <p className="text-gray-500 text-sm">Peso: {PersonData?.weight}kg</p>
              <p className="text-gray-500 text-sm">Sexo: {PersonData?.fk_sex_id?.gender || ""}</p>
            </div>
            <div className="border-t border-gray-200 mt-6 pt-6">
                <h3 className="text-lg font-n27 text-gray-800 pl-6">Estadisticas generales</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 pt-5">
                    <div className="text-center md:border-r">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">14</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Partidos
                    </p>
                    </div>
                    <div className="text-center md:border-r ">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">7</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Victorias
                    </p>
                    </div>
                    <div className="text-center md:border-r">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">7</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Derrotas
                    </p>
                    </div>
                    <div className="text-center">
                    <h6 className="text-xl font-bold lg:text-xl xl:text-xl">50%</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                        Ratio
                    </p>
                    </div>
                </div>
            </div>
        </div>
        {/*
        <div className="bg-white shadow-md rounded-lg p-6 mt-5 mx-5">
            <h3 className="text-xl text-gray-800 font-n27">Skills</h3>
            <div className="flex flex-wrap mt-2">
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Fútbol
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Tenis
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Padel
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                    Fútbol Sala
                </span>
                <span className="bg-blue-100 text-blue-500 font-medium rounded-full py-1 px-3 mr-2 mb-2">
                Baloncesto
                </span>
            </div>
  </div>*/}
        <div className="bg-white shadow-md rounded-lg p-6 mt-5 mx-5">
            <h3 className="text-xl text-gray-800 font-n27">Mis deportes favoritos</h3>
            <div className="scrollbar-hide flex w-full pt-5 snap-x snap-mandatory scroll-px-10 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}>
                <img src={Futbol} width={'225'}/>
                <img src={Baloncesto} width={'225'}/>
                <img src={Tenis} width={'225'}/>
                <img src={FutbolSala} width={'225'}/>
                <img src={Padel} width={'225'} />   
            </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-5 mx-5">
            <h3 className="text-xl text-gray-800 font-n27">Mis ultimos eventos</h3>
            <div className="scrollbar-hide flex w-full pt-5 snap-x snap-mandatory scroll-px-10 gap-5 overflow-x-scroll scroll-smooth" style={{ maxHeight: '100%', overflowY: 'hidden' }}>
            
            </div>
        </div>
    </div>
    

    <Footer />

    </>
  )
}
