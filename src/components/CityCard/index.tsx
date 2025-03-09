'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { pinCity, removeCity } from '../../redux/weatherSlice';

interface CityCardProps {
  city: {
    name: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    forecast: { date: string; temp: number }[];
  };
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const dispatch = useDispatch();

  return (
    <div className='bg-v p-4 rounded-2xl shadow-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl text-black font-semibold'>{city.name}</h2>
        <button onClick={() => dispatch(removeCity(city.name))} className='text-red-500 hover:text-red-700'>
          ✖
        </button>
      </div>
      <p className='text-gray-600'>Temp: {city.temperature}°C</p>
      <p className='text-gray-600'>Humidity: {city.humidity}%</p>
      <p className='text-gray-600'>Wind: {city.windSpeed} kph</p>
      <button onClick={() => dispatch(pinCity(city.name))} className='mt-2 bg-blue-500 text-white px-3 py-1 rounded-md'>
        Pin City
      </button>
      <div className='mt-2'>
        <h3 className='text-md font-semibold text-black'>Forecast:</h3>
        <ul className='text-sm text-gray-700'>
          {city.forecast.map((day) => (
            <li key={day.date}>
              {day.date}: {day.temp}°C
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityCard;
