'use client';

import React, { useState } from 'react';
import CityCard from '../CityCard';
import { useWeatherFetch } from '../../hooks/useWeather';

interface City {
  name: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  forecast: { date: string; temp: number }[];
}

const Dashboard: React.FC = () => {
  const [city, setCity] = useState('');
  const { cities, status, error, searchWeather } = useWeatherFetch();

  const handleSearch = () => {
    searchWeather(city);
    setCity('');
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex mb-4'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city name'
          className='border p-2 flex-1 rounded-l-md text-black'
        />
        <button
          onClick={handleSearch}
          className='bg-blue-500 text-white px-4 py-2 rounded-r-md'
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading...' : 'Search'}
        </button>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {cities.map((city: City) => (
          <CityCard key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
