'use client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { AppDispatch, RootState } from '../redux/store';

export const useWeatherFetch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities, status, error } = useSelector((state: RootState) => state.weather);

  const searchWeather = (city: string) => {
    if (city.trim()) {
      dispatch(fetchWeather(city));
    }
  };

  return { cities, status, error, searchWeather };
};

export default useWeatherFetch;
