
export const SearchHome = () => {
  return (
    <form className="bg-white px-12 py-4 border-gray-300 rounded-full 2xl:px-auto">
    <label className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" className="p-3 pl-10 text-md text-black bg-transparent focus:ring-none focus:border-none dark:bg-transparent dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-none" placeholder="Dirección, centro de..." required/>
            <select className="ml-2 py-1 px-2 border-x-2 border-gray text-gray-500 bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:bg-transparent dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-300">
            <option value="0" selected>Seleciona un deporte</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
            </select>
            <select className="ml-2 py-1 px-2 border-none text-gray-500 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Hoy</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
            </select>
            <select className="mr-3 py-1 px-2 border-l-2 text-gray-500 bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:bg-transparent dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-300">
            <option value="">13:30</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
            </select>
            <button type="submit" className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 dark:bg-primary dark:hover:bg-lime-400 dark:focus:ring-blue-800">Buscar</button>
        </div>
    </form>
  )
}
