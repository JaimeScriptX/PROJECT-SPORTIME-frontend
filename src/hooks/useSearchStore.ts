import { sportimeApi } from '../api';
import { useAppSelector } from "../store/hook";

export const useSearchStore = () => {
  const { status, user, errorMessage } = useAppSelector(state => state.auth);

  const getSearch = async ({ search, date, time, sport}: 
    { search: undefined | string, date: undefined | Date ,time: undefined | string, sport: string }) => {
 
    console.log(time)     
    const { data } = await sportimeApi.get(`/search`, {
        params: { search, sport, date, time }
      });
    console.log(data);
    return data;
  };

  return {
    // Propiedades
    status,
    user,
    errorMessage,

    // Métodos
    getSearch
  };
};
