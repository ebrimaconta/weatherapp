'use client';

import React from 'react';

import Dashboard from '../components/Dashboard';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-300 p-4'>
      <h1 className='text-3xl font-bold text-center mb-4 text-blue-500'>Weather Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default Home;
