import { useLocation, useNavigate } from "react-router-dom";
import { useSearchStore } from "../../hooks/useSearchStore";
import { useEffect, useMemo, useState } from "react";

export const SearchMobile = ({searchN} : {searchN:any }) => {
  const { getSearch } = useSearchStore();
  const history = useNavigate();
  const location = useLocation();
  const searchData = location.state?.search;
  const [search, setSearch] = useState("" || searchData)

  const searchNavbar = () => {
    searchN(search)
  }
  
  const memoizedSearch = useMemo(() => search, [search]);

  useEffect(() => {

    searchNavbar()
    memoizedSearch
  }, [search])
  

  const handleSubmit = async(e:any) => {
    e.preventDefault()

    try {
      const searchData = await getSearch({search, date: null, sport:"", time:""});
      history("/search", { state: { searchData, search } });
    } catch (error) {
      console.error(error);
      // Manejar el error de búsqueda
    }
  }



  return (
    <form onSubmit={handleSubmit}>   
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dirección, centro deportivo, ciudad..."/>
            <button type="submit" className="text-black absolute right-2.5 bottom-2.5 bg-lime-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-primary dark:hover:bg-lime-400 dark:focus:ring-lime-100">Buscar</button>
        </div>
    </form>
  )
}
